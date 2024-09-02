import { ok, okAsync, ResultAsync } from 'neverthrow'
import {
  BlockedCountryModel,
  createApiError,
  GoldenTicketModel,
  IpAssessmentModel,
  UserModel,
  type ApiError,
  type AppLogger
} from 'common'
import { CountryStatus } from 'database'
import {
  type IPQSResponse,
  FraudRuleStatus,
  FraudRule,
  type FraudEvaluation,
  type FraudScoringInput,
  IPQS_OK_RESULT
} from './types'

export const fraudRuleChecker = (evaluation: FraudEvaluation) => {
  return {
    ruleOk: (rule: FraudRule) => evaluation[rule].status === FraudRuleStatus.Passed,
    ruleRejected: (rule: FraudRule) => evaluation[rule].status === FraudRuleStatus.Rejected
  }
}

export type FraudDetectionModule = typeof FraudDetectionModule
export const FraudDetectionModule = (config: {
  logger: AppLogger
  userModel: ReturnType<UserModel>
  goldenTicketModel: ReturnType<GoldenTicketModel>
  ipAssessmentModel: ReturnType<IpAssessmentModel>
  blockedCountryModel: ReturnType<BlockedCountryModel>
  ipqs: {
    /**
     * Maximum time (in seconds) to get cached IPQS response from our database (IpAssessment table)
     * before triggerring new IPQS API call
     */
    cacheTTL?: number
    /**
     * Do not query IPQS api, always return IPQS_OK_RESPONSE
     */
    allowAll?: boolean
    key: string
    strictness: number
    allowPublicAccessPoints: boolean
    maxAllowedScore: number
  }
}) => {
  const { logger, userModel, ipAssessmentModel, ipqs, blockedCountryModel, goldenTicketModel } =
    config

  const queryIpqs = (ip: string, userAgent: string, acceptLanguage: string) =>
    ResultAsync.fromPromise(
      fetch(
        [
          `https://www.ipqualityscore.com/api/json/ip/${ipqs.key}/${ip}`,
          `?user_agent=${userAgent}`,
          `&user_language=${acceptLanguage}`,
          `&strictness=${ipqs.strictness}`,
          `&allow_public_access_points=${ipqs.allowPublicAccessPoints}`
        ].join('')
      ).then((response) => response.json()),
      (error) => {
        logger.error({ method: 'IPQSClient.apiCall', error })
        return error
      }
    )

  const getIpqsResult = ({
    ip,
    userAgent,
    acceptLanguage
  }: FraudScoringInput): ResultAsync<
    {
      response: IPQSResponse
      assessmentId: number
    },
    never
  > => {
    if (ipqs.allowAll) {
      return okAsync(IPQS_OK_RESULT)
    }

    return ipAssessmentModel
      .findByIp(ip, ipqs.cacheTTL)
      .andThen((result) =>
        result
          ? ok({
              response: result.data,
              assessmentId: result.id
            })
          : queryIpqs(ip, userAgent, acceptLanguage)
              .andThen((data) =>
                data.success
                  ? ipAssessmentModel
                      .add({ ip, userAgent, acceptLanguage }, data)
                      .map((created) => {
                        return {
                          response: data,
                          assessmentId: created.id
                        }
                      })
                  : okAsync(IPQS_OK_RESULT)
              )
              .orElse(() => okAsync(IPQS_OK_RESULT))
      )
      .orElse(() => okAsync(IPQS_OK_RESULT))
  }

  const passesIPQSAggressive = ({ fraud_score, vpn, tor, proxy }: IPQSResponse) => {
    if (fraud_score && fraud_score > ipqs.maxAllowedScore) {
      return false
    }

    if (vpn || tor || proxy) {
      return false
    }

    return true
  }

  const passesIPQSGenerous = ({ fraud_score, vpn, tor, proxy }: IPQSResponse) => {
    return passesIPQSAggressive({ fraud_score, vpn, tor, proxy } as IPQSResponse)
  }

  const isFarmer = (clientIp: string, userId: string) =>
    ResultAsync.combineWithAllErrors([
      userModel.getUserIdsByIp(clientIp),
      userModel.countReferralCodeUsagePerIp(userId, clientIp)
    ]).map(([userIds, referralCodeUsage]) => {
      const occuranceWeight = 0.25
      const fraudScoreCheck = occuranceWeight * (userIds.length + referralCodeUsage)
      return {
        status: fraudScoreCheck > 1 ? FraudRuleStatus.Rejected : FraudRuleStatus.Passed,
        fraudScore: fraudScoreCheck
      }
    })

  const evaluateFarmerRisk = ({ ip, userId }: FraudScoringInput) =>
    isFarmer(ip, userId).map((farmerEvaluation) => ({
      [FraudRule.Farmer]: farmerEvaluation
    }))

  const hasGoldenTicket = (_userId: string) => goldenTicketModel.userHasClaimedTicket(_userId)

  const evaluateGoldenTicket = ({ userId }: { userId: string }) =>
    hasGoldenTicket(userId).map((hasGoldenTicket) => ({
      [FraudRule.GoldenTicket]: {
        status: hasGoldenTicket ? FraudRuleStatus.Passed : FraudRuleStatus.Rejected,
        data: undefined
      }
    }))

  const evaluateIPQSBasedRules = (input: FraudScoringInput) =>
    getIpqsResult(input).andThen((data) => {
      const result = data.response
      const countryCode = result.country_code || ''
      const _passesIPQSGenerous = passesIPQSGenerous(result)
      const _passesIPQSAggressive = passesIPQSAggressive(result)
      const countryStatus = countryCode
        ? blockedCountryModel.getCountryStatus(countryCode)
        : okAsync({ status: CountryStatus.ALLOWED })

      return countryStatus.map((countryStatus) => ({
        [FraudRule.CountryBlocked]: {
          status: countryStatus
            ? countryStatus.status === CountryStatus.BLOCKED
              ? FraudRuleStatus.Rejected
              : FraudRuleStatus.Passed
            : FraudRuleStatus.Unknown,
          countryCode
        },
        [FraudRule.CountrySanctioned]: {
          status: countryStatus
            ? countryStatus.status === CountryStatus.SANCTIONED
              ? FraudRuleStatus.Rejected
              : FraudRuleStatus.Passed
            : FraudRuleStatus.Unknown,
          countryCode
        },
        [FraudRule.IPQSAggresive]: {
          status: _passesIPQSAggressive ? FraudRuleStatus.Passed : FraudRuleStatus.Rejected,
          ...data
        },
        [FraudRule.IPQSGenerous]: {
          status: _passesIPQSGenerous ? FraudRuleStatus.Passed : FraudRuleStatus.Rejected,
          ...data
        }
      }))
    })

  const evaluate = (input: FraudScoringInput): ResultAsync<FraudEvaluation, ApiError> => {
    return ResultAsync.combineWithAllErrors([
      evaluateFarmerRisk(input),
      evaluateGoldenTicket(input),
      evaluateIPQSBasedRules(input)
    ])
      .map(([farmer, ticket, ipqs]) => ({
        ...ipqs,
        ...farmer,
        ...ticket
      }))
      .mapErr((error) => {
        logger.error({ method: 'FraudDetectionModule.doFraudScoring', error })
        return createApiError('FraudScoringFailed', 400)(error)
      })
  }

  return {
    evaluate
  }
}

import type { PrismaClient } from 'database'

import type { AppLogger } from '../helpers/logger'
import { ResultAsync } from 'neverthrow'

export type IPQSResponse = {
  success: string | boolean
  message: string
  request_id: string
  errors?: string[]
  proxy?: boolean
  host?: string
  ISP?: string
  Organization?: string
  ASN?: number
  country_code?: string
  city?: string
  region?: string
  timezone?: string
  latitude?: number
  longitude?: number
  zip_code?: string
  is_crawler?: boolean
  connection_type?: string
  recent_abuse?: boolean
  abuse_velocity?: string
  bot_status?: boolean
  vpn?: boolean
  tor?: boolean
  active_vpn?: boolean
  active_tor?: boolean
  mobile?: boolean
  fraud_score?: number
  operating_system?: string
  browser?: string
  device_brand?: string
  device_model?: string
}

type Data = IPQSResponse

export type IpAssessmentModel = ReturnType<typeof IpAssessmentModel>

export const IpAssessmentModel = (db: PrismaClient) => (logger: AppLogger) => {
  const THREE_DAYS = 1000 * 60 * 60 * 24 * 3
  const add = (
    { ip, userAgent, acceptLanguage }: { ip: string; userAgent: string; acceptLanguage: string },
    data: Data
  ) => {
    return ResultAsync.fromPromise(
      db.ipAssessment.create({
        data: { ip, userAgent, acceptLanguage, data }
      }),
      (error) => {
        logger?.error({ error, method: 'add', model: 'IpAssessmentModel' })
        return error
      }
    )
  }

  const findByIp = (ip: string, period: number = THREE_DAYS) => {
    return ResultAsync.fromPromise(
      db.ipAssessment.findFirst({
        where: { ip, createdAt: { gt: new Date(Date.now() - period) } }
      }),
      (error) => {
        logger?.error({ error, method: 'findByIp', model: 'IpAssessmentModel' })
        return error
      }
    )
  }

  return { add, findByIp }
}

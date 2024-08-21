
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.15.0
 * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
 */
Prisma.prismaVersion = {
  client: "5.15.0",
  engine: "34ace0eb2704183d2c05b60b52fba5c43c13f303"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  identityAddress: 'identityAddress',
  createdAt: 'createdAt',
  accountAddress: 'accountAddress',
  name: 'name',
  country: 'country',
  type: 'type',
  referralCode: 'referralCode',
  referredBy: 'referredBy',
  blocked: 'blocked'
};

exports.Prisma.UserEmailScalarFieldEnum = {
  userId: 'userId',
  email: 'email',
  newsletter: 'newsletter'
};

exports.Prisma.ImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  type: 'type'
};

exports.Prisma.UserPhoneNumberScalarFieldEnum = {
  userId: 'userId',
  phoneNumber: 'phoneNumber',
  createdAt: 'createdAt',
  ip: 'ip'
};

exports.Prisma.ReferralScalarFieldEnum = {
  eventId: 'eventId',
  userId: 'userId',
  action: 'action',
  xrdValue: 'xrdValue'
};

exports.Prisma.ChallengeScalarFieldEnum = {
  challenge: 'challenge',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  transactionId: 'transactionId',
  id: 'id',
  userId: 'userId',
  questId: 'questId',
  status: 'status',
  createdAt: 'createdAt',
  error: 'error',
  data: 'data'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  seenAt: 'seenAt',
  data: 'data'
};

exports.Prisma.NotificationScalarFieldEnum = {
  notificationId: 'notificationId',
  userId: 'userId',
  seenAt: 'seenAt'
};

exports.Prisma.CompletedQuestRequirementScalarFieldEnum = {
  questId: 'questId',
  userId: 'userId',
  requirementId: 'requirementId',
  createdAt: 'createdAt'
};

exports.Prisma.QuestProgressScalarFieldEnum = {
  questId: 'questId',
  userId: 'userId',
  status: 'status'
};

exports.Prisma.SavedProgressScalarFieldEnum = {
  userId: 'userId',
  questId: 'questId',
  progress: 'progress'
};

exports.Prisma.AuditScalarFieldEnum = {
  transactionId: 'transactionId',
  userId: 'userId',
  date: 'date',
  type: 'type',
  xrdUsdValue: 'xrdUsdValue',
  xrdPrice: 'xrdPrice',
  data: 'data'
};

exports.Prisma.BlockedCountryScalarFieldEnum = {
  country: 'country',
  countryCode: 'countryCode',
  blocked: 'blocked'
};

exports.Prisma.TransactionIntentScalarFieldEnum = {
  discriminator: 'discriminator',
  status: 'status',
  createdAt: 'createdAt',
  error: 'error',
  userId: 'userId',
  data: 'data',
  batchId: 'batchId'
};

exports.Prisma.BatchedTransactionIntentScalarFieldEnum = {
  id: 'id',
  status: 'status',
  createdAt: 'createdAt',
  error: 'error'
};

exports.Prisma.SubmittedTransactionScalarFieldEnum = {
  transactionId: 'transactionId',
  transactionIntent: 'transactionIntent',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ConfigScalarFieldEnum = {
  key: 'key',
  value: 'value'
};

exports.Prisma.MarketingScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  utm_campaign: 'utm_campaign',
  utm_medium: 'utm_medium',
  utm_source: 'utm_source',
  utm_id: 'utm_id',
  utm_content: 'utm_content',
  utm_term: 'utm_term'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserType = exports.$Enums.UserType = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.ImageType = exports.$Enums.ImageType = {
  RadMorph: 'RadMorph',
  RadGem: 'RadGem',
  Card: 'Card'
};

exports.ReferralAction = exports.$Enums.ReferralAction = {
  INC: 'INC',
  DEC: 'DEC'
};

exports.EventStatus = exports.$Enums.EventStatus = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED',
  FAILED_RETRY: 'FAILED_RETRY',
  FAILED_PERMANENT: 'FAILED_PERMANENT',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED'
};

exports.QuestStatus = exports.$Enums.QuestStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  REWARDS_DEPOSITED: 'REWARDS_DEPOSITED',
  REWARDS_CLAIMED: 'REWARDS_CLAIMED',
  COMPLETED: 'COMPLETED'
};

exports.AuditType = exports.$Enums.AuditType = {
  DIRECT_DEPOSIT: 'DIRECT_DEPOSIT',
  CLAIMBOX_DEPOSIT: 'CLAIMBOX_DEPOSIT'
};

exports.TransactionIntentStatus = exports.$Enums.TransactionIntentStatus = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED',
  FAILED_RETRY: 'FAILED_RETRY',
  FAILED_PERMANENT: 'FAILED_PERMANENT',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  UserEmail: 'UserEmail',
  Image: 'Image',
  UserPhoneNumber: 'UserPhoneNumber',
  Referral: 'Referral',
  Challenge: 'Challenge',
  Event: 'Event',
  Message: 'Message',
  Notification: 'Notification',
  CompletedQuestRequirement: 'CompletedQuestRequirement',
  QuestProgress: 'QuestProgress',
  SavedProgress: 'SavedProgress',
  Audit: 'Audit',
  BlockedCountry: 'BlockedCountry',
  TransactionIntent: 'TransactionIntent',
  BatchedTransactionIntent: 'BatchedTransactionIntent',
  SubmittedTransaction: 'SubmittedTransaction',
  Config: 'Config',
  Marketing: 'Marketing'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

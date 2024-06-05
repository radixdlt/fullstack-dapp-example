Object.defineProperty(exports, '__esModule', { value: true })

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime
} = require('./runtime/index-browser.js')

const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.13.0
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: '5.13.0',
  engine: 'b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b'
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.validator = Public.validator

/**
 * Extensions
 */
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}

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
})

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  identityAddress: 'identityAddress',
  accountAddress: 'accountAddress',
  name: 'name',
  country: 'country',
  type: 'type'
};

exports.Prisma.RadMorphImageScalarFieldEnum = {
  id: 'id',
  url: 'url'
};

exports.Prisma.UserPhoneNumberScalarFieldEnum = {
  userId: 'userId',
  phoneNumber: 'phoneNumber',
  createdAt: 'createdAt'
}

exports.Prisma.ChallengeScalarFieldEnum = {
  challenge: 'challenge',
  createdAt: 'createdAt'
}

exports.Prisma.EventScalarFieldEnum = {
  transactionId: 'transactionId',
  id: 'id',
  questId: 'questId',
  userId: 'userId',
  createdAt: 'createdAt',
  processedAt: 'processedAt',
  error: 'error'
}

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  seenAt: 'seenAt',
  data: 'data'
}

exports.Prisma.NotificationScalarFieldEnum = {
  notificationId: 'notificationId',
  userId: 'userId',
  seenAt: 'seenAt'
}

exports.Prisma.CompletedQuestRequirementScalarFieldEnum = {
  questId: 'questId',
  userId: 'userId',
  requirementId: 'requirementId',
  createdAt: 'createdAt'
}

exports.Prisma.QuestProgressScalarFieldEnum = {
  questId: 'questId',
  userId: 'userId',
  status: 'status'
}

exports.Prisma.SavedProgressScalarFieldEnum = {
  userId: 'userId',
  questId: 'questId',
  progress: 'progress'
}

exports.Prisma.AuditScalarFieldEnum = {
  transactionId: 'transactionId',
  userId: 'userId',
  date: 'date',
  type: 'type',
  xrdUsdValue: 'xrdUsdValue'
}

exports.Prisma.TransactionScalarFieldEnum = {
  attempt: 'attempt',
  transactionKey: 'transactionKey',
  transactionId: 'transactionId',
  status: 'status',
  createdAt: 'createdAt',
  error: 'error',
  badgeId: 'badgeId',
  badgeResourceAddress: 'badgeResourceAddress',
  metadata: 'metadata'
}

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
}

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
}

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
}

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
}

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
}

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserType = exports.$Enums.UserType = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.EventError = exports.$Enums.EventError = {
  ERROR_INVALID_DATA: 'ERROR_INVALID_DATA',
  ERROR_USER_NOT_FOUND: 'ERROR_USER_NOT_FOUND',
  ERROR_UNHANDLED_EVENT: 'ERROR_UNHANDLED_EVENT'
}

exports.QuestStatus = exports.$Enums.QuestStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  REWARDS_DEPOSITED: 'REWARDS_DEPOSITED',
  REWARDS_CLAIMED: 'REWARDS_CLAIMED',
  COMPLETED: 'COMPLETED'
}

exports.AuditType = exports.$Enums.AuditType = {
  DIRECT_DEPOSIT: 'DIRECT_DEPOSIT',
  CLAIMBOX_DEPOSIT: 'CLAIMBOX_DEPOSIT'
}

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED'
}

exports.Prisma.ModelName = {
  User: 'User',
  RadMorphImage: 'RadMorphImage',
  UserPhoneNumber: 'UserPhoneNumber',
  Challenge: 'Challenge',
  Event: 'Event',
  Message: 'Message',
  Notification: 'Notification',
  CompletedQuestRequirement: 'CompletedQuestRequirement',
  QuestProgress: 'QuestProgress',
  SavedProgress: 'SavedProgress',
  Audit: 'Audit',
  Transaction: 'Transaction'
}

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
`
        } else {
          message =
            'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' +
            runtime.prettyName +
            '`).'
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

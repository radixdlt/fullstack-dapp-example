
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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


  const path = require('path')

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
  status: 'status'
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

exports.Prisma.IpAssessmentScalarFieldEnum = {
  id: 'id',
  ip: 'ip',
  userAgent: 'userAgent',
  acceptLanguage: 'acceptLanguage',
  data: 'data',
  createdAt: 'createdAt'
};

exports.Prisma.LoginAttemptScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  ipAssessmentId: 'ipAssessmentId',
  type: 'type',
  createdAt: 'createdAt'
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
  status: 'status'
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

exports.Prisma.GoldenTicketScalarFieldEnum = {
  id: 'id',
  batchId: 'batchId',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt',
  userId: 'userId',
  claimedAt: 'claimedAt',
  description: 'description',
  status: 'status',
  type: 'type'
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

exports.UserStatus = exports.$Enums.UserStatus = {
  OK: 'OK',
  PERMANENTLY_BLOCKED: 'PERMANENTLY_BLOCKED',
  TEMPORARILY_BLOCKED: 'TEMPORARILY_BLOCKED'
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

exports.LoginAttemptType = exports.$Enums.LoginAttemptType = {
  USER_CREATED: 'USER_CREATED',
  USER_LOGIN: 'USER_LOGIN',
  USER_VERIFY: 'USER_VERIFY'
};

exports.QuestStatus = exports.$Enums.QuestStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  REWARDS_DEPOSITED: 'REWARDS_DEPOSITED',
  REWARDS_CLAIMED: 'REWARDS_CLAIMED',
  COMPLETED: 'COMPLETED',
  PARTIALLY_COMPLETED: 'PARTIALLY_COMPLETED'
};

exports.AuditType = exports.$Enums.AuditType = {
  DIRECT_DEPOSIT: 'DIRECT_DEPOSIT',
  CLAIMBOX_DEPOSIT: 'CLAIMBOX_DEPOSIT'
};

exports.CountryStatus = exports.$Enums.CountryStatus = {
  ALLOWED: 'ALLOWED',
  BLOCKED: 'BLOCKED',
  SANCTIONED: 'SANCTIONED'
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

exports.GoldenTicketStatus = exports.$Enums.GoldenTicketStatus = {
  CLAIMABLE: 'CLAIMABLE',
  CLAIMED: 'CLAIMED',
  CLAIMED_INVALID: 'CLAIMED_INVALID'
};

exports.TicketType = exports.$Enums.TicketType = {
  FULL: 'FULL',
  LIMITED: 'LIMITED'
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
  IpAssessment: 'IpAssessment',
  LoginAttempt: 'LoginAttempt',
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
  Marketing: 'Marketing',
  GoldenTicket: 'GoldenTicket'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/dawidsowa/work/radquest/packages/database/src/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-arm64-openssl-1.1.x"
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.1.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/dawidsowa/work/radquest/packages/database/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.15.0",
  "engineVersion": "34ace0eb2704183d2c05b60b52fba5c43c13f303",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider      = \"prisma-client-js\"\n  binaryTargets = [\"native\", \"linux-arm64-openssl-1.1.x\", \"debian-openssl-1.1.x\"]\n  output        = \"../src/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum UserType {\n  USER\n  ADMIN\n}\n\nenum UserStatus {\n  OK\n  PERMANENTLY_BLOCKED\n  TEMPORARILY_BLOCKED\n}\n\nmodel User {\n  id              String     @id @default(\"\")\n  identityAddress String     @unique\n  createdAt       DateTime   @default(now())\n  accountAddress  String?\n  name            String?\n  country         String?\n  type            UserType   @default(USER)\n  referralCode    String     @unique\n  referredBy      String?\n  referredByUser  User?      @relation(\"Referrer\", fields: [referredBy], references: [referralCode])\n  status          UserStatus @default(OK)\n\n  events                     Event[]\n  messages                   Message[]\n  email                      UserEmail?\n  phoneNumber                UserPhoneNumber?\n  completedQuestRequirements CompletedQuestRequirement[]\n  savedProgress              SavedProgress?\n  auditLogs                  Audit[]\n  questProgress              QuestProgress[]\n  referredUsers              User[]                      @relation(\"Referrer\")\n  transactions               TransactionIntent[]\n  marketing                  Marketing[]\n  referals                   Referral[]\n  goldenTicketClaimed        GoldenTicket?               @relation(\"claimedBy\")\n  goldenTicketsOwned         GoldenTicket[]              @relation(\"owner\")\n  loginAttempts              LoginAttempt[]\n}\n\nmodel UserEmail {\n  userId     String  @unique\n  email      String  @id @unique\n  newsletter Boolean @default(false)\n  user       User    @relation(fields: [userId], references: [id])\n}\n\nenum ImageType {\n  RadMorph\n  RadGem\n  Card\n}\n\nmodel Image {\n  id   String    @id\n  url  String\n  type ImageType\n}\n\nmodel UserPhoneNumber {\n  userId      String   @unique\n  phoneNumber String   @id @unique\n  createdAt   DateTime @default(now())\n  ip          String   @default(\"\")\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@index([ip])\n}\n\nenum ReferralAction {\n  INC\n  DEC\n}\n\nmodel Referral {\n  eventId  String         @id @unique\n  userId   String\n  action   ReferralAction\n  xrdValue Decimal\n\n  event Event @relation(fields: [eventId], references: [transactionId])\n  user  User  @relation(fields: [userId], references: [id])\n\n  @@index([userId])\n}\n\nmodel Challenge {\n  challenge String   @id\n  createdAt DateTime @default(now())\n}\n\nenum EventStatus {\n  WAITING\n  PENDING\n  ERROR\n  COMPLETED\n  FAILED_RETRY\n  FAILED_PERMANENT\n  PAUSED\n  CANCELLED\n}\n\nmodel Event {\n  transactionId String      @id\n  id            String\n  userId        String\n  questId       String?\n  status        EventStatus @default(WAITING)\n  createdAt     DateTime    @default(now())\n  error         String?\n  data          Json        @default(\"{}\")\n\n  user     User       @relation(fields: [userId], references: [id])\n  referral Referral[]\n\n  @@index([userId, status])\n}\n\nmodel Message {\n  id        Int       @id @default(autoincrement())\n  userId    String\n  createdAt DateTime  @default(now())\n  seenAt    DateTime?\n  data      Json\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@index([userId, seenAt])\n}\n\nmodel IpAssessment {\n  id             Int            @id @default(autoincrement())\n  ip             String\n  userAgent      String\n  acceptLanguage String\n  data           Json\n  createdAt      DateTime       @default(now())\n  loginAttempts  LoginAttempt[]\n\n  @@index([ip, createdAt])\n}\n\nenum LoginAttemptType {\n  USER_CREATED\n  USER_LOGIN\n  USER_VERIFY\n}\n\nmodel LoginAttempt {\n  id             Int              @id @default(autoincrement())\n  userId         String\n  ipAssessmentId Int\n  type           LoginAttemptType\n  createdAt      DateTime         @default(now())\n\n  user         User         @relation(fields: [userId], references: [id])\n  ipAssessment IpAssessment @relation(fields: [ipAssessmentId], references: [id])\n\n  @@index(userId)\n}\n\nmodel Notification {\n  notificationId String\n  userId         String\n  seenAt         DateTime?\n\n  @@id([notificationId, userId])\n}\n\nmodel CompletedQuestRequirement {\n  questId       String\n  userId        String\n  requirementId String\n  createdAt     DateTime @default(now())\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@id([questId, userId, requirementId])\n}\n\nmodel QuestProgress {\n  questId String\n  userId  String\n  status  QuestStatus @default(IN_PROGRESS)\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@id([questId, userId])\n}\n\nmodel SavedProgress {\n  userId   String @id\n  questId  String\n  progress Int\n  user     User   @relation(fields: [userId], references: [id])\n}\n\nenum QuestStatus {\n  IN_PROGRESS\n  REWARDS_DEPOSITED\n  REWARDS_CLAIMED\n  COMPLETED\n  PARTIALLY_COMPLETED\n}\n\nmodel Audit {\n  transactionId String @id\n  userId        String\n\n  date        DateTime  @default(now())\n  type        AuditType\n  xrdUsdValue Decimal\n  xrdPrice    Decimal   @default(1)\n  data        Json      @default(\"{}\")\n\n  user User @relation(fields: [userId], references: [id])\n\n  @@index([userId])\n}\n\nenum AuditType {\n  DIRECT_DEPOSIT\n  CLAIMBOX_DEPOSIT\n}\n\nenum CountryStatus {\n  ALLOWED\n  BLOCKED // Allow users with golden ticket\n  SANCTIONED // Does not allow any user, even with golden ticket\n}\n\nmodel BlockedCountry {\n  country     String\n  countryCode String        @id\n  status      CountryStatus @default(ALLOWED)\n}\n\nmodel TransactionIntent {\n  discriminator String                  @id\n  status        TransactionIntentStatus @default(WAITING)\n  createdAt     DateTime                @default(now())\n  error         String?\n  userId        String\n  data          Json?\n  transactions  SubmittedTransaction[]\n  batchId       String?\n\n  user  User                      @relation(fields: [userId], references: [id])\n  batch BatchedTransactionIntent? @relation(fields: [batchId], references: [id])\n\n  @@index([status, createdAt])\n}\n\nmodel BatchedTransactionIntent {\n  id                 String                  @id\n  status             TransactionIntentStatus @default(WAITING)\n  createdAt          DateTime                @default(now())\n  error              String?\n  transactionIntents TransactionIntent[]\n\n  @@index([status, createdAt])\n}\n\nenum TransactionIntentStatus {\n  WAITING\n  PENDING\n  ERROR\n  COMPLETED\n  FAILED_RETRY\n  FAILED_PERMANENT\n  PAUSED\n  CANCELLED\n}\n\nmodel SubmittedTransaction {\n  transactionId     String   @id\n  transactionIntent String\n  status            String\n  createdAt         DateTime @default(now())\n\n  transaction TransactionIntent @relation(fields: [transactionIntent], references: [discriminator])\n}\n\nmodel Config {\n  key   String @id\n  value String\n}\n\nmodel Marketing {\n  id           Int     @id @default(autoincrement())\n  userId       String\n  utm_campaign String?\n  utm_medium   String?\n  utm_source   String?\n  utm_id       String?\n  utm_content  String?\n  utm_term     String?\n\n  user User @relation(fields: [userId], references: [id])\n}\n\nmodel GoldenTicket {\n  id          String             @id\n  batchId     String\n  ownerId     String\n  createdAt   DateTime           @default(now())\n  expiresAt   DateTime\n  userId      String?            @unique\n  claimedAt   DateTime?\n  description String?\n  status      GoldenTicketStatus @default(CLAIMABLE)\n  type        TicketType         @default(FULL)\n\n  claimedBy User? @relation(\"claimedBy\", fields: [userId], references: [id])\n  owner     User  @relation(\"owner\", fields: [ownerId], references: [id])\n\n  @@index(fields: [batchId], type: Hash)\n}\n\nenum GoldenTicketStatus {\n  CLAIMABLE\n  CLAIMED\n  CLAIMED_INVALID\n}\n\nenum TicketType {\n  FULL\n  LIMITED\n}\n",
  "inlineSchemaHash": "3695e0d852c2eb10f40a67b9b09a4ebbab8b6d1f7730921b101f7e9a40e89325",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/prisma",
    "prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identityAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserType\",\"default\":\"USER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referralCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referredBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referredByUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"Referrer\",\"relationFromFields\":[\"referredBy\"],\"relationToFields\":[\"referralCode\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserStatus\",\"default\":\"OK\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"events\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"relationName\":\"EventToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"MessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserEmail\",\"relationName\":\"UserToUserEmail\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserPhoneNumber\",\"relationName\":\"UserToUserPhoneNumber\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completedQuestRequirements\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompletedQuestRequirement\",\"relationName\":\"CompletedQuestRequirementToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"savedProgress\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SavedProgress\",\"relationName\":\"SavedProgressToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Audit\",\"relationName\":\"AuditToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"questProgress\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"QuestProgress\",\"relationName\":\"QuestProgressToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referredUsers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"Referrer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TransactionIntent\",\"relationName\":\"TransactionIntentToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"marketing\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Marketing\",\"relationName\":\"MarketingToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Referral\",\"relationName\":\"ReferralToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goldenTicketClaimed\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoldenTicket\",\"relationName\":\"claimedBy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goldenTicketsOwned\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoldenTicket\",\"relationName\":\"owner\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loginAttempts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LoginAttempt\",\"relationName\":\"LoginAttemptToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserEmail\":{\"dbName\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"newsletter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserEmail\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Image\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ImageType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserPhoneNumber\":{\"dbName\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserPhoneNumber\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Referral\":{\"dbName\":null,\"fields\":[{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReferralAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"xrdValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"relationName\":\"EventToReferral\",\"relationFromFields\":[\"eventId\"],\"relationToFields\":[\"transactionId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ReferralToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Challenge\":{\"dbName\":null,\"fields\":[{\"name\":\"challenge\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Event\":{\"dbName\":null,\"fields\":[{\"name\":\"transactionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"questId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EventStatus\",\"default\":\"WAITING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"EventToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referral\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Referral\",\"relationName\":\"EventToReferral\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Message\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seenAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"MessageToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"IpAssessment\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"acceptLanguage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loginAttempts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LoginAttempt\",\"relationName\":\"IpAssessmentToLoginAttempt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LoginAttempt\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAssessmentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LoginAttemptType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"LoginAttemptToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAssessment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"IpAssessment\",\"relationName\":\"IpAssessmentToLoginAttempt\",\"relationFromFields\":[\"ipAssessmentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Notification\":{\"dbName\":null,\"fields\":[{\"name\":\"notificationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seenAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"notificationId\",\"userId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CompletedQuestRequirement\":{\"dbName\":null,\"fields\":[{\"name\":\"questId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requirementId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CompletedQuestRequirementToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"questId\",\"userId\",\"requirementId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"QuestProgress\":{\"dbName\":null,\"fields\":[{\"name\":\"questId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"QuestStatus\",\"default\":\"IN_PROGRESS\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"QuestProgressToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"questId\",\"userId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SavedProgress\":{\"dbName\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"questId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"progress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SavedProgressToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Audit\":{\"dbName\":null,\"fields\":[{\"name\":\"transactionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"xrdUsdValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"xrdPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AuditToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BlockedCountry\":{\"dbName\":null,\"fields\":[{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CountryStatus\",\"default\":\"ALLOWED\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TransactionIntent\":{\"dbName\":null,\"fields\":[{\"name\":\"discriminator\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TransactionIntentStatus\",\"default\":\"WAITING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SubmittedTransaction\",\"relationName\":\"SubmittedTransactionToTransactionIntent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batchId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TransactionIntentToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batch\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BatchedTransactionIntent\",\"relationName\":\"BatchedTransactionIntentToTransactionIntent\",\"relationFromFields\":[\"batchId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BatchedTransactionIntent\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TransactionIntentStatus\",\"default\":\"WAITING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionIntents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TransactionIntent\",\"relationName\":\"BatchedTransactionIntentToTransactionIntent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SubmittedTransaction\":{\"dbName\":null,\"fields\":[{\"name\":\"transactionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionIntent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transaction\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TransactionIntent\",\"relationName\":\"SubmittedTransactionToTransactionIntent\",\"relationFromFields\":[\"transactionIntent\"],\"relationToFields\":[\"discriminator\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Config\":{\"dbName\":null,\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Marketing\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_campaign\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_medium\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_source\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"utm_term\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"MarketingToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoldenTicket\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"batchId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"claimedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"GoldenTicketStatus\",\"default\":\"CLAIMABLE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TicketType\",\"default\":\"FULL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"claimedBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"claimedBy\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"owner\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"UserType\":{\"values\":[{\"name\":\"USER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},\"UserStatus\":{\"values\":[{\"name\":\"OK\",\"dbName\":null},{\"name\":\"PERMANENTLY_BLOCKED\",\"dbName\":null},{\"name\":\"TEMPORARILY_BLOCKED\",\"dbName\":null}],\"dbName\":null},\"ImageType\":{\"values\":[{\"name\":\"RadMorph\",\"dbName\":null},{\"name\":\"RadGem\",\"dbName\":null},{\"name\":\"Card\",\"dbName\":null}],\"dbName\":null},\"ReferralAction\":{\"values\":[{\"name\":\"INC\",\"dbName\":null},{\"name\":\"DEC\",\"dbName\":null}],\"dbName\":null},\"EventStatus\":{\"values\":[{\"name\":\"WAITING\",\"dbName\":null},{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"FAILED_RETRY\",\"dbName\":null},{\"name\":\"FAILED_PERMANENT\",\"dbName\":null},{\"name\":\"PAUSED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"LoginAttemptType\":{\"values\":[{\"name\":\"USER_CREATED\",\"dbName\":null},{\"name\":\"USER_LOGIN\",\"dbName\":null},{\"name\":\"USER_VERIFY\",\"dbName\":null}],\"dbName\":null},\"QuestStatus\":{\"values\":[{\"name\":\"IN_PROGRESS\",\"dbName\":null},{\"name\":\"REWARDS_DEPOSITED\",\"dbName\":null},{\"name\":\"REWARDS_CLAIMED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"PARTIALLY_COMPLETED\",\"dbName\":null}],\"dbName\":null},\"AuditType\":{\"values\":[{\"name\":\"DIRECT_DEPOSIT\",\"dbName\":null},{\"name\":\"CLAIMBOX_DEPOSIT\",\"dbName\":null}],\"dbName\":null},\"CountryStatus\":{\"values\":[{\"name\":\"ALLOWED\",\"dbName\":null},{\"name\":\"BLOCKED\",\"dbName\":null},{\"name\":\"SANCTIONED\",\"dbName\":null}],\"dbName\":null},\"TransactionIntentStatus\":{\"values\":[{\"name\":\"WAITING\",\"dbName\":null},{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"FAILED_RETRY\",\"dbName\":null},{\"name\":\"FAILED_PERMANENT\",\"dbName\":null},{\"name\":\"PAUSED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"GoldenTicketStatus\":{\"values\":[{\"name\":\"CLAIMABLE\",\"dbName\":null},{\"name\":\"CLAIMED\",\"dbName\":null},{\"name\":\"CLAIMED_INVALID\",\"dbName\":null}],\"dbName\":null},\"TicketType\":{\"values\":[{\"name\":\"FULL\",\"dbName\":null},{\"name\":\"LIMITED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "src/prisma/libquery_engine-darwin-arm64.dylib.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-linux-arm64-openssl-1.1.x.so.node");
path.join(process.cwd(), "src/prisma/libquery_engine-linux-arm64-openssl-1.1.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-1.1.x.so.node");
path.join(process.cwd(), "src/prisma/libquery_engine-debian-openssl-1.1.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/prisma/schema.prisma")

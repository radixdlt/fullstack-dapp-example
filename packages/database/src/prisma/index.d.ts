
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>
/**
 * Model Referral
 * 
 */
export type Referral = $Result.DefaultSelection<Prisma.$ReferralPayload>
/**
 * Model Challenge
 * 
 */
export type Challenge = $Result.DefaultSelection<Prisma.$ChallengePayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model LoginAttempt
 * 
 */
export type LoginAttempt = $Result.DefaultSelection<Prisma.$LoginAttemptPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model CompletedQuestRequirement
 * 
 */
export type CompletedQuestRequirement = $Result.DefaultSelection<Prisma.$CompletedQuestRequirementPayload>
/**
 * Model QuestProgress
 * 
 */
export type QuestProgress = $Result.DefaultSelection<Prisma.$QuestProgressPayload>
/**
 * Model SavedProgress
 * 
 */
export type SavedProgress = $Result.DefaultSelection<Prisma.$SavedProgressPayload>
/**
 * Model Audit
 * 
 */
export type Audit = $Result.DefaultSelection<Prisma.$AuditPayload>
/**
 * Model TransactionIntent
 * 
 */
export type TransactionIntent = $Result.DefaultSelection<Prisma.$TransactionIntentPayload>
/**
 * Model BatchedTransactionIntent
 * 
 */
export type BatchedTransactionIntent = $Result.DefaultSelection<Prisma.$BatchedTransactionIntentPayload>
/**
 * Model SubmittedTransaction
 * 
 */
export type SubmittedTransaction = $Result.DefaultSelection<Prisma.$SubmittedTransactionPayload>
/**
 * Model Config
 * 
 */
export type Config = $Result.DefaultSelection<Prisma.$ConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const UserStatus: {
  OK: 'OK',
  PERMANENTLY_BLOCKED: 'PERMANENTLY_BLOCKED',
  TEMPORARILY_BLOCKED: 'TEMPORARILY_BLOCKED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const ImageType: {
  RadMorph: 'RadMorph',
  RadGem: 'RadGem',
  Card: 'Card'
};

export type ImageType = (typeof ImageType)[keyof typeof ImageType]


export const ReferralAction: {
  INC: 'INC',
  DEC: 'DEC'
};

export type ReferralAction = (typeof ReferralAction)[keyof typeof ReferralAction]


export const EventStatus: {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED',
  FAILED_RETRY: 'FAILED_RETRY',
  FAILED_PERMANENT: 'FAILED_PERMANENT',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const LoginAttemptType: {
  USER_CREATED: 'USER_CREATED',
  USER_LOGIN: 'USER_LOGIN',
  USER_VERIFY: 'USER_VERIFY'
};

export type LoginAttemptType = (typeof LoginAttemptType)[keyof typeof LoginAttemptType]


export const QuestStatus: {
  IN_PROGRESS: 'IN_PROGRESS',
  REWARDS_DEPOSITED: 'REWARDS_DEPOSITED',
  REWARDS_CLAIMED: 'REWARDS_CLAIMED',
  COMPLETED: 'COMPLETED',
  PARTIALLY_COMPLETED: 'PARTIALLY_COMPLETED'
};

export type QuestStatus = (typeof QuestStatus)[keyof typeof QuestStatus]


export const AuditType: {
  DIRECT_DEPOSIT: 'DIRECT_DEPOSIT',
  CLAIMBOX_DEPOSIT: 'CLAIMBOX_DEPOSIT'
};

export type AuditType = (typeof AuditType)[keyof typeof AuditType]


export const TransactionIntentStatus: {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED',
  FAILED_RETRY: 'FAILED_RETRY',
  FAILED_PERMANENT: 'FAILED_PERMANENT',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED'
};

export type TransactionIntentStatus = (typeof TransactionIntentStatus)[keyof typeof TransactionIntentStatus]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type ImageType = $Enums.ImageType

export const ImageType: typeof $Enums.ImageType

export type ReferralAction = $Enums.ReferralAction

export const ReferralAction: typeof $Enums.ReferralAction

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

export type LoginAttemptType = $Enums.LoginAttemptType

export const LoginAttemptType: typeof $Enums.LoginAttemptType

export type QuestStatus = $Enums.QuestStatus

export const QuestStatus: typeof $Enums.QuestStatus

export type AuditType = $Enums.AuditType

export const AuditType: typeof $Enums.AuditType

export type TransactionIntentStatus = $Enums.TransactionIntentStatus

export const TransactionIntentStatus: typeof $Enums.TransactionIntentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs>;

  /**
   * `prisma.referral`: Exposes CRUD operations for the **Referral** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Referrals
    * const referrals = await prisma.referral.findMany()
    * ```
    */
  get referral(): Prisma.ReferralDelegate<ExtArgs>;

  /**
   * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Challenges
    * const challenges = await prisma.challenge.findMany()
    * ```
    */
  get challenge(): Prisma.ChallengeDelegate<ExtArgs>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.loginAttempt`: Exposes CRUD operations for the **LoginAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoginAttempts
    * const loginAttempts = await prisma.loginAttempt.findMany()
    * ```
    */
  get loginAttempt(): Prisma.LoginAttemptDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.completedQuestRequirement`: Exposes CRUD operations for the **CompletedQuestRequirement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompletedQuestRequirements
    * const completedQuestRequirements = await prisma.completedQuestRequirement.findMany()
    * ```
    */
  get completedQuestRequirement(): Prisma.CompletedQuestRequirementDelegate<ExtArgs>;

  /**
   * `prisma.questProgress`: Exposes CRUD operations for the **QuestProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestProgresses
    * const questProgresses = await prisma.questProgress.findMany()
    * ```
    */
  get questProgress(): Prisma.QuestProgressDelegate<ExtArgs>;

  /**
   * `prisma.savedProgress`: Exposes CRUD operations for the **SavedProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedProgresses
    * const savedProgresses = await prisma.savedProgress.findMany()
    * ```
    */
  get savedProgress(): Prisma.SavedProgressDelegate<ExtArgs>;

  /**
   * `prisma.audit`: Exposes CRUD operations for the **Audit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audits
    * const audits = await prisma.audit.findMany()
    * ```
    */
  get audit(): Prisma.AuditDelegate<ExtArgs>;

  /**
   * `prisma.transactionIntent`: Exposes CRUD operations for the **TransactionIntent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionIntents
    * const transactionIntents = await prisma.transactionIntent.findMany()
    * ```
    */
  get transactionIntent(): Prisma.TransactionIntentDelegate<ExtArgs>;

  /**
   * `prisma.batchedTransactionIntent`: Exposes CRUD operations for the **BatchedTransactionIntent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BatchedTransactionIntents
    * const batchedTransactionIntents = await prisma.batchedTransactionIntent.findMany()
    * ```
    */
  get batchedTransactionIntent(): Prisma.BatchedTransactionIntentDelegate<ExtArgs>;

  /**
   * `prisma.submittedTransaction`: Exposes CRUD operations for the **SubmittedTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubmittedTransactions
    * const submittedTransactions = await prisma.submittedTransaction.findMany()
    * ```
    */
  get submittedTransaction(): Prisma.SubmittedTransactionDelegate<ExtArgs>;

  /**
   * `prisma.config`: Exposes CRUD operations for the **Config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configs
    * const configs = await prisma.config.findMany()
    * ```
    */
  get config(): Prisma.ConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.15.0
   * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Image: 'Image',
    Referral: 'Referral',
    Challenge: 'Challenge',
    Event: 'Event',
    Message: 'Message',
    LoginAttempt: 'LoginAttempt',
    Notification: 'Notification',
    CompletedQuestRequirement: 'CompletedQuestRequirement',
    QuestProgress: 'QuestProgress',
    SavedProgress: 'SavedProgress',
    Audit: 'Audit',
    TransactionIntent: 'TransactionIntent',
    BatchedTransactionIntent: 'BatchedTransactionIntent',
    SubmittedTransaction: 'SubmittedTransaction',
    Config: 'Config'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'image' | 'referral' | 'challenge' | 'event' | 'message' | 'loginAttempt' | 'notification' | 'completedQuestRequirement' | 'questProgress' | 'savedProgress' | 'audit' | 'transactionIntent' | 'batchedTransactionIntent' | 'submittedTransaction' | 'config'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>,
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      Referral: {
        payload: Prisma.$ReferralPayload<ExtArgs>
        fields: Prisma.ReferralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findFirst: {
            args: Prisma.ReferralFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          findMany: {
            args: Prisma.ReferralFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          create: {
            args: Prisma.ReferralCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          createMany: {
            args: Prisma.ReferralCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[]
          }
          delete: {
            args: Prisma.ReferralDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          update: {
            args: Prisma.ReferralUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          deleteMany: {
            args: Prisma.ReferralDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReferralUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>
          }
          aggregate: {
            args: Prisma.ReferralAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReferral>
          }
          groupBy: {
            args: Prisma.ReferralGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReferralGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralCountArgs<ExtArgs>,
            result: $Utils.Optional<ReferralCountAggregateOutputType> | number
          }
        }
      }
      Challenge: {
        payload: Prisma.$ChallengePayload<ExtArgs>
        fields: Prisma.ChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findFirst: {
            args: Prisma.ChallengeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findMany: {
            args: Prisma.ChallengeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          create: {
            args: Prisma.ChallengeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          createMany: {
            args: Prisma.ChallengeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          delete: {
            args: Prisma.ChallengeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          update: {
            args: Prisma.ChallengeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          deleteMany: {
            args: Prisma.ChallengeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChallengeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          aggregate: {
            args: Prisma.ChallengeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChallenge>
          }
          groupBy: {
            args: Prisma.ChallengeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeCountArgs<ExtArgs>,
            result: $Utils.Optional<ChallengeCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>,
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>,
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      LoginAttempt: {
        payload: Prisma.$LoginAttemptPayload<ExtArgs>
        fields: Prisma.LoginAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoginAttemptFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoginAttemptFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          findFirst: {
            args: Prisma.LoginAttemptFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoginAttemptFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          findMany: {
            args: Prisma.LoginAttemptFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>[]
          }
          create: {
            args: Prisma.LoginAttemptCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          createMany: {
            args: Prisma.LoginAttemptCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoginAttemptCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>[]
          }
          delete: {
            args: Prisma.LoginAttemptDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          update: {
            args: Prisma.LoginAttemptUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          deleteMany: {
            args: Prisma.LoginAttemptDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.LoginAttemptUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.LoginAttemptUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          aggregate: {
            args: Prisma.LoginAttemptAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLoginAttempt>
          }
          groupBy: {
            args: Prisma.LoginAttemptGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LoginAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoginAttemptCountArgs<ExtArgs>,
            result: $Utils.Optional<LoginAttemptCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>,
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      CompletedQuestRequirement: {
        payload: Prisma.$CompletedQuestRequirementPayload<ExtArgs>
        fields: Prisma.CompletedQuestRequirementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompletedQuestRequirementFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompletedQuestRequirementFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          findFirst: {
            args: Prisma.CompletedQuestRequirementFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompletedQuestRequirementFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          findMany: {
            args: Prisma.CompletedQuestRequirementFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>[]
          }
          create: {
            args: Prisma.CompletedQuestRequirementCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          createMany: {
            args: Prisma.CompletedQuestRequirementCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompletedQuestRequirementCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>[]
          }
          delete: {
            args: Prisma.CompletedQuestRequirementDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          update: {
            args: Prisma.CompletedQuestRequirementUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          deleteMany: {
            args: Prisma.CompletedQuestRequirementDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CompletedQuestRequirementUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CompletedQuestRequirementUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CompletedQuestRequirementPayload>
          }
          aggregate: {
            args: Prisma.CompletedQuestRequirementAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCompletedQuestRequirement>
          }
          groupBy: {
            args: Prisma.CompletedQuestRequirementGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CompletedQuestRequirementGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompletedQuestRequirementCountArgs<ExtArgs>,
            result: $Utils.Optional<CompletedQuestRequirementCountAggregateOutputType> | number
          }
        }
      }
      QuestProgress: {
        payload: Prisma.$QuestProgressPayload<ExtArgs>
        fields: Prisma.QuestProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestProgressFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestProgressFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          findFirst: {
            args: Prisma.QuestProgressFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestProgressFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          findMany: {
            args: Prisma.QuestProgressFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>[]
          }
          create: {
            args: Prisma.QuestProgressCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          createMany: {
            args: Prisma.QuestProgressCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestProgressCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>[]
          }
          delete: {
            args: Prisma.QuestProgressDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          update: {
            args: Prisma.QuestProgressUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          deleteMany: {
            args: Prisma.QuestProgressDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.QuestProgressUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.QuestProgressUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$QuestProgressPayload>
          }
          aggregate: {
            args: Prisma.QuestProgressAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateQuestProgress>
          }
          groupBy: {
            args: Prisma.QuestProgressGroupByArgs<ExtArgs>,
            result: $Utils.Optional<QuestProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestProgressCountArgs<ExtArgs>,
            result: $Utils.Optional<QuestProgressCountAggregateOutputType> | number
          }
        }
      }
      SavedProgress: {
        payload: Prisma.$SavedProgressPayload<ExtArgs>
        fields: Prisma.SavedProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedProgressFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedProgressFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          findFirst: {
            args: Prisma.SavedProgressFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedProgressFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          findMany: {
            args: Prisma.SavedProgressFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>[]
          }
          create: {
            args: Prisma.SavedProgressCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          createMany: {
            args: Prisma.SavedProgressCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedProgressCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>[]
          }
          delete: {
            args: Prisma.SavedProgressDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          update: {
            args: Prisma.SavedProgressUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          deleteMany: {
            args: Prisma.SavedProgressDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SavedProgressUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SavedProgressUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SavedProgressPayload>
          }
          aggregate: {
            args: Prisma.SavedProgressAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSavedProgress>
          }
          groupBy: {
            args: Prisma.SavedProgressGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SavedProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedProgressCountArgs<ExtArgs>,
            result: $Utils.Optional<SavedProgressCountAggregateOutputType> | number
          }
        }
      }
      Audit: {
        payload: Prisma.$AuditPayload<ExtArgs>
        fields: Prisma.AuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          findFirst: {
            args: Prisma.AuditFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          findMany: {
            args: Prisma.AuditFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>[]
          }
          create: {
            args: Prisma.AuditCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          createMany: {
            args: Prisma.AuditCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>[]
          }
          delete: {
            args: Prisma.AuditDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          update: {
            args: Prisma.AuditUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          deleteMany: {
            args: Prisma.AuditDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AuditUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AuditUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AuditPayload>
          }
          aggregate: {
            args: Prisma.AuditAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAudit>
          }
          groupBy: {
            args: Prisma.AuditGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditCountArgs<ExtArgs>,
            result: $Utils.Optional<AuditCountAggregateOutputType> | number
          }
        }
      }
      TransactionIntent: {
        payload: Prisma.$TransactionIntentPayload<ExtArgs>
        fields: Prisma.TransactionIntentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionIntentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionIntentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          findFirst: {
            args: Prisma.TransactionIntentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionIntentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          findMany: {
            args: Prisma.TransactionIntentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>[]
          }
          create: {
            args: Prisma.TransactionIntentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          createMany: {
            args: Prisma.TransactionIntentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionIntentCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>[]
          }
          delete: {
            args: Prisma.TransactionIntentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          update: {
            args: Prisma.TransactionIntentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          deleteMany: {
            args: Prisma.TransactionIntentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionIntentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TransactionIntentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionIntentPayload>
          }
          aggregate: {
            args: Prisma.TransactionIntentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTransactionIntent>
          }
          groupBy: {
            args: Prisma.TransactionIntentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TransactionIntentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionIntentCountArgs<ExtArgs>,
            result: $Utils.Optional<TransactionIntentCountAggregateOutputType> | number
          }
        }
      }
      BatchedTransactionIntent: {
        payload: Prisma.$BatchedTransactionIntentPayload<ExtArgs>
        fields: Prisma.BatchedTransactionIntentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchedTransactionIntentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchedTransactionIntentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          findFirst: {
            args: Prisma.BatchedTransactionIntentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchedTransactionIntentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          findMany: {
            args: Prisma.BatchedTransactionIntentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>[]
          }
          create: {
            args: Prisma.BatchedTransactionIntentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          createMany: {
            args: Prisma.BatchedTransactionIntentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchedTransactionIntentCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>[]
          }
          delete: {
            args: Prisma.BatchedTransactionIntentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          update: {
            args: Prisma.BatchedTransactionIntentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          deleteMany: {
            args: Prisma.BatchedTransactionIntentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BatchedTransactionIntentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BatchedTransactionIntentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BatchedTransactionIntentPayload>
          }
          aggregate: {
            args: Prisma.BatchedTransactionIntentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBatchedTransactionIntent>
          }
          groupBy: {
            args: Prisma.BatchedTransactionIntentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BatchedTransactionIntentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchedTransactionIntentCountArgs<ExtArgs>,
            result: $Utils.Optional<BatchedTransactionIntentCountAggregateOutputType> | number
          }
        }
      }
      SubmittedTransaction: {
        payload: Prisma.$SubmittedTransactionPayload<ExtArgs>
        fields: Prisma.SubmittedTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmittedTransactionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmittedTransactionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          findFirst: {
            args: Prisma.SubmittedTransactionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmittedTransactionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          findMany: {
            args: Prisma.SubmittedTransactionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>[]
          }
          create: {
            args: Prisma.SubmittedTransactionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          createMany: {
            args: Prisma.SubmittedTransactionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmittedTransactionCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>[]
          }
          delete: {
            args: Prisma.SubmittedTransactionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          update: {
            args: Prisma.SubmittedTransactionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          deleteMany: {
            args: Prisma.SubmittedTransactionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SubmittedTransactionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SubmittedTransactionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SubmittedTransactionPayload>
          }
          aggregate: {
            args: Prisma.SubmittedTransactionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSubmittedTransaction>
          }
          groupBy: {
            args: Prisma.SubmittedTransactionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SubmittedTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmittedTransactionCountArgs<ExtArgs>,
            result: $Utils.Optional<SubmittedTransactionCountAggregateOutputType> | number
          }
        }
      }
      Config: {
        payload: Prisma.$ConfigPayload<ExtArgs>
        fields: Prisma.ConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          findFirst: {
            args: Prisma.ConfigFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          findMany: {
            args: Prisma.ConfigFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>[]
          }
          create: {
            args: Prisma.ConfigCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          createMany: {
            args: Prisma.ConfigCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>[]
          }
          delete: {
            args: Prisma.ConfigDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          update: {
            args: Prisma.ConfigUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          deleteMany: {
            args: Prisma.ConfigDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ConfigUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          aggregate: {
            args: Prisma.ConfigAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateConfig>
          }
          groupBy: {
            args: Prisma.ConfigGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigCountArgs<ExtArgs>,
            result: $Utils.Optional<ConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    events: number
    messages: number
    completedQuestRequirements: number
    auditLogs: number
    questProgress: number
    referredUsers: number
    transactions: number
    referals: number
    loginAttempts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    completedQuestRequirements?: boolean | UserCountOutputTypeCountCompletedQuestRequirementsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    questProgress?: boolean | UserCountOutputTypeCountQuestProgressArgs
    referredUsers?: boolean | UserCountOutputTypeCountReferredUsersArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    referals?: boolean | UserCountOutputTypeCountReferalsArgs
    loginAttempts?: boolean | UserCountOutputTypeCountLoginAttemptsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCompletedQuestRequirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompletedQuestRequirementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuestProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferredUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionIntentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoginAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginAttemptWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    referral: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referral?: boolean | EventCountOutputTypeCountReferralArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountReferralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
  }


  /**
   * Count Type TransactionIntentCountOutputType
   */

  export type TransactionIntentCountOutputType = {
    transactions: number
  }

  export type TransactionIntentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | TransactionIntentCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * TransactionIntentCountOutputType without action
   */
  export type TransactionIntentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntentCountOutputType
     */
    select?: TransactionIntentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionIntentCountOutputType without action
   */
  export type TransactionIntentCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmittedTransactionWhereInput
  }


  /**
   * Count Type BatchedTransactionIntentCountOutputType
   */

  export type BatchedTransactionIntentCountOutputType = {
    transactionIntents: number
  }

  export type BatchedTransactionIntentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactionIntents?: boolean | BatchedTransactionIntentCountOutputTypeCountTransactionIntentsArgs
  }

  // Custom InputTypes
  /**
   * BatchedTransactionIntentCountOutputType without action
   */
  export type BatchedTransactionIntentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntentCountOutputType
     */
    select?: BatchedTransactionIntentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchedTransactionIntentCountOutputType without action
   */
  export type BatchedTransactionIntentCountOutputTypeCountTransactionIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionIntentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    identityAddress: string | null
    createdAt: Date | null
    accountAddress: string | null
    name: string | null
    country: string | null
    type: $Enums.UserType | null
    referralCode: string | null
    referredBy: string | null
    status: $Enums.UserStatus | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    identityAddress: string | null
    createdAt: Date | null
    accountAddress: string | null
    name: string | null
    country: string | null
    type: $Enums.UserType | null
    referralCode: string | null
    referredBy: string | null
    status: $Enums.UserStatus | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    identityAddress: number
    createdAt: number
    accountAddress: number
    name: number
    country: number
    type: number
    referralCode: number
    referredBy: number
    status: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    identityAddress?: true
    createdAt?: true
    accountAddress?: true
    name?: true
    country?: true
    type?: true
    referralCode?: true
    referredBy?: true
    status?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    identityAddress?: true
    createdAt?: true
    accountAddress?: true
    name?: true
    country?: true
    type?: true
    referralCode?: true
    referredBy?: true
    status?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    identityAddress?: true
    createdAt?: true
    accountAddress?: true
    name?: true
    country?: true
    type?: true
    referralCode?: true
    referredBy?: true
    status?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    identityAddress: string
    createdAt: Date
    accountAddress: string | null
    name: string | null
    country: string | null
    type: $Enums.UserType
    referralCode: string
    referredBy: string | null
    status: $Enums.UserStatus
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identityAddress?: boolean
    createdAt?: boolean
    accountAddress?: boolean
    name?: boolean
    country?: boolean
    type?: boolean
    referralCode?: boolean
    referredBy?: boolean
    status?: boolean
    referredByUser?: boolean | User$referredByUserArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    completedQuestRequirements?: boolean | User$completedQuestRequirementsArgs<ExtArgs>
    savedProgress?: boolean | User$savedProgressArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    questProgress?: boolean | User$questProgressArgs<ExtArgs>
    referredUsers?: boolean | User$referredUsersArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    referals?: boolean | User$referalsArgs<ExtArgs>
    loginAttempts?: boolean | User$loginAttemptsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identityAddress?: boolean
    createdAt?: boolean
    accountAddress?: boolean
    name?: boolean
    country?: boolean
    type?: boolean
    referralCode?: boolean
    referredBy?: boolean
    status?: boolean
    referredByUser?: boolean | User$referredByUserArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    identityAddress?: boolean
    createdAt?: boolean
    accountAddress?: boolean
    name?: boolean
    country?: boolean
    type?: boolean
    referralCode?: boolean
    referredBy?: boolean
    status?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referredByUser?: boolean | User$referredByUserArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    completedQuestRequirements?: boolean | User$completedQuestRequirementsArgs<ExtArgs>
    savedProgress?: boolean | User$savedProgressArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    questProgress?: boolean | User$questProgressArgs<ExtArgs>
    referredUsers?: boolean | User$referredUsersArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    referals?: boolean | User$referalsArgs<ExtArgs>
    loginAttempts?: boolean | User$loginAttemptsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referredByUser?: boolean | User$referredByUserArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      referredByUser: Prisma.$UserPayload<ExtArgs> | null
      events: Prisma.$EventPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      completedQuestRequirements: Prisma.$CompletedQuestRequirementPayload<ExtArgs>[]
      savedProgress: Prisma.$SavedProgressPayload<ExtArgs> | null
      auditLogs: Prisma.$AuditPayload<ExtArgs>[]
      questProgress: Prisma.$QuestProgressPayload<ExtArgs>[]
      referredUsers: Prisma.$UserPayload<ExtArgs>[]
      transactions: Prisma.$TransactionIntentPayload<ExtArgs>[]
      referals: Prisma.$ReferralPayload<ExtArgs>[]
      loginAttempts: Prisma.$LoginAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identityAddress: string
      createdAt: Date
      accountAddress: string | null
      name: string | null
      country: string | null
      type: $Enums.UserType
      referralCode: string
      referredBy: string | null
      status: $Enums.UserStatus
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends UserCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    referredByUser<T extends User$referredByUserArgs<ExtArgs> = {}>(args?: Subset<T, User$referredByUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findMany'> | Null>;

    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findMany'> | Null>;

    completedQuestRequirements<T extends User$completedQuestRequirementsArgs<ExtArgs> = {}>(args?: Subset<T, User$completedQuestRequirementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findMany'> | Null>;

    savedProgress<T extends User$savedProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$savedProgressArgs<ExtArgs>>): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findMany'> | Null>;

    questProgress<T extends User$questProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$questProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findMany'> | Null>;

    referredUsers<T extends User$referredUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$referredUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'> | Null>;

    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findMany'> | Null>;

    referals<T extends User$referalsArgs<ExtArgs> = {}>(args?: Subset<T, User$referalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findMany'> | Null>;

    loginAttempts<T extends User$loginAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$loginAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly identityAddress: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly accountAddress: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly type: FieldRef<"User", 'UserType'>
    readonly referralCode: FieldRef<"User", 'String'>
    readonly referredBy: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.referredByUser
   */
  export type User$referredByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.completedQuestRequirements
   */
  export type User$completedQuestRequirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    where?: CompletedQuestRequirementWhereInput
    orderBy?: CompletedQuestRequirementOrderByWithRelationInput | CompletedQuestRequirementOrderByWithRelationInput[]
    cursor?: CompletedQuestRequirementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompletedQuestRequirementScalarFieldEnum | CompletedQuestRequirementScalarFieldEnum[]
  }

  /**
   * User.savedProgress
   */
  export type User$savedProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    where?: SavedProgressWhereInput
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    where?: AuditWhereInput
    orderBy?: AuditOrderByWithRelationInput | AuditOrderByWithRelationInput[]
    cursor?: AuditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditScalarFieldEnum | AuditScalarFieldEnum[]
  }

  /**
   * User.questProgress
   */
  export type User$questProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    where?: QuestProgressWhereInput
    orderBy?: QuestProgressOrderByWithRelationInput | QuestProgressOrderByWithRelationInput[]
    cursor?: QuestProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestProgressScalarFieldEnum | QuestProgressScalarFieldEnum[]
  }

  /**
   * User.referredUsers
   */
  export type User$referredUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    where?: TransactionIntentWhereInput
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    cursor?: TransactionIntentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionIntentScalarFieldEnum | TransactionIntentScalarFieldEnum[]
  }

  /**
   * User.referals
   */
  export type User$referalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    cursor?: ReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * User.loginAttempts
   */
  export type User$loginAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    where?: LoginAttemptWhereInput
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    cursor?: LoginAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ImageType | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ImageType | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    url: number
    type: number
    _all: number
  }


  export type ImageMinAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    url?: true
    type?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    url: string
    type: $Enums.ImageType
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    url?: boolean
    type?: boolean
  }


  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      type: $Enums.ImageType
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ImageFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ImageFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ImageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
    **/
    create<T extends ImageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ImageCreateArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ImageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
    **/
    delete<T extends ImageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ImageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ImageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ImageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
    **/
    upsert<T extends ImageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>
    ): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Image model
   */ 
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly url: FieldRef<"Image", 'String'>
    readonly type: FieldRef<"Image", 'ImageType'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
  }


  /**
   * Model Referral
   */

  export type AggregateReferral = {
    _count: ReferralCountAggregateOutputType | null
    _avg: ReferralAvgAggregateOutputType | null
    _sum: ReferralSumAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  export type ReferralAvgAggregateOutputType = {
    xrdValue: Decimal | null
  }

  export type ReferralSumAggregateOutputType = {
    xrdValue: Decimal | null
  }

  export type ReferralMinAggregateOutputType = {
    eventId: string | null
    userId: string | null
    action: $Enums.ReferralAction | null
    xrdValue: Decimal | null
  }

  export type ReferralMaxAggregateOutputType = {
    eventId: string | null
    userId: string | null
    action: $Enums.ReferralAction | null
    xrdValue: Decimal | null
  }

  export type ReferralCountAggregateOutputType = {
    eventId: number
    userId: number
    action: number
    xrdValue: number
    _all: number
  }


  export type ReferralAvgAggregateInputType = {
    xrdValue?: true
  }

  export type ReferralSumAggregateInputType = {
    xrdValue?: true
  }

  export type ReferralMinAggregateInputType = {
    eventId?: true
    userId?: true
    action?: true
    xrdValue?: true
  }

  export type ReferralMaxAggregateInputType = {
    eventId?: true
    userId?: true
    action?: true
    xrdValue?: true
  }

  export type ReferralCountAggregateInputType = {
    eventId?: true
    userId?: true
    action?: true
    xrdValue?: true
    _all?: true
  }

  export type ReferralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referral to aggregate.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Referrals
    **/
    _count?: true | ReferralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReferralAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReferralSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralMaxAggregateInputType
  }

  export type GetReferralAggregateType<T extends ReferralAggregateArgs> = {
        [P in keyof T & keyof AggregateReferral]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferral[P]>
      : GetScalarType<T[P], AggregateReferral[P]>
  }




  export type ReferralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithAggregationInput | ReferralOrderByWithAggregationInput[]
    by: ReferralScalarFieldEnum[] | ReferralScalarFieldEnum
    having?: ReferralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralCountAggregateInputType | true
    _avg?: ReferralAvgAggregateInputType
    _sum?: ReferralSumAggregateInputType
    _min?: ReferralMinAggregateInputType
    _max?: ReferralMaxAggregateInputType
  }

  export type ReferralGroupByOutputType = {
    eventId: string
    userId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal
    _count: ReferralCountAggregateOutputType | null
    _avg: ReferralAvgAggregateOutputType | null
    _sum: ReferralSumAggregateOutputType | null
    _min: ReferralMinAggregateOutputType | null
    _max: ReferralMaxAggregateOutputType | null
  }

  type GetReferralGroupByPayload<T extends ReferralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralGroupByOutputType[P]>
        }
      >
    >


  export type ReferralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    userId?: boolean
    action?: boolean
    xrdValue?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    userId?: boolean
    action?: boolean
    xrdValue?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referral"]>

  export type ReferralSelectScalar = {
    eventId?: boolean
    userId?: boolean
    action?: boolean
    xrdValue?: boolean
  }

  export type ReferralInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReferralIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReferralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Referral"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      userId: string
      action: $Enums.ReferralAction
      xrdValue: Prisma.Decimal
    }, ExtArgs["result"]["referral"]>
    composites: {}
  }

  type ReferralGetPayload<S extends boolean | null | undefined | ReferralDefaultArgs> = $Result.GetResult<Prisma.$ReferralPayload, S>

  type ReferralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReferralFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReferralCountAggregateInputType | true
    }

  export interface ReferralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Referral'], meta: { name: 'Referral' } }
    /**
     * Find zero or one Referral that matches the filter.
     * @param {ReferralFindUniqueArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReferralFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralFindUniqueArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Referral that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReferralFindUniqueOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReferralFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Referral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReferralFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralFindFirstArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Referral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReferralFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Referrals
     * const referrals = await prisma.referral.findMany()
     * 
     * // Get first 10 Referrals
     * const referrals = await prisma.referral.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const referralWithEventIdOnly = await prisma.referral.findMany({ select: { eventId: true } })
     * 
    **/
    findMany<T extends ReferralFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Referral.
     * @param {ReferralCreateArgs} args - Arguments to create a Referral.
     * @example
     * // Create one Referral
     * const Referral = await prisma.referral.create({
     *   data: {
     *     // ... data to create a Referral
     *   }
     * })
     * 
    **/
    create<T extends ReferralCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralCreateArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Referrals.
     * @param {ReferralCreateManyArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ReferralCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Referrals and returns the data saved in the database.
     * @param {ReferralCreateManyAndReturnArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Referrals and only return the `eventId`
     * const referralWithEventIdOnly = await prisma.referral.createManyAndReturn({ 
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ReferralCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Referral.
     * @param {ReferralDeleteArgs} args - Arguments to delete one Referral.
     * @example
     * // Delete one Referral
     * const Referral = await prisma.referral.delete({
     *   where: {
     *     // ... filter to delete one Referral
     *   }
     * })
     * 
    **/
    delete<T extends ReferralDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralDeleteArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Referral.
     * @param {ReferralUpdateArgs} args - Arguments to update one Referral.
     * @example
     * // Update one Referral
     * const referral = await prisma.referral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReferralUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralUpdateArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Referrals.
     * @param {ReferralDeleteManyArgs} args - Arguments to filter Referrals to delete.
     * @example
     * // Delete a few Referrals
     * const { count } = await prisma.referral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReferralDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReferralDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReferralUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Referral.
     * @param {ReferralUpsertArgs} args - Arguments to update or create a Referral.
     * @example
     * // Update or create a Referral
     * const referral = await prisma.referral.upsert({
     *   create: {
     *     // ... data to create a Referral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Referral we want to update
     *   }
     * })
    **/
    upsert<T extends ReferralUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReferralUpsertArgs<ExtArgs>>
    ): Prisma__ReferralClient<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCountArgs} args - Arguments to filter Referrals to count.
     * @example
     * // Count the number of Referrals
     * const count = await prisma.referral.count({
     *   where: {
     *     // ... the filter for the Referrals we want to count
     *   }
     * })
    **/
    count<T extends ReferralCountArgs>(
      args?: Subset<T, ReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralAggregateArgs>(args: Subset<T, ReferralAggregateArgs>): Prisma.PrismaPromise<GetReferralAggregateType<T>>

    /**
     * Group by Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralGroupByArgs['orderBy'] }
        : { orderBy?: ReferralGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Referral model
   */
  readonly fields: ReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Referral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Referral model
   */ 
  interface ReferralFieldRefs {
    readonly eventId: FieldRef<"Referral", 'String'>
    readonly userId: FieldRef<"Referral", 'String'>
    readonly action: FieldRef<"Referral", 'ReferralAction'>
    readonly xrdValue: FieldRef<"Referral", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * Referral findUnique
   */
  export type ReferralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findUniqueOrThrow
   */
  export type ReferralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral findFirst
   */
  export type ReferralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findFirstOrThrow
   */
  export type ReferralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral findMany
   */
  export type ReferralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Referrals.
     */
    cursor?: ReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Referral create
   */
  export type ReferralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to create a Referral.
     */
    data: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
  }

  /**
   * Referral createMany
   */
  export type ReferralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Referral createManyAndReturn
   */
  export type ReferralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Referral update
   */
  export type ReferralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The data needed to update a Referral.
     */
    data: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
    /**
     * Choose, which Referral to update.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral updateMany
   */
  export type ReferralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput
  }

  /**
   * Referral upsert
   */
  export type ReferralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * The filter to search for the Referral to update in case it exists.
     */
    where: ReferralWhereUniqueInput
    /**
     * In case the Referral found by the `where` argument doesn't exist, create a new Referral with this data.
     */
    create: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>
    /**
     * In case the Referral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>
  }

  /**
   * Referral delete
   */
  export type ReferralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    /**
     * Filter which Referral to delete.
     */
    where: ReferralWhereUniqueInput
  }

  /**
   * Referral deleteMany
   */
  export type ReferralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referrals to delete
     */
    where?: ReferralWhereInput
  }

  /**
   * Referral without action
   */
  export type ReferralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
  }


  /**
   * Model Challenge
   */

  export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  export type ChallengeMinAggregateOutputType = {
    challenge: string | null
    createdAt: Date | null
  }

  export type ChallengeMaxAggregateOutputType = {
    challenge: string | null
    createdAt: Date | null
  }

  export type ChallengeCountAggregateOutputType = {
    challenge: number
    createdAt: number
    _all: number
  }


  export type ChallengeMinAggregateInputType = {
    challenge?: true
    createdAt?: true
  }

  export type ChallengeMaxAggregateInputType = {
    challenge?: true
    createdAt?: true
  }

  export type ChallengeCountAggregateInputType = {
    challenge?: true
    createdAt?: true
    _all?: true
  }

  export type ChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenge to aggregate.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Challenges
    **/
    _count?: true | ChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeMaxAggregateInputType
  }

  export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallenge[P]>
      : GetScalarType<T[P], AggregateChallenge[P]>
  }




  export type ChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithAggregationInput | ChallengeOrderByWithAggregationInput[]
    by: ChallengeScalarFieldEnum[] | ChallengeScalarFieldEnum
    having?: ChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeCountAggregateInputType | true
    _min?: ChallengeMinAggregateInputType
    _max?: ChallengeMaxAggregateInputType
  }

  export type ChallengeGroupByOutputType = {
    challenge: string
    createdAt: Date
    _count: ChallengeCountAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    challenge?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    challenge?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectScalar = {
    challenge?: boolean
    createdAt?: boolean
  }


  export type $ChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Challenge"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      challenge: string
      createdAt: Date
    }, ExtArgs["result"]["challenge"]>
    composites: {}
  }

  type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = $Result.GetResult<Prisma.$ChallengePayload, S>

  type ChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChallengeCountAggregateInputType | true
    }

  export interface ChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Challenge'], meta: { name: 'Challenge' } }
    /**
     * Find zero or one Challenge that matches the filter.
     * @param {ChallengeFindUniqueArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChallengeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Challenge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChallengeFindUniqueOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Challenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChallengeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Challenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Challenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Challenges
     * const challenges = await prisma.challenge.findMany()
     * 
     * // Get first 10 Challenges
     * const challenges = await prisma.challenge.findMany({ take: 10 })
     * 
     * // Only select the `challenge`
     * const challengeWithChallengeOnly = await prisma.challenge.findMany({ select: { challenge: true } })
     * 
    **/
    findMany<T extends ChallengeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Challenge.
     * @param {ChallengeCreateArgs} args - Arguments to create a Challenge.
     * @example
     * // Create one Challenge
     * const Challenge = await prisma.challenge.create({
     *   data: {
     *     // ... data to create a Challenge
     *   }
     * })
     * 
    **/
    create<T extends ChallengeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeCreateArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Challenges.
     * @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ChallengeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Challenges and returns the data saved in the database.
     * @param {ChallengeCreateManyAndReturnArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Challenges and only return the `challenge`
     * const challengeWithChallengeOnly = await prisma.challenge.createManyAndReturn({ 
     *   select: { challenge: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Challenge.
     * @param {ChallengeDeleteArgs} args - Arguments to delete one Challenge.
     * @example
     * // Delete one Challenge
     * const Challenge = await prisma.challenge.delete({
     *   where: {
     *     // ... filter to delete one Challenge
     *   }
     * })
     * 
    **/
    delete<T extends ChallengeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Challenge.
     * @param {ChallengeUpdateArgs} args - Arguments to update one Challenge.
     * @example
     * // Update one Challenge
     * const challenge = await prisma.challenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChallengeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Challenges.
     * @param {ChallengeDeleteManyArgs} args - Arguments to filter Challenges to delete.
     * @example
     * // Delete a few Challenges
     * const { count } = await prisma.challenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChallengeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChallengeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Challenge.
     * @param {ChallengeUpsertArgs} args - Arguments to update or create a Challenge.
     * @example
     * // Update or create a Challenge
     * const challenge = await prisma.challenge.upsert({
     *   create: {
     *     // ... data to create a Challenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Challenge we want to update
     *   }
     * })
    **/
    upsert<T extends ChallengeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>
    ): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeCountArgs} args - Arguments to filter Challenges to count.
     * @example
     * // Count the number of Challenges
     * const count = await prisma.challenge.count({
     *   where: {
     *     // ... the filter for the Challenges we want to count
     *   }
     * })
    **/
    count<T extends ChallengeCountArgs>(
      args?: Subset<T, ChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeAggregateArgs>(args: Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>

    /**
     * Group by Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Challenge model
   */
  readonly fields: ChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Challenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Challenge model
   */ 
  interface ChallengeFieldRefs {
    readonly challenge: FieldRef<"Challenge", 'String'>
    readonly createdAt: FieldRef<"Challenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Challenge findUnique
   */
  export type ChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findUniqueOrThrow
   */
  export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findFirst
   */
  export type ChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findFirstOrThrow
   */
  export type ChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findMany
   */
  export type ChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter, which Challenges to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge create
   */
  export type ChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * The data needed to create a Challenge.
     */
    data: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
  }

  /**
   * Challenge createMany
   */
  export type ChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge createManyAndReturn
   */
  export type ChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge update
   */
  export type ChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * The data needed to update a Challenge.
     */
    data: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
    /**
     * Choose, which Challenge to update.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge updateMany
   */
  export type ChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
  }

  /**
   * Challenge upsert
   */
  export type ChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * The filter to search for the Challenge to update in case it exists.
     */
    where: ChallengeWhereUniqueInput
    /**
     * In case the Challenge found by the `where` argument doesn't exist, create a new Challenge with this data.
     */
    create: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
    /**
     * In case the Challenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
  }

  /**
   * Challenge delete
   */
  export type ChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Filter which Challenge to delete.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge deleteMany
   */
  export type ChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenges to delete
     */
    where?: ChallengeWhereInput
  }

  /**
   * Challenge without action
   */
  export type ChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    transactionId: string | null
    id: string | null
    userId: string | null
    questId: string | null
    status: $Enums.EventStatus | null
    createdAt: Date | null
    error: string | null
  }

  export type EventMaxAggregateOutputType = {
    transactionId: string | null
    id: string | null
    userId: string | null
    questId: string | null
    status: $Enums.EventStatus | null
    createdAt: Date | null
    error: string | null
  }

  export type EventCountAggregateOutputType = {
    transactionId: number
    id: number
    userId: number
    questId: number
    status: number
    createdAt: number
    error: number
    data: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    transactionId?: true
    id?: true
    userId?: true
    questId?: true
    status?: true
    createdAt?: true
    error?: true
  }

  export type EventMaxAggregateInputType = {
    transactionId?: true
    id?: true
    userId?: true
    questId?: true
    status?: true
    createdAt?: true
    error?: true
  }

  export type EventCountAggregateInputType = {
    transactionId?: true
    id?: true
    userId?: true
    questId?: true
    status?: true
    createdAt?: true
    error?: true
    data?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    transactionId: string
    id: string
    userId: string
    questId: string | null
    status: $Enums.EventStatus
    createdAt: Date
    error: string | null
    data: JsonValue
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    id?: boolean
    userId?: boolean
    questId?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    referral?: boolean | Event$referralArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    id?: boolean
    userId?: boolean
    questId?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    transactionId?: boolean
    id?: boolean
    userId?: boolean
    questId?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    data?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    referral?: boolean | Event$referralArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      referral: Prisma.$ReferralPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      transactionId: string
      id: string
      userId: string
      questId: string | null
      status: $Enums.EventStatus
      createdAt: Date
      error: string | null
      data: Prisma.JsonValue
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `transactionId`
     * const eventWithTransactionIdOnly = await prisma.event.findMany({ select: { transactionId: true } })
     * 
    **/
    findMany<T extends EventFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
    **/
    create<T extends EventCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EventCreateArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends EventCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `transactionId`
     * const eventWithTransactionIdOnly = await prisma.event.createManyAndReturn({ 
     *   select: { transactionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends EventCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
    **/
    delete<T extends EventDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EventDeleteArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
    **/
    upsert<T extends EventUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpsertArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    referral<T extends Event$referralArgs<ExtArgs> = {}>(args?: Subset<T, Event$referralArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly transactionId: FieldRef<"Event", 'String'>
    readonly id: FieldRef<"Event", 'String'>
    readonly userId: FieldRef<"Event", 'String'>
    readonly questId: FieldRef<"Event", 'String'>
    readonly status: FieldRef<"Event", 'EventStatus'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly error: FieldRef<"Event", 'String'>
    readonly data: FieldRef<"Event", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }

  /**
   * Event.referral
   */
  export type Event$referralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null
    where?: ReferralWhereInput
    orderBy?: ReferralOrderByWithRelationInput | ReferralOrderByWithRelationInput[]
    cursor?: ReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    userId: string | null
    createdAt: Date | null
    seenAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    createdAt: Date | null
    seenAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    seenAt: number
    data: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
    data?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    userId: string
    createdAt: Date
    seenAt: Date | null
    data: JsonValue
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    seenAt?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    seenAt?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    seenAt?: boolean
    data?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      createdAt: Date
      seenAt: Date | null
      data: Prisma.JsonValue
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MessageFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MessageFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MessageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
    **/
    create<T extends MessageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends MessageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
    **/
    delete<T extends MessageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MessageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MessageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MessageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
    **/
    upsert<T extends MessageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>
    ): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly seenAt: FieldRef<"Message", 'DateTime'>
    readonly data: FieldRef<"Message", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model LoginAttempt
   */

  export type AggregateLoginAttempt = {
    _count: LoginAttemptCountAggregateOutputType | null
    _avg: LoginAttemptAvgAggregateOutputType | null
    _sum: LoginAttemptSumAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  export type LoginAttemptAvgAggregateOutputType = {
    id: number | null
  }

  export type LoginAttemptSumAggregateOutputType = {
    id: number | null
  }

  export type LoginAttemptMinAggregateOutputType = {
    id: number | null
    userId: string | null
    type: $Enums.LoginAttemptType | null
    createdAt: Date | null
  }

  export type LoginAttemptMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    type: $Enums.LoginAttemptType | null
    createdAt: Date | null
  }

  export type LoginAttemptCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    createdAt: number
    _all: number
  }


  export type LoginAttemptAvgAggregateInputType = {
    id?: true
  }

  export type LoginAttemptSumAggregateInputType = {
    id?: true
  }

  export type LoginAttemptMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
  }

  export type LoginAttemptMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
  }

  export type LoginAttemptCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type LoginAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginAttempt to aggregate.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoginAttempts
    **/
    _count?: true | LoginAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoginAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoginAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoginAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoginAttemptMaxAggregateInputType
  }

  export type GetLoginAttemptAggregateType<T extends LoginAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateLoginAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoginAttempt[P]>
      : GetScalarType<T[P], AggregateLoginAttempt[P]>
  }




  export type LoginAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginAttemptWhereInput
    orderBy?: LoginAttemptOrderByWithAggregationInput | LoginAttemptOrderByWithAggregationInput[]
    by: LoginAttemptScalarFieldEnum[] | LoginAttemptScalarFieldEnum
    having?: LoginAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoginAttemptCountAggregateInputType | true
    _avg?: LoginAttemptAvgAggregateInputType
    _sum?: LoginAttemptSumAggregateInputType
    _min?: LoginAttemptMinAggregateInputType
    _max?: LoginAttemptMaxAggregateInputType
  }

  export type LoginAttemptGroupByOutputType = {
    id: number
    userId: string
    type: $Enums.LoginAttemptType
    createdAt: Date
    _count: LoginAttemptCountAggregateOutputType | null
    _avg: LoginAttemptAvgAggregateOutputType | null
    _sum: LoginAttemptSumAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  type GetLoginAttemptGroupByPayload<T extends LoginAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoginAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoginAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
        }
      >
    >


  export type LoginAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loginAttempt"]>

  export type LoginAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loginAttempt"]>

  export type LoginAttemptSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type LoginAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LoginAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LoginAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoginAttempt"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      type: $Enums.LoginAttemptType
      createdAt: Date
    }, ExtArgs["result"]["loginAttempt"]>
    composites: {}
  }

  type LoginAttemptGetPayload<S extends boolean | null | undefined | LoginAttemptDefaultArgs> = $Result.GetResult<Prisma.$LoginAttemptPayload, S>

  type LoginAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LoginAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LoginAttemptCountAggregateInputType | true
    }

  export interface LoginAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoginAttempt'], meta: { name: 'LoginAttempt' } }
    /**
     * Find zero or one LoginAttempt that matches the filter.
     * @param {LoginAttemptFindUniqueArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LoginAttemptFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptFindUniqueArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one LoginAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LoginAttemptFindUniqueOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LoginAttemptFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first LoginAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LoginAttemptFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptFindFirstArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first LoginAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LoginAttemptFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more LoginAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany()
     * 
     * // Get first 10 LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LoginAttemptFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a LoginAttempt.
     * @param {LoginAttemptCreateArgs} args - Arguments to create a LoginAttempt.
     * @example
     * // Create one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.create({
     *   data: {
     *     // ... data to create a LoginAttempt
     *   }
     * })
     * 
    **/
    create<T extends LoginAttemptCreateArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptCreateArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many LoginAttempts.
     * @param {LoginAttemptCreateManyArgs} args - Arguments to create many LoginAttempts.
     * @example
     * // Create many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends LoginAttemptCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoginAttempts and returns the data saved in the database.
     * @param {LoginAttemptCreateManyAndReturnArgs} args - Arguments to create many LoginAttempts.
     * @example
     * // Create many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoginAttempts and only return the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends LoginAttemptCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a LoginAttempt.
     * @param {LoginAttemptDeleteArgs} args - Arguments to delete one LoginAttempt.
     * @example
     * // Delete one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.delete({
     *   where: {
     *     // ... filter to delete one LoginAttempt
     *   }
     * })
     * 
    **/
    delete<T extends LoginAttemptDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptDeleteArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one LoginAttempt.
     * @param {LoginAttemptUpdateArgs} args - Arguments to update one LoginAttempt.
     * @example
     * // Update one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LoginAttemptUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptUpdateArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more LoginAttempts.
     * @param {LoginAttemptDeleteManyArgs} args - Arguments to filter LoginAttempts to delete.
     * @example
     * // Delete a few LoginAttempts
     * const { count } = await prisma.loginAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LoginAttemptDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LoginAttemptDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LoginAttemptUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LoginAttempt.
     * @param {LoginAttemptUpsertArgs} args - Arguments to update or create a LoginAttempt.
     * @example
     * // Update or create a LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.upsert({
     *   create: {
     *     // ... data to create a LoginAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoginAttempt we want to update
     *   }
     * })
    **/
    upsert<T extends LoginAttemptUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, LoginAttemptUpsertArgs<ExtArgs>>
    ): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptCountArgs} args - Arguments to filter LoginAttempts to count.
     * @example
     * // Count the number of LoginAttempts
     * const count = await prisma.loginAttempt.count({
     *   where: {
     *     // ... the filter for the LoginAttempts we want to count
     *   }
     * })
    **/
    count<T extends LoginAttemptCountArgs>(
      args?: Subset<T, LoginAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoginAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoginAttemptAggregateArgs>(args: Subset<T, LoginAttemptAggregateArgs>): Prisma.PrismaPromise<GetLoginAttemptAggregateType<T>>

    /**
     * Group by LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoginAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoginAttemptGroupByArgs['orderBy'] }
        : { orderBy?: LoginAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoginAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoginAttempt model
   */
  readonly fields: LoginAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoginAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoginAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the LoginAttempt model
   */ 
  interface LoginAttemptFieldRefs {
    readonly id: FieldRef<"LoginAttempt", 'Int'>
    readonly userId: FieldRef<"LoginAttempt", 'String'>
    readonly type: FieldRef<"LoginAttempt", 'LoginAttemptType'>
    readonly createdAt: FieldRef<"LoginAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoginAttempt findUnique
   */
  export type LoginAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt findUniqueOrThrow
   */
  export type LoginAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt findFirst
   */
  export type LoginAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginAttempts.
     */
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt findFirstOrThrow
   */
  export type LoginAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginAttempts.
     */
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt findMany
   */
  export type LoginAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LoginAttempts to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt create
   */
  export type LoginAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a LoginAttempt.
     */
    data: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
  }

  /**
   * LoginAttempt createMany
   */
  export type LoginAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoginAttempts.
     */
    data: LoginAttemptCreateManyInput | LoginAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginAttempt createManyAndReturn
   */
  export type LoginAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LoginAttempts.
     */
    data: LoginAttemptCreateManyInput | LoginAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoginAttempt update
   */
  export type LoginAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a LoginAttempt.
     */
    data: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
    /**
     * Choose, which LoginAttempt to update.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt updateMany
   */
  export type LoginAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoginAttempts.
     */
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LoginAttempts to update
     */
    where?: LoginAttemptWhereInput
  }

  /**
   * LoginAttempt upsert
   */
  export type LoginAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the LoginAttempt to update in case it exists.
     */
    where: LoginAttemptWhereUniqueInput
    /**
     * In case the LoginAttempt found by the `where` argument doesn't exist, create a new LoginAttempt with this data.
     */
    create: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
    /**
     * In case the LoginAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
  }

  /**
   * LoginAttempt delete
   */
  export type LoginAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
    /**
     * Filter which LoginAttempt to delete.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt deleteMany
   */
  export type LoginAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginAttempts to delete
     */
    where?: LoginAttemptWhereInput
  }

  /**
   * LoginAttempt without action
   */
  export type LoginAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginAttemptInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    notificationId: string | null
    userId: string | null
    seenAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    notificationId: string | null
    userId: string | null
    seenAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    notificationId: number
    userId: number
    seenAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    notificationId?: true
    userId?: true
    seenAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    notificationId?: true
    userId?: true
    seenAt?: true
  }

  export type NotificationCountAggregateInputType = {
    notificationId?: true
    userId?: true
    seenAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    notificationId: string
    userId: string
    seenAt: Date | null
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notificationId?: boolean
    userId?: boolean
    seenAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notificationId?: boolean
    userId?: boolean
    seenAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    notificationId?: boolean
    userId?: boolean
    seenAt?: boolean
  }


  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      notificationId: string
      userId: string
      seenAt: Date | null
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NotificationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NotificationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `notificationId`
     * const notificationWithNotificationIdOnly = await prisma.notification.findMany({ select: { notificationId: true } })
     * 
    **/
    findMany<T extends NotificationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
    **/
    create<T extends NotificationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `notificationId`
     * const notificationWithNotificationIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { notificationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
    **/
    delete<T extends NotificationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NotificationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NotificationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NotificationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
    **/
    upsert<T extends NotificationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly notificationId: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly seenAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
  }


  /**
   * Model CompletedQuestRequirement
   */

  export type AggregateCompletedQuestRequirement = {
    _count: CompletedQuestRequirementCountAggregateOutputType | null
    _min: CompletedQuestRequirementMinAggregateOutputType | null
    _max: CompletedQuestRequirementMaxAggregateOutputType | null
  }

  export type CompletedQuestRequirementMinAggregateOutputType = {
    questId: string | null
    userId: string | null
    requirementId: string | null
    createdAt: Date | null
  }

  export type CompletedQuestRequirementMaxAggregateOutputType = {
    questId: string | null
    userId: string | null
    requirementId: string | null
    createdAt: Date | null
  }

  export type CompletedQuestRequirementCountAggregateOutputType = {
    questId: number
    userId: number
    requirementId: number
    createdAt: number
    _all: number
  }


  export type CompletedQuestRequirementMinAggregateInputType = {
    questId?: true
    userId?: true
    requirementId?: true
    createdAt?: true
  }

  export type CompletedQuestRequirementMaxAggregateInputType = {
    questId?: true
    userId?: true
    requirementId?: true
    createdAt?: true
  }

  export type CompletedQuestRequirementCountAggregateInputType = {
    questId?: true
    userId?: true
    requirementId?: true
    createdAt?: true
    _all?: true
  }

  export type CompletedQuestRequirementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletedQuestRequirement to aggregate.
     */
    where?: CompletedQuestRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedQuestRequirements to fetch.
     */
    orderBy?: CompletedQuestRequirementOrderByWithRelationInput | CompletedQuestRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompletedQuestRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedQuestRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedQuestRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompletedQuestRequirements
    **/
    _count?: true | CompletedQuestRequirementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompletedQuestRequirementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompletedQuestRequirementMaxAggregateInputType
  }

  export type GetCompletedQuestRequirementAggregateType<T extends CompletedQuestRequirementAggregateArgs> = {
        [P in keyof T & keyof AggregateCompletedQuestRequirement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompletedQuestRequirement[P]>
      : GetScalarType<T[P], AggregateCompletedQuestRequirement[P]>
  }




  export type CompletedQuestRequirementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompletedQuestRequirementWhereInput
    orderBy?: CompletedQuestRequirementOrderByWithAggregationInput | CompletedQuestRequirementOrderByWithAggregationInput[]
    by: CompletedQuestRequirementScalarFieldEnum[] | CompletedQuestRequirementScalarFieldEnum
    having?: CompletedQuestRequirementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompletedQuestRequirementCountAggregateInputType | true
    _min?: CompletedQuestRequirementMinAggregateInputType
    _max?: CompletedQuestRequirementMaxAggregateInputType
  }

  export type CompletedQuestRequirementGroupByOutputType = {
    questId: string
    userId: string
    requirementId: string
    createdAt: Date
    _count: CompletedQuestRequirementCountAggregateOutputType | null
    _min: CompletedQuestRequirementMinAggregateOutputType | null
    _max: CompletedQuestRequirementMaxAggregateOutputType | null
  }

  type GetCompletedQuestRequirementGroupByPayload<T extends CompletedQuestRequirementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompletedQuestRequirementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompletedQuestRequirementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompletedQuestRequirementGroupByOutputType[P]>
            : GetScalarType<T[P], CompletedQuestRequirementGroupByOutputType[P]>
        }
      >
    >


  export type CompletedQuestRequirementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questId?: boolean
    userId?: boolean
    requirementId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["completedQuestRequirement"]>

  export type CompletedQuestRequirementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questId?: boolean
    userId?: boolean
    requirementId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["completedQuestRequirement"]>

  export type CompletedQuestRequirementSelectScalar = {
    questId?: boolean
    userId?: boolean
    requirementId?: boolean
    createdAt?: boolean
  }

  export type CompletedQuestRequirementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CompletedQuestRequirementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CompletedQuestRequirementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompletedQuestRequirement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      questId: string
      userId: string
      requirementId: string
      createdAt: Date
    }, ExtArgs["result"]["completedQuestRequirement"]>
    composites: {}
  }

  type CompletedQuestRequirementGetPayload<S extends boolean | null | undefined | CompletedQuestRequirementDefaultArgs> = $Result.GetResult<Prisma.$CompletedQuestRequirementPayload, S>

  type CompletedQuestRequirementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompletedQuestRequirementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompletedQuestRequirementCountAggregateInputType | true
    }

  export interface CompletedQuestRequirementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompletedQuestRequirement'], meta: { name: 'CompletedQuestRequirement' } }
    /**
     * Find zero or one CompletedQuestRequirement that matches the filter.
     * @param {CompletedQuestRequirementFindUniqueArgs} args - Arguments to find a CompletedQuestRequirement
     * @example
     * // Get one CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CompletedQuestRequirementFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementFindUniqueArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one CompletedQuestRequirement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompletedQuestRequirementFindUniqueOrThrowArgs} args - Arguments to find a CompletedQuestRequirement
     * @example
     * // Get one CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CompletedQuestRequirementFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first CompletedQuestRequirement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementFindFirstArgs} args - Arguments to find a CompletedQuestRequirement
     * @example
     * // Get one CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CompletedQuestRequirementFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementFindFirstArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first CompletedQuestRequirement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementFindFirstOrThrowArgs} args - Arguments to find a CompletedQuestRequirement
     * @example
     * // Get one CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CompletedQuestRequirementFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more CompletedQuestRequirements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompletedQuestRequirements
     * const completedQuestRequirements = await prisma.completedQuestRequirement.findMany()
     * 
     * // Get first 10 CompletedQuestRequirements
     * const completedQuestRequirements = await prisma.completedQuestRequirement.findMany({ take: 10 })
     * 
     * // Only select the `questId`
     * const completedQuestRequirementWithQuestIdOnly = await prisma.completedQuestRequirement.findMany({ select: { questId: true } })
     * 
    **/
    findMany<T extends CompletedQuestRequirementFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a CompletedQuestRequirement.
     * @param {CompletedQuestRequirementCreateArgs} args - Arguments to create a CompletedQuestRequirement.
     * @example
     * // Create one CompletedQuestRequirement
     * const CompletedQuestRequirement = await prisma.completedQuestRequirement.create({
     *   data: {
     *     // ... data to create a CompletedQuestRequirement
     *   }
     * })
     * 
    **/
    create<T extends CompletedQuestRequirementCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementCreateArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many CompletedQuestRequirements.
     * @param {CompletedQuestRequirementCreateManyArgs} args - Arguments to create many CompletedQuestRequirements.
     * @example
     * // Create many CompletedQuestRequirements
     * const completedQuestRequirement = await prisma.completedQuestRequirement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends CompletedQuestRequirementCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompletedQuestRequirements and returns the data saved in the database.
     * @param {CompletedQuestRequirementCreateManyAndReturnArgs} args - Arguments to create many CompletedQuestRequirements.
     * @example
     * // Create many CompletedQuestRequirements
     * const completedQuestRequirement = await prisma.completedQuestRequirement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompletedQuestRequirements and only return the `questId`
     * const completedQuestRequirementWithQuestIdOnly = await prisma.completedQuestRequirement.createManyAndReturn({ 
     *   select: { questId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends CompletedQuestRequirementCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a CompletedQuestRequirement.
     * @param {CompletedQuestRequirementDeleteArgs} args - Arguments to delete one CompletedQuestRequirement.
     * @example
     * // Delete one CompletedQuestRequirement
     * const CompletedQuestRequirement = await prisma.completedQuestRequirement.delete({
     *   where: {
     *     // ... filter to delete one CompletedQuestRequirement
     *   }
     * })
     * 
    **/
    delete<T extends CompletedQuestRequirementDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementDeleteArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one CompletedQuestRequirement.
     * @param {CompletedQuestRequirementUpdateArgs} args - Arguments to update one CompletedQuestRequirement.
     * @example
     * // Update one CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CompletedQuestRequirementUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementUpdateArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more CompletedQuestRequirements.
     * @param {CompletedQuestRequirementDeleteManyArgs} args - Arguments to filter CompletedQuestRequirements to delete.
     * @example
     * // Delete a few CompletedQuestRequirements
     * const { count } = await prisma.completedQuestRequirement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CompletedQuestRequirementDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompletedQuestRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompletedQuestRequirements
     * const completedQuestRequirement = await prisma.completedQuestRequirement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CompletedQuestRequirementUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompletedQuestRequirement.
     * @param {CompletedQuestRequirementUpsertArgs} args - Arguments to update or create a CompletedQuestRequirement.
     * @example
     * // Update or create a CompletedQuestRequirement
     * const completedQuestRequirement = await prisma.completedQuestRequirement.upsert({
     *   create: {
     *     // ... data to create a CompletedQuestRequirement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompletedQuestRequirement we want to update
     *   }
     * })
    **/
    upsert<T extends CompletedQuestRequirementUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CompletedQuestRequirementUpsertArgs<ExtArgs>>
    ): Prisma__CompletedQuestRequirementClient<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of CompletedQuestRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementCountArgs} args - Arguments to filter CompletedQuestRequirements to count.
     * @example
     * // Count the number of CompletedQuestRequirements
     * const count = await prisma.completedQuestRequirement.count({
     *   where: {
     *     // ... the filter for the CompletedQuestRequirements we want to count
     *   }
     * })
    **/
    count<T extends CompletedQuestRequirementCountArgs>(
      args?: Subset<T, CompletedQuestRequirementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompletedQuestRequirementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompletedQuestRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompletedQuestRequirementAggregateArgs>(args: Subset<T, CompletedQuestRequirementAggregateArgs>): Prisma.PrismaPromise<GetCompletedQuestRequirementAggregateType<T>>

    /**
     * Group by CompletedQuestRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletedQuestRequirementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompletedQuestRequirementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompletedQuestRequirementGroupByArgs['orderBy'] }
        : { orderBy?: CompletedQuestRequirementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompletedQuestRequirementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompletedQuestRequirementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompletedQuestRequirement model
   */
  readonly fields: CompletedQuestRequirementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompletedQuestRequirement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompletedQuestRequirementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the CompletedQuestRequirement model
   */ 
  interface CompletedQuestRequirementFieldRefs {
    readonly questId: FieldRef<"CompletedQuestRequirement", 'String'>
    readonly userId: FieldRef<"CompletedQuestRequirement", 'String'>
    readonly requirementId: FieldRef<"CompletedQuestRequirement", 'String'>
    readonly createdAt: FieldRef<"CompletedQuestRequirement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompletedQuestRequirement findUnique
   */
  export type CompletedQuestRequirementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CompletedQuestRequirement to fetch.
     */
    where: CompletedQuestRequirementWhereUniqueInput
  }

  /**
   * CompletedQuestRequirement findUniqueOrThrow
   */
  export type CompletedQuestRequirementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CompletedQuestRequirement to fetch.
     */
    where: CompletedQuestRequirementWhereUniqueInput
  }

  /**
   * CompletedQuestRequirement findFirst
   */
  export type CompletedQuestRequirementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CompletedQuestRequirement to fetch.
     */
    where?: CompletedQuestRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedQuestRequirements to fetch.
     */
    orderBy?: CompletedQuestRequirementOrderByWithRelationInput | CompletedQuestRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletedQuestRequirements.
     */
    cursor?: CompletedQuestRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedQuestRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedQuestRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletedQuestRequirements.
     */
    distinct?: CompletedQuestRequirementScalarFieldEnum | CompletedQuestRequirementScalarFieldEnum[]
  }

  /**
   * CompletedQuestRequirement findFirstOrThrow
   */
  export type CompletedQuestRequirementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CompletedQuestRequirement to fetch.
     */
    where?: CompletedQuestRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedQuestRequirements to fetch.
     */
    orderBy?: CompletedQuestRequirementOrderByWithRelationInput | CompletedQuestRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletedQuestRequirements.
     */
    cursor?: CompletedQuestRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedQuestRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedQuestRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletedQuestRequirements.
     */
    distinct?: CompletedQuestRequirementScalarFieldEnum | CompletedQuestRequirementScalarFieldEnum[]
  }

  /**
   * CompletedQuestRequirement findMany
   */
  export type CompletedQuestRequirementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CompletedQuestRequirements to fetch.
     */
    where?: CompletedQuestRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletedQuestRequirements to fetch.
     */
    orderBy?: CompletedQuestRequirementOrderByWithRelationInput | CompletedQuestRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompletedQuestRequirements.
     */
    cursor?: CompletedQuestRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletedQuestRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletedQuestRequirements.
     */
    skip?: number
    distinct?: CompletedQuestRequirementScalarFieldEnum | CompletedQuestRequirementScalarFieldEnum[]
  }

  /**
   * CompletedQuestRequirement create
   */
  export type CompletedQuestRequirementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * The data needed to create a CompletedQuestRequirement.
     */
    data: XOR<CompletedQuestRequirementCreateInput, CompletedQuestRequirementUncheckedCreateInput>
  }

  /**
   * CompletedQuestRequirement createMany
   */
  export type CompletedQuestRequirementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompletedQuestRequirements.
     */
    data: CompletedQuestRequirementCreateManyInput | CompletedQuestRequirementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompletedQuestRequirement createManyAndReturn
   */
  export type CompletedQuestRequirementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompletedQuestRequirements.
     */
    data: CompletedQuestRequirementCreateManyInput | CompletedQuestRequirementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompletedQuestRequirement update
   */
  export type CompletedQuestRequirementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * The data needed to update a CompletedQuestRequirement.
     */
    data: XOR<CompletedQuestRequirementUpdateInput, CompletedQuestRequirementUncheckedUpdateInput>
    /**
     * Choose, which CompletedQuestRequirement to update.
     */
    where: CompletedQuestRequirementWhereUniqueInput
  }

  /**
   * CompletedQuestRequirement updateMany
   */
  export type CompletedQuestRequirementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompletedQuestRequirements.
     */
    data: XOR<CompletedQuestRequirementUpdateManyMutationInput, CompletedQuestRequirementUncheckedUpdateManyInput>
    /**
     * Filter which CompletedQuestRequirements to update
     */
    where?: CompletedQuestRequirementWhereInput
  }

  /**
   * CompletedQuestRequirement upsert
   */
  export type CompletedQuestRequirementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * The filter to search for the CompletedQuestRequirement to update in case it exists.
     */
    where: CompletedQuestRequirementWhereUniqueInput
    /**
     * In case the CompletedQuestRequirement found by the `where` argument doesn't exist, create a new CompletedQuestRequirement with this data.
     */
    create: XOR<CompletedQuestRequirementCreateInput, CompletedQuestRequirementUncheckedCreateInput>
    /**
     * In case the CompletedQuestRequirement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompletedQuestRequirementUpdateInput, CompletedQuestRequirementUncheckedUpdateInput>
  }

  /**
   * CompletedQuestRequirement delete
   */
  export type CompletedQuestRequirementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
    /**
     * Filter which CompletedQuestRequirement to delete.
     */
    where: CompletedQuestRequirementWhereUniqueInput
  }

  /**
   * CompletedQuestRequirement deleteMany
   */
  export type CompletedQuestRequirementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletedQuestRequirements to delete
     */
    where?: CompletedQuestRequirementWhereInput
  }

  /**
   * CompletedQuestRequirement without action
   */
  export type CompletedQuestRequirementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletedQuestRequirementInclude<ExtArgs> | null
  }


  /**
   * Model QuestProgress
   */

  export type AggregateQuestProgress = {
    _count: QuestProgressCountAggregateOutputType | null
    _min: QuestProgressMinAggregateOutputType | null
    _max: QuestProgressMaxAggregateOutputType | null
  }

  export type QuestProgressMinAggregateOutputType = {
    questId: string | null
    userId: string | null
    status: $Enums.QuestStatus | null
  }

  export type QuestProgressMaxAggregateOutputType = {
    questId: string | null
    userId: string | null
    status: $Enums.QuestStatus | null
  }

  export type QuestProgressCountAggregateOutputType = {
    questId: number
    userId: number
    status: number
    _all: number
  }


  export type QuestProgressMinAggregateInputType = {
    questId?: true
    userId?: true
    status?: true
  }

  export type QuestProgressMaxAggregateInputType = {
    questId?: true
    userId?: true
    status?: true
  }

  export type QuestProgressCountAggregateInputType = {
    questId?: true
    userId?: true
    status?: true
    _all?: true
  }

  export type QuestProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestProgress to aggregate.
     */
    where?: QuestProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestProgresses to fetch.
     */
    orderBy?: QuestProgressOrderByWithRelationInput | QuestProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestProgresses
    **/
    _count?: true | QuestProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestProgressMaxAggregateInputType
  }

  export type GetQuestProgressAggregateType<T extends QuestProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestProgress[P]>
      : GetScalarType<T[P], AggregateQuestProgress[P]>
  }




  export type QuestProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestProgressWhereInput
    orderBy?: QuestProgressOrderByWithAggregationInput | QuestProgressOrderByWithAggregationInput[]
    by: QuestProgressScalarFieldEnum[] | QuestProgressScalarFieldEnum
    having?: QuestProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestProgressCountAggregateInputType | true
    _min?: QuestProgressMinAggregateInputType
    _max?: QuestProgressMaxAggregateInputType
  }

  export type QuestProgressGroupByOutputType = {
    questId: string
    userId: string
    status: $Enums.QuestStatus
    _count: QuestProgressCountAggregateOutputType | null
    _min: QuestProgressMinAggregateOutputType | null
    _max: QuestProgressMaxAggregateOutputType | null
  }

  type GetQuestProgressGroupByPayload<T extends QuestProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestProgressGroupByOutputType[P]>
            : GetScalarType<T[P], QuestProgressGroupByOutputType[P]>
        }
      >
    >


  export type QuestProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questId?: boolean
    userId?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questProgress"]>

  export type QuestProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    questId?: boolean
    userId?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questProgress"]>

  export type QuestProgressSelectScalar = {
    questId?: boolean
    userId?: boolean
    status?: boolean
  }

  export type QuestProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuestProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuestProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      questId: string
      userId: string
      status: $Enums.QuestStatus
    }, ExtArgs["result"]["questProgress"]>
    composites: {}
  }

  type QuestProgressGetPayload<S extends boolean | null | undefined | QuestProgressDefaultArgs> = $Result.GetResult<Prisma.$QuestProgressPayload, S>

  type QuestProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestProgressCountAggregateInputType | true
    }

  export interface QuestProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestProgress'], meta: { name: 'QuestProgress' } }
    /**
     * Find zero or one QuestProgress that matches the filter.
     * @param {QuestProgressFindUniqueArgs} args - Arguments to find a QuestProgress
     * @example
     * // Get one QuestProgress
     * const questProgress = await prisma.questProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends QuestProgressFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressFindUniqueArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one QuestProgress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestProgressFindUniqueOrThrowArgs} args - Arguments to find a QuestProgress
     * @example
     * // Get one QuestProgress
     * const questProgress = await prisma.questProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends QuestProgressFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first QuestProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressFindFirstArgs} args - Arguments to find a QuestProgress
     * @example
     * // Get one QuestProgress
     * const questProgress = await prisma.questProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends QuestProgressFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressFindFirstArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first QuestProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressFindFirstOrThrowArgs} args - Arguments to find a QuestProgress
     * @example
     * // Get one QuestProgress
     * const questProgress = await prisma.questProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends QuestProgressFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more QuestProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestProgresses
     * const questProgresses = await prisma.questProgress.findMany()
     * 
     * // Get first 10 QuestProgresses
     * const questProgresses = await prisma.questProgress.findMany({ take: 10 })
     * 
     * // Only select the `questId`
     * const questProgressWithQuestIdOnly = await prisma.questProgress.findMany({ select: { questId: true } })
     * 
    **/
    findMany<T extends QuestProgressFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a QuestProgress.
     * @param {QuestProgressCreateArgs} args - Arguments to create a QuestProgress.
     * @example
     * // Create one QuestProgress
     * const QuestProgress = await prisma.questProgress.create({
     *   data: {
     *     // ... data to create a QuestProgress
     *   }
     * })
     * 
    **/
    create<T extends QuestProgressCreateArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressCreateArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many QuestProgresses.
     * @param {QuestProgressCreateManyArgs} args - Arguments to create many QuestProgresses.
     * @example
     * // Create many QuestProgresses
     * const questProgress = await prisma.questProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends QuestProgressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestProgresses and returns the data saved in the database.
     * @param {QuestProgressCreateManyAndReturnArgs} args - Arguments to create many QuestProgresses.
     * @example
     * // Create many QuestProgresses
     * const questProgress = await prisma.questProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestProgresses and only return the `questId`
     * const questProgressWithQuestIdOnly = await prisma.questProgress.createManyAndReturn({ 
     *   select: { questId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends QuestProgressCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a QuestProgress.
     * @param {QuestProgressDeleteArgs} args - Arguments to delete one QuestProgress.
     * @example
     * // Delete one QuestProgress
     * const QuestProgress = await prisma.questProgress.delete({
     *   where: {
     *     // ... filter to delete one QuestProgress
     *   }
     * })
     * 
    **/
    delete<T extends QuestProgressDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressDeleteArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one QuestProgress.
     * @param {QuestProgressUpdateArgs} args - Arguments to update one QuestProgress.
     * @example
     * // Update one QuestProgress
     * const questProgress = await prisma.questProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends QuestProgressUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressUpdateArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more QuestProgresses.
     * @param {QuestProgressDeleteManyArgs} args - Arguments to filter QuestProgresses to delete.
     * @example
     * // Delete a few QuestProgresses
     * const { count } = await prisma.questProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends QuestProgressDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestProgresses
     * const questProgress = await prisma.questProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends QuestProgressUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QuestProgress.
     * @param {QuestProgressUpsertArgs} args - Arguments to update or create a QuestProgress.
     * @example
     * // Update or create a QuestProgress
     * const questProgress = await prisma.questProgress.upsert({
     *   create: {
     *     // ... data to create a QuestProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestProgress we want to update
     *   }
     * })
    **/
    upsert<T extends QuestProgressUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, QuestProgressUpsertArgs<ExtArgs>>
    ): Prisma__QuestProgressClient<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of QuestProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressCountArgs} args - Arguments to filter QuestProgresses to count.
     * @example
     * // Count the number of QuestProgresses
     * const count = await prisma.questProgress.count({
     *   where: {
     *     // ... the filter for the QuestProgresses we want to count
     *   }
     * })
    **/
    count<T extends QuestProgressCountArgs>(
      args?: Subset<T, QuestProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestProgressAggregateArgs>(args: Subset<T, QuestProgressAggregateArgs>): Prisma.PrismaPromise<GetQuestProgressAggregateType<T>>

    /**
     * Group by QuestProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestProgressGroupByArgs['orderBy'] }
        : { orderBy?: QuestProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestProgress model
   */
  readonly fields: QuestProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the QuestProgress model
   */ 
  interface QuestProgressFieldRefs {
    readonly questId: FieldRef<"QuestProgress", 'String'>
    readonly userId: FieldRef<"QuestProgress", 'String'>
    readonly status: FieldRef<"QuestProgress", 'QuestStatus'>
  }
    

  // Custom InputTypes
  /**
   * QuestProgress findUnique
   */
  export type QuestProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter, which QuestProgress to fetch.
     */
    where: QuestProgressWhereUniqueInput
  }

  /**
   * QuestProgress findUniqueOrThrow
   */
  export type QuestProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter, which QuestProgress to fetch.
     */
    where: QuestProgressWhereUniqueInput
  }

  /**
   * QuestProgress findFirst
   */
  export type QuestProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter, which QuestProgress to fetch.
     */
    where?: QuestProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestProgresses to fetch.
     */
    orderBy?: QuestProgressOrderByWithRelationInput | QuestProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestProgresses.
     */
    cursor?: QuestProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestProgresses.
     */
    distinct?: QuestProgressScalarFieldEnum | QuestProgressScalarFieldEnum[]
  }

  /**
   * QuestProgress findFirstOrThrow
   */
  export type QuestProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter, which QuestProgress to fetch.
     */
    where?: QuestProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestProgresses to fetch.
     */
    orderBy?: QuestProgressOrderByWithRelationInput | QuestProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestProgresses.
     */
    cursor?: QuestProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestProgresses.
     */
    distinct?: QuestProgressScalarFieldEnum | QuestProgressScalarFieldEnum[]
  }

  /**
   * QuestProgress findMany
   */
  export type QuestProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter, which QuestProgresses to fetch.
     */
    where?: QuestProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestProgresses to fetch.
     */
    orderBy?: QuestProgressOrderByWithRelationInput | QuestProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestProgresses.
     */
    cursor?: QuestProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestProgresses.
     */
    skip?: number
    distinct?: QuestProgressScalarFieldEnum | QuestProgressScalarFieldEnum[]
  }

  /**
   * QuestProgress create
   */
  export type QuestProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestProgress.
     */
    data: XOR<QuestProgressCreateInput, QuestProgressUncheckedCreateInput>
  }

  /**
   * QuestProgress createMany
   */
  export type QuestProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestProgresses.
     */
    data: QuestProgressCreateManyInput | QuestProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestProgress createManyAndReturn
   */
  export type QuestProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QuestProgresses.
     */
    data: QuestProgressCreateManyInput | QuestProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestProgress update
   */
  export type QuestProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestProgress.
     */
    data: XOR<QuestProgressUpdateInput, QuestProgressUncheckedUpdateInput>
    /**
     * Choose, which QuestProgress to update.
     */
    where: QuestProgressWhereUniqueInput
  }

  /**
   * QuestProgress updateMany
   */
  export type QuestProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestProgresses.
     */
    data: XOR<QuestProgressUpdateManyMutationInput, QuestProgressUncheckedUpdateManyInput>
    /**
     * Filter which QuestProgresses to update
     */
    where?: QuestProgressWhereInput
  }

  /**
   * QuestProgress upsert
   */
  export type QuestProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestProgress to update in case it exists.
     */
    where: QuestProgressWhereUniqueInput
    /**
     * In case the QuestProgress found by the `where` argument doesn't exist, create a new QuestProgress with this data.
     */
    create: XOR<QuestProgressCreateInput, QuestProgressUncheckedCreateInput>
    /**
     * In case the QuestProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestProgressUpdateInput, QuestProgressUncheckedUpdateInput>
  }

  /**
   * QuestProgress delete
   */
  export type QuestProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
    /**
     * Filter which QuestProgress to delete.
     */
    where: QuestProgressWhereUniqueInput
  }

  /**
   * QuestProgress deleteMany
   */
  export type QuestProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestProgresses to delete
     */
    where?: QuestProgressWhereInput
  }

  /**
   * QuestProgress without action
   */
  export type QuestProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestProgressInclude<ExtArgs> | null
  }


  /**
   * Model SavedProgress
   */

  export type AggregateSavedProgress = {
    _count: SavedProgressCountAggregateOutputType | null
    _avg: SavedProgressAvgAggregateOutputType | null
    _sum: SavedProgressSumAggregateOutputType | null
    _min: SavedProgressMinAggregateOutputType | null
    _max: SavedProgressMaxAggregateOutputType | null
  }

  export type SavedProgressAvgAggregateOutputType = {
    progress: number | null
  }

  export type SavedProgressSumAggregateOutputType = {
    progress: number | null
  }

  export type SavedProgressMinAggregateOutputType = {
    userId: string | null
    questId: string | null
    progress: number | null
  }

  export type SavedProgressMaxAggregateOutputType = {
    userId: string | null
    questId: string | null
    progress: number | null
  }

  export type SavedProgressCountAggregateOutputType = {
    userId: number
    questId: number
    progress: number
    _all: number
  }


  export type SavedProgressAvgAggregateInputType = {
    progress?: true
  }

  export type SavedProgressSumAggregateInputType = {
    progress?: true
  }

  export type SavedProgressMinAggregateInputType = {
    userId?: true
    questId?: true
    progress?: true
  }

  export type SavedProgressMaxAggregateInputType = {
    userId?: true
    questId?: true
    progress?: true
  }

  export type SavedProgressCountAggregateInputType = {
    userId?: true
    questId?: true
    progress?: true
    _all?: true
  }

  export type SavedProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProgress to aggregate.
     */
    where?: SavedProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProgresses to fetch.
     */
    orderBy?: SavedProgressOrderByWithRelationInput | SavedProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedProgresses
    **/
    _count?: true | SavedProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedProgressMaxAggregateInputType
  }

  export type GetSavedProgressAggregateType<T extends SavedProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedProgress[P]>
      : GetScalarType<T[P], AggregateSavedProgress[P]>
  }




  export type SavedProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedProgressWhereInput
    orderBy?: SavedProgressOrderByWithAggregationInput | SavedProgressOrderByWithAggregationInput[]
    by: SavedProgressScalarFieldEnum[] | SavedProgressScalarFieldEnum
    having?: SavedProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedProgressCountAggregateInputType | true
    _avg?: SavedProgressAvgAggregateInputType
    _sum?: SavedProgressSumAggregateInputType
    _min?: SavedProgressMinAggregateInputType
    _max?: SavedProgressMaxAggregateInputType
  }

  export type SavedProgressGroupByOutputType = {
    userId: string
    questId: string
    progress: number
    _count: SavedProgressCountAggregateOutputType | null
    _avg: SavedProgressAvgAggregateOutputType | null
    _sum: SavedProgressSumAggregateOutputType | null
    _min: SavedProgressMinAggregateOutputType | null
    _max: SavedProgressMaxAggregateOutputType | null
  }

  type GetSavedProgressGroupByPayload<T extends SavedProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedProgressGroupByOutputType[P]>
            : GetScalarType<T[P], SavedProgressGroupByOutputType[P]>
        }
      >
    >


  export type SavedProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    questId?: boolean
    progress?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProgress"]>

  export type SavedProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    questId?: boolean
    progress?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProgress"]>

  export type SavedProgressSelectScalar = {
    userId?: boolean
    questId?: boolean
    progress?: boolean
  }

  export type SavedProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      questId: string
      progress: number
    }, ExtArgs["result"]["savedProgress"]>
    composites: {}
  }

  type SavedProgressGetPayload<S extends boolean | null | undefined | SavedProgressDefaultArgs> = $Result.GetResult<Prisma.$SavedProgressPayload, S>

  type SavedProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SavedProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SavedProgressCountAggregateInputType | true
    }

  export interface SavedProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedProgress'], meta: { name: 'SavedProgress' } }
    /**
     * Find zero or one SavedProgress that matches the filter.
     * @param {SavedProgressFindUniqueArgs} args - Arguments to find a SavedProgress
     * @example
     * // Get one SavedProgress
     * const savedProgress = await prisma.savedProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SavedProgressFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressFindUniqueArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SavedProgress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SavedProgressFindUniqueOrThrowArgs} args - Arguments to find a SavedProgress
     * @example
     * // Get one SavedProgress
     * const savedProgress = await prisma.savedProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SavedProgressFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SavedProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressFindFirstArgs} args - Arguments to find a SavedProgress
     * @example
     * // Get one SavedProgress
     * const savedProgress = await prisma.savedProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SavedProgressFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressFindFirstArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SavedProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressFindFirstOrThrowArgs} args - Arguments to find a SavedProgress
     * @example
     * // Get one SavedProgress
     * const savedProgress = await prisma.savedProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SavedProgressFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SavedProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedProgresses
     * const savedProgresses = await prisma.savedProgress.findMany()
     * 
     * // Get first 10 SavedProgresses
     * const savedProgresses = await prisma.savedProgress.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const savedProgressWithUserIdOnly = await prisma.savedProgress.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends SavedProgressFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SavedProgress.
     * @param {SavedProgressCreateArgs} args - Arguments to create a SavedProgress.
     * @example
     * // Create one SavedProgress
     * const SavedProgress = await prisma.savedProgress.create({
     *   data: {
     *     // ... data to create a SavedProgress
     *   }
     * })
     * 
    **/
    create<T extends SavedProgressCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressCreateArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SavedProgresses.
     * @param {SavedProgressCreateManyArgs} args - Arguments to create many SavedProgresses.
     * @example
     * // Create many SavedProgresses
     * const savedProgress = await prisma.savedProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends SavedProgressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedProgresses and returns the data saved in the database.
     * @param {SavedProgressCreateManyAndReturnArgs} args - Arguments to create many SavedProgresses.
     * @example
     * // Create many SavedProgresses
     * const savedProgress = await prisma.savedProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedProgresses and only return the `userId`
     * const savedProgressWithUserIdOnly = await prisma.savedProgress.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends SavedProgressCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a SavedProgress.
     * @param {SavedProgressDeleteArgs} args - Arguments to delete one SavedProgress.
     * @example
     * // Delete one SavedProgress
     * const SavedProgress = await prisma.savedProgress.delete({
     *   where: {
     *     // ... filter to delete one SavedProgress
     *   }
     * })
     * 
    **/
    delete<T extends SavedProgressDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressDeleteArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SavedProgress.
     * @param {SavedProgressUpdateArgs} args - Arguments to update one SavedProgress.
     * @example
     * // Update one SavedProgress
     * const savedProgress = await prisma.savedProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SavedProgressUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressUpdateArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SavedProgresses.
     * @param {SavedProgressDeleteManyArgs} args - Arguments to filter SavedProgresses to delete.
     * @example
     * // Delete a few SavedProgresses
     * const { count } = await prisma.savedProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SavedProgressDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedProgresses
     * const savedProgress = await prisma.savedProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SavedProgressUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedProgress.
     * @param {SavedProgressUpsertArgs} args - Arguments to update or create a SavedProgress.
     * @example
     * // Update or create a SavedProgress
     * const savedProgress = await prisma.savedProgress.upsert({
     *   create: {
     *     // ... data to create a SavedProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedProgress we want to update
     *   }
     * })
    **/
    upsert<T extends SavedProgressUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SavedProgressUpsertArgs<ExtArgs>>
    ): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SavedProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressCountArgs} args - Arguments to filter SavedProgresses to count.
     * @example
     * // Count the number of SavedProgresses
     * const count = await prisma.savedProgress.count({
     *   where: {
     *     // ... the filter for the SavedProgresses we want to count
     *   }
     * })
    **/
    count<T extends SavedProgressCountArgs>(
      args?: Subset<T, SavedProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedProgressAggregateArgs>(args: Subset<T, SavedProgressAggregateArgs>): Prisma.PrismaPromise<GetSavedProgressAggregateType<T>>

    /**
     * Group by SavedProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedProgressGroupByArgs['orderBy'] }
        : { orderBy?: SavedProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedProgress model
   */
  readonly fields: SavedProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SavedProgress model
   */ 
  interface SavedProgressFieldRefs {
    readonly userId: FieldRef<"SavedProgress", 'String'>
    readonly questId: FieldRef<"SavedProgress", 'String'>
    readonly progress: FieldRef<"SavedProgress", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SavedProgress findUnique
   */
  export type SavedProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter, which SavedProgress to fetch.
     */
    where: SavedProgressWhereUniqueInput
  }

  /**
   * SavedProgress findUniqueOrThrow
   */
  export type SavedProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter, which SavedProgress to fetch.
     */
    where: SavedProgressWhereUniqueInput
  }

  /**
   * SavedProgress findFirst
   */
  export type SavedProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter, which SavedProgress to fetch.
     */
    where?: SavedProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProgresses to fetch.
     */
    orderBy?: SavedProgressOrderByWithRelationInput | SavedProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProgresses.
     */
    cursor?: SavedProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProgresses.
     */
    distinct?: SavedProgressScalarFieldEnum | SavedProgressScalarFieldEnum[]
  }

  /**
   * SavedProgress findFirstOrThrow
   */
  export type SavedProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter, which SavedProgress to fetch.
     */
    where?: SavedProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProgresses to fetch.
     */
    orderBy?: SavedProgressOrderByWithRelationInput | SavedProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProgresses.
     */
    cursor?: SavedProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProgresses.
     */
    distinct?: SavedProgressScalarFieldEnum | SavedProgressScalarFieldEnum[]
  }

  /**
   * SavedProgress findMany
   */
  export type SavedProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter, which SavedProgresses to fetch.
     */
    where?: SavedProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProgresses to fetch.
     */
    orderBy?: SavedProgressOrderByWithRelationInput | SavedProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedProgresses.
     */
    cursor?: SavedProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProgresses.
     */
    skip?: number
    distinct?: SavedProgressScalarFieldEnum | SavedProgressScalarFieldEnum[]
  }

  /**
   * SavedProgress create
   */
  export type SavedProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedProgress.
     */
    data: XOR<SavedProgressCreateInput, SavedProgressUncheckedCreateInput>
  }

  /**
   * SavedProgress createMany
   */
  export type SavedProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedProgresses.
     */
    data: SavedProgressCreateManyInput | SavedProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedProgress createManyAndReturn
   */
  export type SavedProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SavedProgresses.
     */
    data: SavedProgressCreateManyInput | SavedProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedProgress update
   */
  export type SavedProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedProgress.
     */
    data: XOR<SavedProgressUpdateInput, SavedProgressUncheckedUpdateInput>
    /**
     * Choose, which SavedProgress to update.
     */
    where: SavedProgressWhereUniqueInput
  }

  /**
   * SavedProgress updateMany
   */
  export type SavedProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedProgresses.
     */
    data: XOR<SavedProgressUpdateManyMutationInput, SavedProgressUncheckedUpdateManyInput>
    /**
     * Filter which SavedProgresses to update
     */
    where?: SavedProgressWhereInput
  }

  /**
   * SavedProgress upsert
   */
  export type SavedProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedProgress to update in case it exists.
     */
    where: SavedProgressWhereUniqueInput
    /**
     * In case the SavedProgress found by the `where` argument doesn't exist, create a new SavedProgress with this data.
     */
    create: XOR<SavedProgressCreateInput, SavedProgressUncheckedCreateInput>
    /**
     * In case the SavedProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedProgressUpdateInput, SavedProgressUncheckedUpdateInput>
  }

  /**
   * SavedProgress delete
   */
  export type SavedProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
    /**
     * Filter which SavedProgress to delete.
     */
    where: SavedProgressWhereUniqueInput
  }

  /**
   * SavedProgress deleteMany
   */
  export type SavedProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProgresses to delete
     */
    where?: SavedProgressWhereInput
  }

  /**
   * SavedProgress without action
   */
  export type SavedProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProgressInclude<ExtArgs> | null
  }


  /**
   * Model Audit
   */

  export type AggregateAudit = {
    _count: AuditCountAggregateOutputType | null
    _avg: AuditAvgAggregateOutputType | null
    _sum: AuditSumAggregateOutputType | null
    _min: AuditMinAggregateOutputType | null
    _max: AuditMaxAggregateOutputType | null
  }

  export type AuditAvgAggregateOutputType = {
    xrdUsdValue: Decimal | null
    xrdPrice: Decimal | null
  }

  export type AuditSumAggregateOutputType = {
    xrdUsdValue: Decimal | null
    xrdPrice: Decimal | null
  }

  export type AuditMinAggregateOutputType = {
    transactionId: string | null
    userId: string | null
    date: Date | null
    type: $Enums.AuditType | null
    xrdUsdValue: Decimal | null
    xrdPrice: Decimal | null
  }

  export type AuditMaxAggregateOutputType = {
    transactionId: string | null
    userId: string | null
    date: Date | null
    type: $Enums.AuditType | null
    xrdUsdValue: Decimal | null
    xrdPrice: Decimal | null
  }

  export type AuditCountAggregateOutputType = {
    transactionId: number
    userId: number
    date: number
    type: number
    xrdUsdValue: number
    xrdPrice: number
    data: number
    _all: number
  }


  export type AuditAvgAggregateInputType = {
    xrdUsdValue?: true
    xrdPrice?: true
  }

  export type AuditSumAggregateInputType = {
    xrdUsdValue?: true
    xrdPrice?: true
  }

  export type AuditMinAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    xrdUsdValue?: true
    xrdPrice?: true
  }

  export type AuditMaxAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    xrdUsdValue?: true
    xrdPrice?: true
  }

  export type AuditCountAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    xrdUsdValue?: true
    xrdPrice?: true
    data?: true
    _all?: true
  }

  export type AuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Audit to aggregate.
     */
    where?: AuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audits to fetch.
     */
    orderBy?: AuditOrderByWithRelationInput | AuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Audits
    **/
    _count?: true | AuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditMaxAggregateInputType
  }

  export type GetAuditAggregateType<T extends AuditAggregateArgs> = {
        [P in keyof T & keyof AggregateAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudit[P]>
      : GetScalarType<T[P], AggregateAudit[P]>
  }




  export type AuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditWhereInput
    orderBy?: AuditOrderByWithAggregationInput | AuditOrderByWithAggregationInput[]
    by: AuditScalarFieldEnum[] | AuditScalarFieldEnum
    having?: AuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditCountAggregateInputType | true
    _avg?: AuditAvgAggregateInputType
    _sum?: AuditSumAggregateInputType
    _min?: AuditMinAggregateInputType
    _max?: AuditMaxAggregateInputType
  }

  export type AuditGroupByOutputType = {
    transactionId: string
    userId: string
    date: Date
    type: $Enums.AuditType
    xrdUsdValue: Decimal
    xrdPrice: Decimal
    data: JsonValue
    _count: AuditCountAggregateOutputType | null
    _avg: AuditAvgAggregateOutputType | null
    _sum: AuditSumAggregateOutputType | null
    _min: AuditMinAggregateOutputType | null
    _max: AuditMaxAggregateOutputType | null
  }

  type GetAuditGroupByPayload<T extends AuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditGroupByOutputType[P]>
            : GetScalarType<T[P], AuditGroupByOutputType[P]>
        }
      >
    >


  export type AuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    userId?: boolean
    date?: boolean
    type?: boolean
    xrdUsdValue?: boolean
    xrdPrice?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audit"]>

  export type AuditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    userId?: boolean
    date?: boolean
    type?: boolean
    xrdUsdValue?: boolean
    xrdPrice?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audit"]>

  export type AuditSelectScalar = {
    transactionId?: boolean
    userId?: boolean
    date?: boolean
    type?: boolean
    xrdUsdValue?: boolean
    xrdPrice?: boolean
    data?: boolean
  }

  export type AuditInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Audit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      transactionId: string
      userId: string
      date: Date
      type: $Enums.AuditType
      xrdUsdValue: Prisma.Decimal
      xrdPrice: Prisma.Decimal
      data: Prisma.JsonValue
    }, ExtArgs["result"]["audit"]>
    composites: {}
  }

  type AuditGetPayload<S extends boolean | null | undefined | AuditDefaultArgs> = $Result.GetResult<Prisma.$AuditPayload, S>

  type AuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditCountAggregateInputType | true
    }

  export interface AuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Audit'], meta: { name: 'Audit' } }
    /**
     * Find zero or one Audit that matches the filter.
     * @param {AuditFindUniqueArgs} args - Arguments to find a Audit
     * @example
     * // Get one Audit
     * const audit = await prisma.audit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuditFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, AuditFindUniqueArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Audit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditFindUniqueOrThrowArgs} args - Arguments to find a Audit
     * @example
     * // Get one Audit
     * const audit = await prisma.audit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuditFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Audit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditFindFirstArgs} args - Arguments to find a Audit
     * @example
     * // Get one Audit
     * const audit = await prisma.audit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuditFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditFindFirstArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Audit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditFindFirstOrThrowArgs} args - Arguments to find a Audit
     * @example
     * // Get one Audit
     * const audit = await prisma.audit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuditFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Audits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audits
     * const audits = await prisma.audit.findMany()
     * 
     * // Get first 10 Audits
     * const audits = await prisma.audit.findMany({ take: 10 })
     * 
     * // Only select the `transactionId`
     * const auditWithTransactionIdOnly = await prisma.audit.findMany({ select: { transactionId: true } })
     * 
    **/
    findMany<T extends AuditFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Audit.
     * @param {AuditCreateArgs} args - Arguments to create a Audit.
     * @example
     * // Create one Audit
     * const Audit = await prisma.audit.create({
     *   data: {
     *     // ... data to create a Audit
     *   }
     * })
     * 
    **/
    create<T extends AuditCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AuditCreateArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Audits.
     * @param {AuditCreateManyArgs} args - Arguments to create many Audits.
     * @example
     * // Create many Audits
     * const audit = await prisma.audit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends AuditCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Audits and returns the data saved in the database.
     * @param {AuditCreateManyAndReturnArgs} args - Arguments to create many Audits.
     * @example
     * // Create many Audits
     * const audit = await prisma.audit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Audits and only return the `transactionId`
     * const auditWithTransactionIdOnly = await prisma.audit.createManyAndReturn({ 
     *   select: { transactionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends AuditCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Audit.
     * @param {AuditDeleteArgs} args - Arguments to delete one Audit.
     * @example
     * // Delete one Audit
     * const Audit = await prisma.audit.delete({
     *   where: {
     *     // ... filter to delete one Audit
     *   }
     * })
     * 
    **/
    delete<T extends AuditDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AuditDeleteArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Audit.
     * @param {AuditUpdateArgs} args - Arguments to update one Audit.
     * @example
     * // Update one Audit
     * const audit = await prisma.audit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuditUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AuditUpdateArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Audits.
     * @param {AuditDeleteManyArgs} args - Arguments to filter Audits to delete.
     * @example
     * // Delete a few Audits
     * const { count } = await prisma.audit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuditDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audits
     * const audit = await prisma.audit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuditUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AuditUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Audit.
     * @param {AuditUpsertArgs} args - Arguments to update or create a Audit.
     * @example
     * // Update or create a Audit
     * const audit = await prisma.audit.upsert({
     *   create: {
     *     // ... data to create a Audit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audit we want to update
     *   }
     * })
    **/
    upsert<T extends AuditUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AuditUpsertArgs<ExtArgs>>
    ): Prisma__AuditClient<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Audits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditCountArgs} args - Arguments to filter Audits to count.
     * @example
     * // Count the number of Audits
     * const count = await prisma.audit.count({
     *   where: {
     *     // ... the filter for the Audits we want to count
     *   }
     * })
    **/
    count<T extends AuditCountArgs>(
      args?: Subset<T, AuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditAggregateArgs>(args: Subset<T, AuditAggregateArgs>): Prisma.PrismaPromise<GetAuditAggregateType<T>>

    /**
     * Group by Audit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditGroupByArgs['orderBy'] }
        : { orderBy?: AuditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Audit model
   */
  readonly fields: AuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Audit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Audit model
   */ 
  interface AuditFieldRefs {
    readonly transactionId: FieldRef<"Audit", 'String'>
    readonly userId: FieldRef<"Audit", 'String'>
    readonly date: FieldRef<"Audit", 'DateTime'>
    readonly type: FieldRef<"Audit", 'AuditType'>
    readonly xrdUsdValue: FieldRef<"Audit", 'Decimal'>
    readonly xrdPrice: FieldRef<"Audit", 'Decimal'>
    readonly data: FieldRef<"Audit", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Audit findUnique
   */
  export type AuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter, which Audit to fetch.
     */
    where: AuditWhereUniqueInput
  }

  /**
   * Audit findUniqueOrThrow
   */
  export type AuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter, which Audit to fetch.
     */
    where: AuditWhereUniqueInput
  }

  /**
   * Audit findFirst
   */
  export type AuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter, which Audit to fetch.
     */
    where?: AuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audits to fetch.
     */
    orderBy?: AuditOrderByWithRelationInput | AuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Audits.
     */
    cursor?: AuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Audits.
     */
    distinct?: AuditScalarFieldEnum | AuditScalarFieldEnum[]
  }

  /**
   * Audit findFirstOrThrow
   */
  export type AuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter, which Audit to fetch.
     */
    where?: AuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audits to fetch.
     */
    orderBy?: AuditOrderByWithRelationInput | AuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Audits.
     */
    cursor?: AuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Audits.
     */
    distinct?: AuditScalarFieldEnum | AuditScalarFieldEnum[]
  }

  /**
   * Audit findMany
   */
  export type AuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter, which Audits to fetch.
     */
    where?: AuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Audits to fetch.
     */
    orderBy?: AuditOrderByWithRelationInput | AuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Audits.
     */
    cursor?: AuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Audits.
     */
    skip?: number
    distinct?: AuditScalarFieldEnum | AuditScalarFieldEnum[]
  }

  /**
   * Audit create
   */
  export type AuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * The data needed to create a Audit.
     */
    data: XOR<AuditCreateInput, AuditUncheckedCreateInput>
  }

  /**
   * Audit createMany
   */
  export type AuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Audits.
     */
    data: AuditCreateManyInput | AuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Audit createManyAndReturn
   */
  export type AuditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Audits.
     */
    data: AuditCreateManyInput | AuditCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Audit update
   */
  export type AuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * The data needed to update a Audit.
     */
    data: XOR<AuditUpdateInput, AuditUncheckedUpdateInput>
    /**
     * Choose, which Audit to update.
     */
    where: AuditWhereUniqueInput
  }

  /**
   * Audit updateMany
   */
  export type AuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Audits.
     */
    data: XOR<AuditUpdateManyMutationInput, AuditUncheckedUpdateManyInput>
    /**
     * Filter which Audits to update
     */
    where?: AuditWhereInput
  }

  /**
   * Audit upsert
   */
  export type AuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * The filter to search for the Audit to update in case it exists.
     */
    where: AuditWhereUniqueInput
    /**
     * In case the Audit found by the `where` argument doesn't exist, create a new Audit with this data.
     */
    create: XOR<AuditCreateInput, AuditUncheckedCreateInput>
    /**
     * In case the Audit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditUpdateInput, AuditUncheckedUpdateInput>
  }

  /**
   * Audit delete
   */
  export type AuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
    /**
     * Filter which Audit to delete.
     */
    where: AuditWhereUniqueInput
  }

  /**
   * Audit deleteMany
   */
  export type AuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Audits to delete
     */
    where?: AuditWhereInput
  }

  /**
   * Audit without action
   */
  export type AuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditInclude<ExtArgs> | null
  }


  /**
   * Model TransactionIntent
   */

  export type AggregateTransactionIntent = {
    _count: TransactionIntentCountAggregateOutputType | null
    _min: TransactionIntentMinAggregateOutputType | null
    _max: TransactionIntentMaxAggregateOutputType | null
  }

  export type TransactionIntentMinAggregateOutputType = {
    discriminator: string | null
    status: $Enums.TransactionIntentStatus | null
    createdAt: Date | null
    error: string | null
    userId: string | null
    batchId: string | null
  }

  export type TransactionIntentMaxAggregateOutputType = {
    discriminator: string | null
    status: $Enums.TransactionIntentStatus | null
    createdAt: Date | null
    error: string | null
    userId: string | null
    batchId: string | null
  }

  export type TransactionIntentCountAggregateOutputType = {
    discriminator: number
    status: number
    createdAt: number
    error: number
    userId: number
    data: number
    batchId: number
    _all: number
  }


  export type TransactionIntentMinAggregateInputType = {
    discriminator?: true
    status?: true
    createdAt?: true
    error?: true
    userId?: true
    batchId?: true
  }

  export type TransactionIntentMaxAggregateInputType = {
    discriminator?: true
    status?: true
    createdAt?: true
    error?: true
    userId?: true
    batchId?: true
  }

  export type TransactionIntentCountAggregateInputType = {
    discriminator?: true
    status?: true
    createdAt?: true
    error?: true
    userId?: true
    data?: true
    batchId?: true
    _all?: true
  }

  export type TransactionIntentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionIntent to aggregate.
     */
    where?: TransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionIntents to fetch.
     */
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionIntents
    **/
    _count?: true | TransactionIntentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionIntentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionIntentMaxAggregateInputType
  }

  export type GetTransactionIntentAggregateType<T extends TransactionIntentAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactionIntent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionIntent[P]>
      : GetScalarType<T[P], AggregateTransactionIntent[P]>
  }




  export type TransactionIntentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionIntentWhereInput
    orderBy?: TransactionIntentOrderByWithAggregationInput | TransactionIntentOrderByWithAggregationInput[]
    by: TransactionIntentScalarFieldEnum[] | TransactionIntentScalarFieldEnum
    having?: TransactionIntentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionIntentCountAggregateInputType | true
    _min?: TransactionIntentMinAggregateInputType
    _max?: TransactionIntentMaxAggregateInputType
  }

  export type TransactionIntentGroupByOutputType = {
    discriminator: string
    status: $Enums.TransactionIntentStatus
    createdAt: Date
    error: string | null
    userId: string
    data: JsonValue | null
    batchId: string | null
    _count: TransactionIntentCountAggregateOutputType | null
    _min: TransactionIntentMinAggregateOutputType | null
    _max: TransactionIntentMaxAggregateOutputType | null
  }

  type GetTransactionIntentGroupByPayload<T extends TransactionIntentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionIntentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionIntentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionIntentGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionIntentGroupByOutputType[P]>
        }
      >
    >


  export type TransactionIntentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    discriminator?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    userId?: boolean
    data?: boolean
    batchId?: boolean
    transactions?: boolean | TransactionIntent$transactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    batch?: boolean | TransactionIntent$batchArgs<ExtArgs>
    _count?: boolean | TransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionIntent"]>

  export type TransactionIntentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    discriminator?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    userId?: boolean
    data?: boolean
    batchId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    batch?: boolean | TransactionIntent$batchArgs<ExtArgs>
  }, ExtArgs["result"]["transactionIntent"]>

  export type TransactionIntentSelectScalar = {
    discriminator?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    userId?: boolean
    data?: boolean
    batchId?: boolean
  }

  export type TransactionIntentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | TransactionIntent$transactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    batch?: boolean | TransactionIntent$batchArgs<ExtArgs>
    _count?: boolean | TransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIntentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    batch?: boolean | TransactionIntent$batchArgs<ExtArgs>
  }

  export type $TransactionIntentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransactionIntent"
    objects: {
      transactions: Prisma.$SubmittedTransactionPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      batch: Prisma.$BatchedTransactionIntentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      discriminator: string
      status: $Enums.TransactionIntentStatus
      createdAt: Date
      error: string | null
      userId: string
      data: Prisma.JsonValue | null
      batchId: string | null
    }, ExtArgs["result"]["transactionIntent"]>
    composites: {}
  }

  type TransactionIntentGetPayload<S extends boolean | null | undefined | TransactionIntentDefaultArgs> = $Result.GetResult<Prisma.$TransactionIntentPayload, S>

  type TransactionIntentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionIntentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionIntentCountAggregateInputType | true
    }

  export interface TransactionIntentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransactionIntent'], meta: { name: 'TransactionIntent' } }
    /**
     * Find zero or one TransactionIntent that matches the filter.
     * @param {TransactionIntentFindUniqueArgs} args - Arguments to find a TransactionIntent
     * @example
     * // Get one TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionIntentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentFindUniqueArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TransactionIntent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransactionIntentFindUniqueOrThrowArgs} args - Arguments to find a TransactionIntent
     * @example
     * // Get one TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TransactionIntentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TransactionIntent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentFindFirstArgs} args - Arguments to find a TransactionIntent
     * @example
     * // Get one TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionIntentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentFindFirstArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TransactionIntent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentFindFirstOrThrowArgs} args - Arguments to find a TransactionIntent
     * @example
     * // Get one TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TransactionIntentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TransactionIntents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionIntents
     * const transactionIntents = await prisma.transactionIntent.findMany()
     * 
     * // Get first 10 TransactionIntents
     * const transactionIntents = await prisma.transactionIntent.findMany({ take: 10 })
     * 
     * // Only select the `discriminator`
     * const transactionIntentWithDiscriminatorOnly = await prisma.transactionIntent.findMany({ select: { discriminator: true } })
     * 
    **/
    findMany<T extends TransactionIntentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TransactionIntent.
     * @param {TransactionIntentCreateArgs} args - Arguments to create a TransactionIntent.
     * @example
     * // Create one TransactionIntent
     * const TransactionIntent = await prisma.transactionIntent.create({
     *   data: {
     *     // ... data to create a TransactionIntent
     *   }
     * })
     * 
    **/
    create<T extends TransactionIntentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentCreateArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TransactionIntents.
     * @param {TransactionIntentCreateManyArgs} args - Arguments to create many TransactionIntents.
     * @example
     * // Create many TransactionIntents
     * const transactionIntent = await prisma.transactionIntent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends TransactionIntentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TransactionIntents and returns the data saved in the database.
     * @param {TransactionIntentCreateManyAndReturnArgs} args - Arguments to create many TransactionIntents.
     * @example
     * // Create many TransactionIntents
     * const transactionIntent = await prisma.transactionIntent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TransactionIntents and only return the `discriminator`
     * const transactionIntentWithDiscriminatorOnly = await prisma.transactionIntent.createManyAndReturn({ 
     *   select: { discriminator: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends TransactionIntentCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a TransactionIntent.
     * @param {TransactionIntentDeleteArgs} args - Arguments to delete one TransactionIntent.
     * @example
     * // Delete one TransactionIntent
     * const TransactionIntent = await prisma.transactionIntent.delete({
     *   where: {
     *     // ... filter to delete one TransactionIntent
     *   }
     * })
     * 
    **/
    delete<T extends TransactionIntentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentDeleteArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TransactionIntent.
     * @param {TransactionIntentUpdateArgs} args - Arguments to update one TransactionIntent.
     * @example
     * // Update one TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionIntentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentUpdateArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TransactionIntents.
     * @param {TransactionIntentDeleteManyArgs} args - Arguments to filter TransactionIntents to delete.
     * @example
     * // Delete a few TransactionIntents
     * const { count } = await prisma.transactionIntent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionIntentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionIntentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionIntents
     * const transactionIntent = await prisma.transactionIntent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionIntentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TransactionIntent.
     * @param {TransactionIntentUpsertArgs} args - Arguments to update or create a TransactionIntent.
     * @example
     * // Update or create a TransactionIntent
     * const transactionIntent = await prisma.transactionIntent.upsert({
     *   create: {
     *     // ... data to create a TransactionIntent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionIntent we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionIntentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionIntentUpsertArgs<ExtArgs>>
    ): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TransactionIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentCountArgs} args - Arguments to filter TransactionIntents to count.
     * @example
     * // Count the number of TransactionIntents
     * const count = await prisma.transactionIntent.count({
     *   where: {
     *     // ... the filter for the TransactionIntents we want to count
     *   }
     * })
    **/
    count<T extends TransactionIntentCountArgs>(
      args?: Subset<T, TransactionIntentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionIntentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionIntentAggregateArgs>(args: Subset<T, TransactionIntentAggregateArgs>): Prisma.PrismaPromise<GetTransactionIntentAggregateType<T>>

    /**
     * Group by TransactionIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionIntentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionIntentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionIntentGroupByArgs['orderBy'] }
        : { orderBy?: TransactionIntentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionIntentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionIntentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransactionIntent model
   */
  readonly fields: TransactionIntentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionIntent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionIntentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    transactions<T extends TransactionIntent$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, TransactionIntent$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findMany'> | Null>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    batch<T extends TransactionIntent$batchArgs<ExtArgs> = {}>(args?: Subset<T, TransactionIntent$batchArgs<ExtArgs>>): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TransactionIntent model
   */ 
  interface TransactionIntentFieldRefs {
    readonly discriminator: FieldRef<"TransactionIntent", 'String'>
    readonly status: FieldRef<"TransactionIntent", 'TransactionIntentStatus'>
    readonly createdAt: FieldRef<"TransactionIntent", 'DateTime'>
    readonly error: FieldRef<"TransactionIntent", 'String'>
    readonly userId: FieldRef<"TransactionIntent", 'String'>
    readonly data: FieldRef<"TransactionIntent", 'Json'>
    readonly batchId: FieldRef<"TransactionIntent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TransactionIntent findUnique
   */
  export type TransactionIntentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which TransactionIntent to fetch.
     */
    where: TransactionIntentWhereUniqueInput
  }

  /**
   * TransactionIntent findUniqueOrThrow
   */
  export type TransactionIntentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which TransactionIntent to fetch.
     */
    where: TransactionIntentWhereUniqueInput
  }

  /**
   * TransactionIntent findFirst
   */
  export type TransactionIntentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which TransactionIntent to fetch.
     */
    where?: TransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionIntents to fetch.
     */
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionIntents.
     */
    cursor?: TransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionIntents.
     */
    distinct?: TransactionIntentScalarFieldEnum | TransactionIntentScalarFieldEnum[]
  }

  /**
   * TransactionIntent findFirstOrThrow
   */
  export type TransactionIntentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which TransactionIntent to fetch.
     */
    where?: TransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionIntents to fetch.
     */
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionIntents.
     */
    cursor?: TransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionIntents.
     */
    distinct?: TransactionIntentScalarFieldEnum | TransactionIntentScalarFieldEnum[]
  }

  /**
   * TransactionIntent findMany
   */
  export type TransactionIntentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which TransactionIntents to fetch.
     */
    where?: TransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionIntents to fetch.
     */
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionIntents.
     */
    cursor?: TransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionIntents.
     */
    skip?: number
    distinct?: TransactionIntentScalarFieldEnum | TransactionIntentScalarFieldEnum[]
  }

  /**
   * TransactionIntent create
   */
  export type TransactionIntentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * The data needed to create a TransactionIntent.
     */
    data: XOR<TransactionIntentCreateInput, TransactionIntentUncheckedCreateInput>
  }

  /**
   * TransactionIntent createMany
   */
  export type TransactionIntentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransactionIntents.
     */
    data: TransactionIntentCreateManyInput | TransactionIntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransactionIntent createManyAndReturn
   */
  export type TransactionIntentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TransactionIntents.
     */
    data: TransactionIntentCreateManyInput | TransactionIntentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransactionIntent update
   */
  export type TransactionIntentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * The data needed to update a TransactionIntent.
     */
    data: XOR<TransactionIntentUpdateInput, TransactionIntentUncheckedUpdateInput>
    /**
     * Choose, which TransactionIntent to update.
     */
    where: TransactionIntentWhereUniqueInput
  }

  /**
   * TransactionIntent updateMany
   */
  export type TransactionIntentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransactionIntents.
     */
    data: XOR<TransactionIntentUpdateManyMutationInput, TransactionIntentUncheckedUpdateManyInput>
    /**
     * Filter which TransactionIntents to update
     */
    where?: TransactionIntentWhereInput
  }

  /**
   * TransactionIntent upsert
   */
  export type TransactionIntentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * The filter to search for the TransactionIntent to update in case it exists.
     */
    where: TransactionIntentWhereUniqueInput
    /**
     * In case the TransactionIntent found by the `where` argument doesn't exist, create a new TransactionIntent with this data.
     */
    create: XOR<TransactionIntentCreateInput, TransactionIntentUncheckedCreateInput>
    /**
     * In case the TransactionIntent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionIntentUpdateInput, TransactionIntentUncheckedUpdateInput>
  }

  /**
   * TransactionIntent delete
   */
  export type TransactionIntentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    /**
     * Filter which TransactionIntent to delete.
     */
    where: TransactionIntentWhereUniqueInput
  }

  /**
   * TransactionIntent deleteMany
   */
  export type TransactionIntentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionIntents to delete
     */
    where?: TransactionIntentWhereInput
  }

  /**
   * TransactionIntent.transactions
   */
  export type TransactionIntent$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    where?: SubmittedTransactionWhereInput
    orderBy?: SubmittedTransactionOrderByWithRelationInput | SubmittedTransactionOrderByWithRelationInput[]
    cursor?: SubmittedTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmittedTransactionScalarFieldEnum | SubmittedTransactionScalarFieldEnum[]
  }

  /**
   * TransactionIntent.batch
   */
  export type TransactionIntent$batchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    where?: BatchedTransactionIntentWhereInput
  }

  /**
   * TransactionIntent without action
   */
  export type TransactionIntentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
  }


  /**
   * Model BatchedTransactionIntent
   */

  export type AggregateBatchedTransactionIntent = {
    _count: BatchedTransactionIntentCountAggregateOutputType | null
    _min: BatchedTransactionIntentMinAggregateOutputType | null
    _max: BatchedTransactionIntentMaxAggregateOutputType | null
  }

  export type BatchedTransactionIntentMinAggregateOutputType = {
    id: string | null
    status: $Enums.TransactionIntentStatus | null
    createdAt: Date | null
    error: string | null
  }

  export type BatchedTransactionIntentMaxAggregateOutputType = {
    id: string | null
    status: $Enums.TransactionIntentStatus | null
    createdAt: Date | null
    error: string | null
  }

  export type BatchedTransactionIntentCountAggregateOutputType = {
    id: number
    status: number
    createdAt: number
    error: number
    _all: number
  }


  export type BatchedTransactionIntentMinAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    error?: true
  }

  export type BatchedTransactionIntentMaxAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    error?: true
  }

  export type BatchedTransactionIntentCountAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    error?: true
    _all?: true
  }

  export type BatchedTransactionIntentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchedTransactionIntent to aggregate.
     */
    where?: BatchedTransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchedTransactionIntents to fetch.
     */
    orderBy?: BatchedTransactionIntentOrderByWithRelationInput | BatchedTransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchedTransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchedTransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchedTransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BatchedTransactionIntents
    **/
    _count?: true | BatchedTransactionIntentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchedTransactionIntentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchedTransactionIntentMaxAggregateInputType
  }

  export type GetBatchedTransactionIntentAggregateType<T extends BatchedTransactionIntentAggregateArgs> = {
        [P in keyof T & keyof AggregateBatchedTransactionIntent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatchedTransactionIntent[P]>
      : GetScalarType<T[P], AggregateBatchedTransactionIntent[P]>
  }




  export type BatchedTransactionIntentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchedTransactionIntentWhereInput
    orderBy?: BatchedTransactionIntentOrderByWithAggregationInput | BatchedTransactionIntentOrderByWithAggregationInput[]
    by: BatchedTransactionIntentScalarFieldEnum[] | BatchedTransactionIntentScalarFieldEnum
    having?: BatchedTransactionIntentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchedTransactionIntentCountAggregateInputType | true
    _min?: BatchedTransactionIntentMinAggregateInputType
    _max?: BatchedTransactionIntentMaxAggregateInputType
  }

  export type BatchedTransactionIntentGroupByOutputType = {
    id: string
    status: $Enums.TransactionIntentStatus
    createdAt: Date
    error: string | null
    _count: BatchedTransactionIntentCountAggregateOutputType | null
    _min: BatchedTransactionIntentMinAggregateOutputType | null
    _max: BatchedTransactionIntentMaxAggregateOutputType | null
  }

  type GetBatchedTransactionIntentGroupByPayload<T extends BatchedTransactionIntentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchedTransactionIntentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchedTransactionIntentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchedTransactionIntentGroupByOutputType[P]>
            : GetScalarType<T[P], BatchedTransactionIntentGroupByOutputType[P]>
        }
      >
    >


  export type BatchedTransactionIntentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    transactionIntents?: boolean | BatchedTransactionIntent$transactionIntentsArgs<ExtArgs>
    _count?: boolean | BatchedTransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batchedTransactionIntent"]>

  export type BatchedTransactionIntentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
  }, ExtArgs["result"]["batchedTransactionIntent"]>

  export type BatchedTransactionIntentSelectScalar = {
    id?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
  }

  export type BatchedTransactionIntentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactionIntents?: boolean | BatchedTransactionIntent$transactionIntentsArgs<ExtArgs>
    _count?: boolean | BatchedTransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchedTransactionIntentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BatchedTransactionIntentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BatchedTransactionIntent"
    objects: {
      transactionIntents: Prisma.$TransactionIntentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.TransactionIntentStatus
      createdAt: Date
      error: string | null
    }, ExtArgs["result"]["batchedTransactionIntent"]>
    composites: {}
  }

  type BatchedTransactionIntentGetPayload<S extends boolean | null | undefined | BatchedTransactionIntentDefaultArgs> = $Result.GetResult<Prisma.$BatchedTransactionIntentPayload, S>

  type BatchedTransactionIntentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BatchedTransactionIntentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BatchedTransactionIntentCountAggregateInputType | true
    }

  export interface BatchedTransactionIntentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BatchedTransactionIntent'], meta: { name: 'BatchedTransactionIntent' } }
    /**
     * Find zero or one BatchedTransactionIntent that matches the filter.
     * @param {BatchedTransactionIntentFindUniqueArgs} args - Arguments to find a BatchedTransactionIntent
     * @example
     * // Get one BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BatchedTransactionIntentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentFindUniqueArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one BatchedTransactionIntent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BatchedTransactionIntentFindUniqueOrThrowArgs} args - Arguments to find a BatchedTransactionIntent
     * @example
     * // Get one BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BatchedTransactionIntentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first BatchedTransactionIntent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentFindFirstArgs} args - Arguments to find a BatchedTransactionIntent
     * @example
     * // Get one BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BatchedTransactionIntentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentFindFirstArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first BatchedTransactionIntent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentFindFirstOrThrowArgs} args - Arguments to find a BatchedTransactionIntent
     * @example
     * // Get one BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BatchedTransactionIntentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more BatchedTransactionIntents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BatchedTransactionIntents
     * const batchedTransactionIntents = await prisma.batchedTransactionIntent.findMany()
     * 
     * // Get first 10 BatchedTransactionIntents
     * const batchedTransactionIntents = await prisma.batchedTransactionIntent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchedTransactionIntentWithIdOnly = await prisma.batchedTransactionIntent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BatchedTransactionIntentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a BatchedTransactionIntent.
     * @param {BatchedTransactionIntentCreateArgs} args - Arguments to create a BatchedTransactionIntent.
     * @example
     * // Create one BatchedTransactionIntent
     * const BatchedTransactionIntent = await prisma.batchedTransactionIntent.create({
     *   data: {
     *     // ... data to create a BatchedTransactionIntent
     *   }
     * })
     * 
    **/
    create<T extends BatchedTransactionIntentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentCreateArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many BatchedTransactionIntents.
     * @param {BatchedTransactionIntentCreateManyArgs} args - Arguments to create many BatchedTransactionIntents.
     * @example
     * // Create many BatchedTransactionIntents
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends BatchedTransactionIntentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BatchedTransactionIntents and returns the data saved in the database.
     * @param {BatchedTransactionIntentCreateManyAndReturnArgs} args - Arguments to create many BatchedTransactionIntents.
     * @example
     * // Create many BatchedTransactionIntents
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BatchedTransactionIntents and only return the `id`
     * const batchedTransactionIntentWithIdOnly = await prisma.batchedTransactionIntent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends BatchedTransactionIntentCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a BatchedTransactionIntent.
     * @param {BatchedTransactionIntentDeleteArgs} args - Arguments to delete one BatchedTransactionIntent.
     * @example
     * // Delete one BatchedTransactionIntent
     * const BatchedTransactionIntent = await prisma.batchedTransactionIntent.delete({
     *   where: {
     *     // ... filter to delete one BatchedTransactionIntent
     *   }
     * })
     * 
    **/
    delete<T extends BatchedTransactionIntentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentDeleteArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one BatchedTransactionIntent.
     * @param {BatchedTransactionIntentUpdateArgs} args - Arguments to update one BatchedTransactionIntent.
     * @example
     * // Update one BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BatchedTransactionIntentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentUpdateArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more BatchedTransactionIntents.
     * @param {BatchedTransactionIntentDeleteManyArgs} args - Arguments to filter BatchedTransactionIntents to delete.
     * @example
     * // Delete a few BatchedTransactionIntents
     * const { count } = await prisma.batchedTransactionIntent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BatchedTransactionIntentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BatchedTransactionIntentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchedTransactionIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BatchedTransactionIntents
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BatchedTransactionIntentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BatchedTransactionIntent.
     * @param {BatchedTransactionIntentUpsertArgs} args - Arguments to update or create a BatchedTransactionIntent.
     * @example
     * // Update or create a BatchedTransactionIntent
     * const batchedTransactionIntent = await prisma.batchedTransactionIntent.upsert({
     *   create: {
     *     // ... data to create a BatchedTransactionIntent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BatchedTransactionIntent we want to update
     *   }
     * })
    **/
    upsert<T extends BatchedTransactionIntentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BatchedTransactionIntentUpsertArgs<ExtArgs>>
    ): Prisma__BatchedTransactionIntentClient<$Result.GetResult<Prisma.$BatchedTransactionIntentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of BatchedTransactionIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentCountArgs} args - Arguments to filter BatchedTransactionIntents to count.
     * @example
     * // Count the number of BatchedTransactionIntents
     * const count = await prisma.batchedTransactionIntent.count({
     *   where: {
     *     // ... the filter for the BatchedTransactionIntents we want to count
     *   }
     * })
    **/
    count<T extends BatchedTransactionIntentCountArgs>(
      args?: Subset<T, BatchedTransactionIntentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchedTransactionIntentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BatchedTransactionIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchedTransactionIntentAggregateArgs>(args: Subset<T, BatchedTransactionIntentAggregateArgs>): Prisma.PrismaPromise<GetBatchedTransactionIntentAggregateType<T>>

    /**
     * Group by BatchedTransactionIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchedTransactionIntentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchedTransactionIntentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchedTransactionIntentGroupByArgs['orderBy'] }
        : { orderBy?: BatchedTransactionIntentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchedTransactionIntentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchedTransactionIntentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BatchedTransactionIntent model
   */
  readonly fields: BatchedTransactionIntentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BatchedTransactionIntent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchedTransactionIntentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    transactionIntents<T extends BatchedTransactionIntent$transactionIntentsArgs<ExtArgs> = {}>(args?: Subset<T, BatchedTransactionIntent$transactionIntentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the BatchedTransactionIntent model
   */ 
  interface BatchedTransactionIntentFieldRefs {
    readonly id: FieldRef<"BatchedTransactionIntent", 'String'>
    readonly status: FieldRef<"BatchedTransactionIntent", 'TransactionIntentStatus'>
    readonly createdAt: FieldRef<"BatchedTransactionIntent", 'DateTime'>
    readonly error: FieldRef<"BatchedTransactionIntent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BatchedTransactionIntent findUnique
   */
  export type BatchedTransactionIntentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which BatchedTransactionIntent to fetch.
     */
    where: BatchedTransactionIntentWhereUniqueInput
  }

  /**
   * BatchedTransactionIntent findUniqueOrThrow
   */
  export type BatchedTransactionIntentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which BatchedTransactionIntent to fetch.
     */
    where: BatchedTransactionIntentWhereUniqueInput
  }

  /**
   * BatchedTransactionIntent findFirst
   */
  export type BatchedTransactionIntentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which BatchedTransactionIntent to fetch.
     */
    where?: BatchedTransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchedTransactionIntents to fetch.
     */
    orderBy?: BatchedTransactionIntentOrderByWithRelationInput | BatchedTransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchedTransactionIntents.
     */
    cursor?: BatchedTransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchedTransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchedTransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchedTransactionIntents.
     */
    distinct?: BatchedTransactionIntentScalarFieldEnum | BatchedTransactionIntentScalarFieldEnum[]
  }

  /**
   * BatchedTransactionIntent findFirstOrThrow
   */
  export type BatchedTransactionIntentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which BatchedTransactionIntent to fetch.
     */
    where?: BatchedTransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchedTransactionIntents to fetch.
     */
    orderBy?: BatchedTransactionIntentOrderByWithRelationInput | BatchedTransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchedTransactionIntents.
     */
    cursor?: BatchedTransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchedTransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchedTransactionIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchedTransactionIntents.
     */
    distinct?: BatchedTransactionIntentScalarFieldEnum | BatchedTransactionIntentScalarFieldEnum[]
  }

  /**
   * BatchedTransactionIntent findMany
   */
  export type BatchedTransactionIntentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter, which BatchedTransactionIntents to fetch.
     */
    where?: BatchedTransactionIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchedTransactionIntents to fetch.
     */
    orderBy?: BatchedTransactionIntentOrderByWithRelationInput | BatchedTransactionIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BatchedTransactionIntents.
     */
    cursor?: BatchedTransactionIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchedTransactionIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchedTransactionIntents.
     */
    skip?: number
    distinct?: BatchedTransactionIntentScalarFieldEnum | BatchedTransactionIntentScalarFieldEnum[]
  }

  /**
   * BatchedTransactionIntent create
   */
  export type BatchedTransactionIntentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * The data needed to create a BatchedTransactionIntent.
     */
    data: XOR<BatchedTransactionIntentCreateInput, BatchedTransactionIntentUncheckedCreateInput>
  }

  /**
   * BatchedTransactionIntent createMany
   */
  export type BatchedTransactionIntentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BatchedTransactionIntents.
     */
    data: BatchedTransactionIntentCreateManyInput | BatchedTransactionIntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchedTransactionIntent createManyAndReturn
   */
  export type BatchedTransactionIntentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BatchedTransactionIntents.
     */
    data: BatchedTransactionIntentCreateManyInput | BatchedTransactionIntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchedTransactionIntent update
   */
  export type BatchedTransactionIntentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * The data needed to update a BatchedTransactionIntent.
     */
    data: XOR<BatchedTransactionIntentUpdateInput, BatchedTransactionIntentUncheckedUpdateInput>
    /**
     * Choose, which BatchedTransactionIntent to update.
     */
    where: BatchedTransactionIntentWhereUniqueInput
  }

  /**
   * BatchedTransactionIntent updateMany
   */
  export type BatchedTransactionIntentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BatchedTransactionIntents.
     */
    data: XOR<BatchedTransactionIntentUpdateManyMutationInput, BatchedTransactionIntentUncheckedUpdateManyInput>
    /**
     * Filter which BatchedTransactionIntents to update
     */
    where?: BatchedTransactionIntentWhereInput
  }

  /**
   * BatchedTransactionIntent upsert
   */
  export type BatchedTransactionIntentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * The filter to search for the BatchedTransactionIntent to update in case it exists.
     */
    where: BatchedTransactionIntentWhereUniqueInput
    /**
     * In case the BatchedTransactionIntent found by the `where` argument doesn't exist, create a new BatchedTransactionIntent with this data.
     */
    create: XOR<BatchedTransactionIntentCreateInput, BatchedTransactionIntentUncheckedCreateInput>
    /**
     * In case the BatchedTransactionIntent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchedTransactionIntentUpdateInput, BatchedTransactionIntentUncheckedUpdateInput>
  }

  /**
   * BatchedTransactionIntent delete
   */
  export type BatchedTransactionIntentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
    /**
     * Filter which BatchedTransactionIntent to delete.
     */
    where: BatchedTransactionIntentWhereUniqueInput
  }

  /**
   * BatchedTransactionIntent deleteMany
   */
  export type BatchedTransactionIntentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchedTransactionIntents to delete
     */
    where?: BatchedTransactionIntentWhereInput
  }

  /**
   * BatchedTransactionIntent.transactionIntents
   */
  export type BatchedTransactionIntent$transactionIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionIntent
     */
    select?: TransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIntentInclude<ExtArgs> | null
    where?: TransactionIntentWhereInput
    orderBy?: TransactionIntentOrderByWithRelationInput | TransactionIntentOrderByWithRelationInput[]
    cursor?: TransactionIntentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionIntentScalarFieldEnum | TransactionIntentScalarFieldEnum[]
  }

  /**
   * BatchedTransactionIntent without action
   */
  export type BatchedTransactionIntentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchedTransactionIntent
     */
    select?: BatchedTransactionIntentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchedTransactionIntentInclude<ExtArgs> | null
  }


  /**
   * Model SubmittedTransaction
   */

  export type AggregateSubmittedTransaction = {
    _count: SubmittedTransactionCountAggregateOutputType | null
    _min: SubmittedTransactionMinAggregateOutputType | null
    _max: SubmittedTransactionMaxAggregateOutputType | null
  }

  export type SubmittedTransactionMinAggregateOutputType = {
    transactionId: string | null
    transactionIntent: string | null
    status: string | null
    createdAt: Date | null
  }

  export type SubmittedTransactionMaxAggregateOutputType = {
    transactionId: string | null
    transactionIntent: string | null
    status: string | null
    createdAt: Date | null
  }

  export type SubmittedTransactionCountAggregateOutputType = {
    transactionId: number
    transactionIntent: number
    status: number
    createdAt: number
    _all: number
  }


  export type SubmittedTransactionMinAggregateInputType = {
    transactionId?: true
    transactionIntent?: true
    status?: true
    createdAt?: true
  }

  export type SubmittedTransactionMaxAggregateInputType = {
    transactionId?: true
    transactionIntent?: true
    status?: true
    createdAt?: true
  }

  export type SubmittedTransactionCountAggregateInputType = {
    transactionId?: true
    transactionIntent?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type SubmittedTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmittedTransaction to aggregate.
     */
    where?: SubmittedTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedTransactions to fetch.
     */
    orderBy?: SubmittedTransactionOrderByWithRelationInput | SubmittedTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmittedTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubmittedTransactions
    **/
    _count?: true | SubmittedTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmittedTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmittedTransactionMaxAggregateInputType
  }

  export type GetSubmittedTransactionAggregateType<T extends SubmittedTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmittedTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmittedTransaction[P]>
      : GetScalarType<T[P], AggregateSubmittedTransaction[P]>
  }




  export type SubmittedTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmittedTransactionWhereInput
    orderBy?: SubmittedTransactionOrderByWithAggregationInput | SubmittedTransactionOrderByWithAggregationInput[]
    by: SubmittedTransactionScalarFieldEnum[] | SubmittedTransactionScalarFieldEnum
    having?: SubmittedTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmittedTransactionCountAggregateInputType | true
    _min?: SubmittedTransactionMinAggregateInputType
    _max?: SubmittedTransactionMaxAggregateInputType
  }

  export type SubmittedTransactionGroupByOutputType = {
    transactionId: string
    transactionIntent: string
    status: string
    createdAt: Date
    _count: SubmittedTransactionCountAggregateOutputType | null
    _min: SubmittedTransactionMinAggregateOutputType | null
    _max: SubmittedTransactionMaxAggregateOutputType | null
  }

  type GetSubmittedTransactionGroupByPayload<T extends SubmittedTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmittedTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmittedTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmittedTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmittedTransactionGroupByOutputType[P]>
        }
      >
    >


  export type SubmittedTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    transactionIntent?: boolean
    status?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionIntentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submittedTransaction"]>

  export type SubmittedTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transactionId?: boolean
    transactionIntent?: boolean
    status?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionIntentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submittedTransaction"]>

  export type SubmittedTransactionSelectScalar = {
    transactionId?: boolean
    transactionIntent?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type SubmittedTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionIntentDefaultArgs<ExtArgs>
  }
  export type SubmittedTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionIntentDefaultArgs<ExtArgs>
  }

  export type $SubmittedTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubmittedTransaction"
    objects: {
      transaction: Prisma.$TransactionIntentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      transactionId: string
      transactionIntent: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["submittedTransaction"]>
    composites: {}
  }

  type SubmittedTransactionGetPayload<S extends boolean | null | undefined | SubmittedTransactionDefaultArgs> = $Result.GetResult<Prisma.$SubmittedTransactionPayload, S>

  type SubmittedTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubmittedTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubmittedTransactionCountAggregateInputType | true
    }

  export interface SubmittedTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubmittedTransaction'], meta: { name: 'SubmittedTransaction' } }
    /**
     * Find zero or one SubmittedTransaction that matches the filter.
     * @param {SubmittedTransactionFindUniqueArgs} args - Arguments to find a SubmittedTransaction
     * @example
     * // Get one SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SubmittedTransactionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionFindUniqueArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SubmittedTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubmittedTransactionFindUniqueOrThrowArgs} args - Arguments to find a SubmittedTransaction
     * @example
     * // Get one SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SubmittedTransactionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SubmittedTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionFindFirstArgs} args - Arguments to find a SubmittedTransaction
     * @example
     * // Get one SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SubmittedTransactionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionFindFirstArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SubmittedTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionFindFirstOrThrowArgs} args - Arguments to find a SubmittedTransaction
     * @example
     * // Get one SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SubmittedTransactionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SubmittedTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubmittedTransactions
     * const submittedTransactions = await prisma.submittedTransaction.findMany()
     * 
     * // Get first 10 SubmittedTransactions
     * const submittedTransactions = await prisma.submittedTransaction.findMany({ take: 10 })
     * 
     * // Only select the `transactionId`
     * const submittedTransactionWithTransactionIdOnly = await prisma.submittedTransaction.findMany({ select: { transactionId: true } })
     * 
    **/
    findMany<T extends SubmittedTransactionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SubmittedTransaction.
     * @param {SubmittedTransactionCreateArgs} args - Arguments to create a SubmittedTransaction.
     * @example
     * // Create one SubmittedTransaction
     * const SubmittedTransaction = await prisma.submittedTransaction.create({
     *   data: {
     *     // ... data to create a SubmittedTransaction
     *   }
     * })
     * 
    **/
    create<T extends SubmittedTransactionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionCreateArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SubmittedTransactions.
     * @param {SubmittedTransactionCreateManyArgs} args - Arguments to create many SubmittedTransactions.
     * @example
     * // Create many SubmittedTransactions
     * const submittedTransaction = await prisma.submittedTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends SubmittedTransactionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubmittedTransactions and returns the data saved in the database.
     * @param {SubmittedTransactionCreateManyAndReturnArgs} args - Arguments to create many SubmittedTransactions.
     * @example
     * // Create many SubmittedTransactions
     * const submittedTransaction = await prisma.submittedTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubmittedTransactions and only return the `transactionId`
     * const submittedTransactionWithTransactionIdOnly = await prisma.submittedTransaction.createManyAndReturn({ 
     *   select: { transactionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends SubmittedTransactionCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a SubmittedTransaction.
     * @param {SubmittedTransactionDeleteArgs} args - Arguments to delete one SubmittedTransaction.
     * @example
     * // Delete one SubmittedTransaction
     * const SubmittedTransaction = await prisma.submittedTransaction.delete({
     *   where: {
     *     // ... filter to delete one SubmittedTransaction
     *   }
     * })
     * 
    **/
    delete<T extends SubmittedTransactionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionDeleteArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SubmittedTransaction.
     * @param {SubmittedTransactionUpdateArgs} args - Arguments to update one SubmittedTransaction.
     * @example
     * // Update one SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SubmittedTransactionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionUpdateArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SubmittedTransactions.
     * @param {SubmittedTransactionDeleteManyArgs} args - Arguments to filter SubmittedTransactions to delete.
     * @example
     * // Delete a few SubmittedTransactions
     * const { count } = await prisma.submittedTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SubmittedTransactionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubmittedTransactionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmittedTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubmittedTransactions
     * const submittedTransaction = await prisma.submittedTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SubmittedTransactionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SubmittedTransaction.
     * @param {SubmittedTransactionUpsertArgs} args - Arguments to update or create a SubmittedTransaction.
     * @example
     * // Update or create a SubmittedTransaction
     * const submittedTransaction = await prisma.submittedTransaction.upsert({
     *   create: {
     *     // ... data to create a SubmittedTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubmittedTransaction we want to update
     *   }
     * })
    **/
    upsert<T extends SubmittedTransactionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SubmittedTransactionUpsertArgs<ExtArgs>>
    ): Prisma__SubmittedTransactionClient<$Result.GetResult<Prisma.$SubmittedTransactionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SubmittedTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionCountArgs} args - Arguments to filter SubmittedTransactions to count.
     * @example
     * // Count the number of SubmittedTransactions
     * const count = await prisma.submittedTransaction.count({
     *   where: {
     *     // ... the filter for the SubmittedTransactions we want to count
     *   }
     * })
    **/
    count<T extends SubmittedTransactionCountArgs>(
      args?: Subset<T, SubmittedTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmittedTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubmittedTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmittedTransactionAggregateArgs>(args: Subset<T, SubmittedTransactionAggregateArgs>): Prisma.PrismaPromise<GetSubmittedTransactionAggregateType<T>>

    /**
     * Group by SubmittedTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmittedTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmittedTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmittedTransactionGroupByArgs['orderBy'] }
        : { orderBy?: SubmittedTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmittedTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmittedTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubmittedTransaction model
   */
  readonly fields: SubmittedTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubmittedTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmittedTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    transaction<T extends TransactionIntentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionIntentDefaultArgs<ExtArgs>>): Prisma__TransactionIntentClient<$Result.GetResult<Prisma.$TransactionIntentPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SubmittedTransaction model
   */ 
  interface SubmittedTransactionFieldRefs {
    readonly transactionId: FieldRef<"SubmittedTransaction", 'String'>
    readonly transactionIntent: FieldRef<"SubmittedTransaction", 'String'>
    readonly status: FieldRef<"SubmittedTransaction", 'String'>
    readonly createdAt: FieldRef<"SubmittedTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubmittedTransaction findUnique
   */
  export type SubmittedTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedTransaction to fetch.
     */
    where: SubmittedTransactionWhereUniqueInput
  }

  /**
   * SubmittedTransaction findUniqueOrThrow
   */
  export type SubmittedTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedTransaction to fetch.
     */
    where: SubmittedTransactionWhereUniqueInput
  }

  /**
   * SubmittedTransaction findFirst
   */
  export type SubmittedTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedTransaction to fetch.
     */
    where?: SubmittedTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedTransactions to fetch.
     */
    orderBy?: SubmittedTransactionOrderByWithRelationInput | SubmittedTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmittedTransactions.
     */
    cursor?: SubmittedTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmittedTransactions.
     */
    distinct?: SubmittedTransactionScalarFieldEnum | SubmittedTransactionScalarFieldEnum[]
  }

  /**
   * SubmittedTransaction findFirstOrThrow
   */
  export type SubmittedTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedTransaction to fetch.
     */
    where?: SubmittedTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedTransactions to fetch.
     */
    orderBy?: SubmittedTransactionOrderByWithRelationInput | SubmittedTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmittedTransactions.
     */
    cursor?: SubmittedTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmittedTransactions.
     */
    distinct?: SubmittedTransactionScalarFieldEnum | SubmittedTransactionScalarFieldEnum[]
  }

  /**
   * SubmittedTransaction findMany
   */
  export type SubmittedTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SubmittedTransactions to fetch.
     */
    where?: SubmittedTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmittedTransactions to fetch.
     */
    orderBy?: SubmittedTransactionOrderByWithRelationInput | SubmittedTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubmittedTransactions.
     */
    cursor?: SubmittedTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmittedTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmittedTransactions.
     */
    skip?: number
    distinct?: SubmittedTransactionScalarFieldEnum | SubmittedTransactionScalarFieldEnum[]
  }

  /**
   * SubmittedTransaction create
   */
  export type SubmittedTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a SubmittedTransaction.
     */
    data: XOR<SubmittedTransactionCreateInput, SubmittedTransactionUncheckedCreateInput>
  }

  /**
   * SubmittedTransaction createMany
   */
  export type SubmittedTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubmittedTransactions.
     */
    data: SubmittedTransactionCreateManyInput | SubmittedTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubmittedTransaction createManyAndReturn
   */
  export type SubmittedTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SubmittedTransactions.
     */
    data: SubmittedTransactionCreateManyInput | SubmittedTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubmittedTransaction update
   */
  export type SubmittedTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a SubmittedTransaction.
     */
    data: XOR<SubmittedTransactionUpdateInput, SubmittedTransactionUncheckedUpdateInput>
    /**
     * Choose, which SubmittedTransaction to update.
     */
    where: SubmittedTransactionWhereUniqueInput
  }

  /**
   * SubmittedTransaction updateMany
   */
  export type SubmittedTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubmittedTransactions.
     */
    data: XOR<SubmittedTransactionUpdateManyMutationInput, SubmittedTransactionUncheckedUpdateManyInput>
    /**
     * Filter which SubmittedTransactions to update
     */
    where?: SubmittedTransactionWhereInput
  }

  /**
   * SubmittedTransaction upsert
   */
  export type SubmittedTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the SubmittedTransaction to update in case it exists.
     */
    where: SubmittedTransactionWhereUniqueInput
    /**
     * In case the SubmittedTransaction found by the `where` argument doesn't exist, create a new SubmittedTransaction with this data.
     */
    create: XOR<SubmittedTransactionCreateInput, SubmittedTransactionUncheckedCreateInput>
    /**
     * In case the SubmittedTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmittedTransactionUpdateInput, SubmittedTransactionUncheckedUpdateInput>
  }

  /**
   * SubmittedTransaction delete
   */
  export type SubmittedTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
    /**
     * Filter which SubmittedTransaction to delete.
     */
    where: SubmittedTransactionWhereUniqueInput
  }

  /**
   * SubmittedTransaction deleteMany
   */
  export type SubmittedTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmittedTransactions to delete
     */
    where?: SubmittedTransactionWhereInput
  }

  /**
   * SubmittedTransaction without action
   */
  export type SubmittedTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmittedTransaction
     */
    select?: SubmittedTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmittedTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Config
   */

  export type AggregateConfig = {
    _count: ConfigCountAggregateOutputType | null
    _min: ConfigMinAggregateOutputType | null
    _max: ConfigMaxAggregateOutputType | null
  }

  export type ConfigMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type ConfigMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type ConfigCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type ConfigMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type ConfigMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type ConfigCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type ConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Config to aggregate.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configs
    **/
    _count?: true | ConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigMaxAggregateInputType
  }

  export type GetConfigAggregateType<T extends ConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfig[P]>
      : GetScalarType<T[P], AggregateConfig[P]>
  }




  export type ConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigWhereInput
    orderBy?: ConfigOrderByWithAggregationInput | ConfigOrderByWithAggregationInput[]
    by: ConfigScalarFieldEnum[] | ConfigScalarFieldEnum
    having?: ConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigCountAggregateInputType | true
    _min?: ConfigMinAggregateInputType
    _max?: ConfigMaxAggregateInputType
  }

  export type ConfigGroupByOutputType = {
    key: string
    value: string
    _count: ConfigCountAggregateOutputType | null
    _min: ConfigMinAggregateOutputType | null
    _max: ConfigMaxAggregateOutputType | null
  }

  type GetConfigGroupByPayload<T extends ConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigGroupByOutputType[P]>
        }
      >
    >


  export type ConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["config"]>

  export type ConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["config"]>

  export type ConfigSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $ConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Config"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["config"]>
    composites: {}
  }

  type ConfigGetPayload<S extends boolean | null | undefined | ConfigDefaultArgs> = $Result.GetResult<Prisma.$ConfigPayload, S>

  type ConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConfigCountAggregateInputType | true
    }

  export interface ConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Config'], meta: { name: 'Config' } }
    /**
     * Find zero or one Config that matches the filter.
     * @param {ConfigFindUniqueArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ConfigFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigFindUniqueArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Config that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConfigFindUniqueOrThrowArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ConfigFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindFirstArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ConfigFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigFindFirstArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindFirstOrThrowArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ConfigFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configs
     * const configs = await prisma.config.findMany()
     * 
     * // Get first 10 Configs
     * const configs = await prisma.config.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const configWithKeyOnly = await prisma.config.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends ConfigFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Config.
     * @param {ConfigCreateArgs} args - Arguments to create a Config.
     * @example
     * // Create one Config
     * const Config = await prisma.config.create({
     *   data: {
     *     // ... data to create a Config
     *   }
     * })
     * 
    **/
    create<T extends ConfigCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigCreateArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Configs.
     * @param {ConfigCreateManyArgs} args - Arguments to create many Configs.
     * @example
     * // Create many Configs
     * const config = await prisma.config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ConfigCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configs and returns the data saved in the database.
     * @param {ConfigCreateManyAndReturnArgs} args - Arguments to create many Configs.
     * @example
     * // Create many Configs
     * const config = await prisma.config.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configs and only return the `key`
     * const configWithKeyOnly = await prisma.config.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ConfigCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Config.
     * @param {ConfigDeleteArgs} args - Arguments to delete one Config.
     * @example
     * // Delete one Config
     * const Config = await prisma.config.delete({
     *   where: {
     *     // ... filter to delete one Config
     *   }
     * })
     * 
    **/
    delete<T extends ConfigDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigDeleteArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Config.
     * @param {ConfigUpdateArgs} args - Arguments to update one Config.
     * @example
     * // Update one Config
     * const config = await prisma.config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ConfigUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigUpdateArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Configs.
     * @param {ConfigDeleteManyArgs} args - Arguments to filter Configs to delete.
     * @example
     * // Delete a few Configs
     * const { count } = await prisma.config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ConfigDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ConfigDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configs
     * const config = await prisma.config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ConfigUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Config.
     * @param {ConfigUpsertArgs} args - Arguments to update or create a Config.
     * @example
     * // Update or create a Config
     * const config = await prisma.config.upsert({
     *   create: {
     *     // ... data to create a Config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Config we want to update
     *   }
     * })
    **/
    upsert<T extends ConfigUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ConfigUpsertArgs<ExtArgs>>
    ): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigCountArgs} args - Arguments to filter Configs to count.
     * @example
     * // Count the number of Configs
     * const count = await prisma.config.count({
     *   where: {
     *     // ... the filter for the Configs we want to count
     *   }
     * })
    **/
    count<T extends ConfigCountArgs>(
      args?: Subset<T, ConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfigAggregateArgs>(args: Subset<T, ConfigAggregateArgs>): Prisma.PrismaPromise<GetConfigAggregateType<T>>

    /**
     * Group by Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigGroupByArgs['orderBy'] }
        : { orderBy?: ConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Config model
   */
  readonly fields: ConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Config model
   */ 
  interface ConfigFieldRefs {
    readonly key: FieldRef<"Config", 'String'>
    readonly value: FieldRef<"Config", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Config findUnique
   */
  export type ConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config findUniqueOrThrow
   */
  export type ConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config findFirst
   */
  export type ConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configs.
     */
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config findFirstOrThrow
   */
  export type ConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configs.
     */
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config findMany
   */
  export type ConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Configs to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config create
   */
  export type ConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a Config.
     */
    data: XOR<ConfigCreateInput, ConfigUncheckedCreateInput>
  }

  /**
   * Config createMany
   */
  export type ConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configs.
     */
    data: ConfigCreateManyInput | ConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Config createManyAndReturn
   */
  export type ConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Configs.
     */
    data: ConfigCreateManyInput | ConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Config update
   */
  export type ConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a Config.
     */
    data: XOR<ConfigUpdateInput, ConfigUncheckedUpdateInput>
    /**
     * Choose, which Config to update.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config updateMany
   */
  export type ConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configs.
     */
    data: XOR<ConfigUpdateManyMutationInput, ConfigUncheckedUpdateManyInput>
    /**
     * Filter which Configs to update
     */
    where?: ConfigWhereInput
  }

  /**
   * Config upsert
   */
  export type ConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the Config to update in case it exists.
     */
    where: ConfigWhereUniqueInput
    /**
     * In case the Config found by the `where` argument doesn't exist, create a new Config with this data.
     */
    create: XOR<ConfigCreateInput, ConfigUncheckedCreateInput>
    /**
     * In case the Config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigUpdateInput, ConfigUncheckedUpdateInput>
  }

  /**
   * Config delete
   */
  export type ConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter which Config to delete.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config deleteMany
   */
  export type ConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configs to delete
     */
    where?: ConfigWhereInput
  }

  /**
   * Config without action
   */
  export type ConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    type: 'type'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const ReferralScalarFieldEnum: {
    eventId: 'eventId',
    userId: 'userId',
    action: 'action',
    xrdValue: 'xrdValue'
  };

  export type ReferralScalarFieldEnum = (typeof ReferralScalarFieldEnum)[keyof typeof ReferralScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    challenge: 'challenge',
    createdAt: 'createdAt'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const EventScalarFieldEnum: {
    transactionId: 'transactionId',
    id: 'id',
    userId: 'userId',
    questId: 'questId',
    status: 'status',
    createdAt: 'createdAt',
    error: 'error',
    data: 'data'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    seenAt: 'seenAt',
    data: 'data'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const LoginAttemptScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type LoginAttemptScalarFieldEnum = (typeof LoginAttemptScalarFieldEnum)[keyof typeof LoginAttemptScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    notificationId: 'notificationId',
    userId: 'userId',
    seenAt: 'seenAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const CompletedQuestRequirementScalarFieldEnum: {
    questId: 'questId',
    userId: 'userId',
    requirementId: 'requirementId',
    createdAt: 'createdAt'
  };

  export type CompletedQuestRequirementScalarFieldEnum = (typeof CompletedQuestRequirementScalarFieldEnum)[keyof typeof CompletedQuestRequirementScalarFieldEnum]


  export const QuestProgressScalarFieldEnum: {
    questId: 'questId',
    userId: 'userId',
    status: 'status'
  };

  export type QuestProgressScalarFieldEnum = (typeof QuestProgressScalarFieldEnum)[keyof typeof QuestProgressScalarFieldEnum]


  export const SavedProgressScalarFieldEnum: {
    userId: 'userId',
    questId: 'questId',
    progress: 'progress'
  };

  export type SavedProgressScalarFieldEnum = (typeof SavedProgressScalarFieldEnum)[keyof typeof SavedProgressScalarFieldEnum]


  export const AuditScalarFieldEnum: {
    transactionId: 'transactionId',
    userId: 'userId',
    date: 'date',
    type: 'type',
    xrdUsdValue: 'xrdUsdValue',
    xrdPrice: 'xrdPrice',
    data: 'data'
  };

  export type AuditScalarFieldEnum = (typeof AuditScalarFieldEnum)[keyof typeof AuditScalarFieldEnum]


  export const TransactionIntentScalarFieldEnum: {
    discriminator: 'discriminator',
    status: 'status',
    createdAt: 'createdAt',
    error: 'error',
    userId: 'userId',
    data: 'data',
    batchId: 'batchId'
  };

  export type TransactionIntentScalarFieldEnum = (typeof TransactionIntentScalarFieldEnum)[keyof typeof TransactionIntentScalarFieldEnum]


  export const BatchedTransactionIntentScalarFieldEnum: {
    id: 'id',
    status: 'status',
    createdAt: 'createdAt',
    error: 'error'
  };

  export type BatchedTransactionIntentScalarFieldEnum = (typeof BatchedTransactionIntentScalarFieldEnum)[keyof typeof BatchedTransactionIntentScalarFieldEnum]


  export const SubmittedTransactionScalarFieldEnum: {
    transactionId: 'transactionId',
    transactionIntent: 'transactionIntent',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type SubmittedTransactionScalarFieldEnum = (typeof SubmittedTransactionScalarFieldEnum)[keyof typeof SubmittedTransactionScalarFieldEnum]


  export const ConfigScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type ConfigScalarFieldEnum = (typeof ConfigScalarFieldEnum)[keyof typeof ConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'ImageType'
   */
  export type EnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType'>
    


  /**
   * Reference to a field of type 'ImageType[]'
   */
  export type ListEnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType[]'>
    


  /**
   * Reference to a field of type 'ReferralAction'
   */
  export type EnumReferralActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferralAction'>
    


  /**
   * Reference to a field of type 'ReferralAction[]'
   */
  export type ListEnumReferralActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReferralAction[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'LoginAttemptType'
   */
  export type EnumLoginAttemptTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoginAttemptType'>
    


  /**
   * Reference to a field of type 'LoginAttemptType[]'
   */
  export type ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoginAttemptType[]'>
    


  /**
   * Reference to a field of type 'QuestStatus'
   */
  export type EnumQuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestStatus'>
    


  /**
   * Reference to a field of type 'QuestStatus[]'
   */
  export type ListEnumQuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestStatus[]'>
    


  /**
   * Reference to a field of type 'AuditType'
   */
  export type EnumAuditTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditType'>
    


  /**
   * Reference to a field of type 'AuditType[]'
   */
  export type ListEnumAuditTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditType[]'>
    


  /**
   * Reference to a field of type 'TransactionIntentStatus'
   */
  export type EnumTransactionIntentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionIntentStatus'>
    


  /**
   * Reference to a field of type 'TransactionIntentStatus[]'
   */
  export type ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionIntentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    identityAddress?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    accountAddress?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    type?: EnumUserTypeFilter<"User"> | $Enums.UserType
    referralCode?: StringFilter<"User"> | string
    referredBy?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    referredByUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    events?: EventListRelationFilter
    messages?: MessageListRelationFilter
    completedQuestRequirements?: CompletedQuestRequirementListRelationFilter
    savedProgress?: XOR<SavedProgressNullableRelationFilter, SavedProgressWhereInput> | null
    auditLogs?: AuditListRelationFilter
    questProgress?: QuestProgressListRelationFilter
    referredUsers?: UserListRelationFilter
    transactions?: TransactionIntentListRelationFilter
    referals?: ReferralListRelationFilter
    loginAttempts?: LoginAttemptListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    createdAt?: SortOrder
    accountAddress?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    type?: SortOrder
    referralCode?: SortOrder
    referredBy?: SortOrderInput | SortOrder
    status?: SortOrder
    referredByUser?: UserOrderByWithRelationInput
    events?: EventOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    completedQuestRequirements?: CompletedQuestRequirementOrderByRelationAggregateInput
    savedProgress?: SavedProgressOrderByWithRelationInput
    auditLogs?: AuditOrderByRelationAggregateInput
    questProgress?: QuestProgressOrderByRelationAggregateInput
    referredUsers?: UserOrderByRelationAggregateInput
    transactions?: TransactionIntentOrderByRelationAggregateInput
    referals?: ReferralOrderByRelationAggregateInput
    loginAttempts?: LoginAttemptOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    identityAddress?: string
    referralCode?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    accountAddress?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    type?: EnumUserTypeFilter<"User"> | $Enums.UserType
    referredBy?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    referredByUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    events?: EventListRelationFilter
    messages?: MessageListRelationFilter
    completedQuestRequirements?: CompletedQuestRequirementListRelationFilter
    savedProgress?: XOR<SavedProgressNullableRelationFilter, SavedProgressWhereInput> | null
    auditLogs?: AuditListRelationFilter
    questProgress?: QuestProgressListRelationFilter
    referredUsers?: UserListRelationFilter
    transactions?: TransactionIntentListRelationFilter
    referals?: ReferralListRelationFilter
    loginAttempts?: LoginAttemptListRelationFilter
  }, "id" | "identityAddress" | "referralCode">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    createdAt?: SortOrder
    accountAddress?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    type?: SortOrder
    referralCode?: SortOrder
    referredBy?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    identityAddress?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    accountAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    type?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    referralCode?: StringWithAggregatesFilter<"User"> | string
    referredBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
  }

  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: StringFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    type?: EnumImageTypeFilter<"Image"> | $Enums.ImageType
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    url?: StringFilter<"Image"> | string
    type?: EnumImageTypeFilter<"Image"> | $Enums.ImageType
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Image"> | string
    url?: StringWithAggregatesFilter<"Image"> | string
    type?: EnumImageTypeWithAggregatesFilter<"Image"> | $Enums.ImageType
  }

  export type ReferralWhereInput = {
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    eventId?: StringFilter<"Referral"> | string
    userId?: StringFilter<"Referral"> | string
    action?: EnumReferralActionFilter<"Referral"> | $Enums.ReferralAction
    xrdValue?: DecimalFilter<"Referral"> | Decimal | DecimalJsLike | number | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReferralOrderByWithRelationInput = {
    eventId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    xrdValue?: SortOrder
    event?: EventOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReferralWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ReferralWhereInput | ReferralWhereInput[]
    OR?: ReferralWhereInput[]
    NOT?: ReferralWhereInput | ReferralWhereInput[]
    userId?: StringFilter<"Referral"> | string
    action?: EnumReferralActionFilter<"Referral"> | $Enums.ReferralAction
    xrdValue?: DecimalFilter<"Referral"> | Decimal | DecimalJsLike | number | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "eventId" | "eventId">

  export type ReferralOrderByWithAggregationInput = {
    eventId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    xrdValue?: SortOrder
    _count?: ReferralCountOrderByAggregateInput
    _avg?: ReferralAvgOrderByAggregateInput
    _max?: ReferralMaxOrderByAggregateInput
    _min?: ReferralMinOrderByAggregateInput
    _sum?: ReferralSumOrderByAggregateInput
  }

  export type ReferralScalarWhereWithAggregatesInput = {
    AND?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    OR?: ReferralScalarWhereWithAggregatesInput[]
    NOT?: ReferralScalarWhereWithAggregatesInput | ReferralScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"Referral"> | string
    userId?: StringWithAggregatesFilter<"Referral"> | string
    action?: EnumReferralActionWithAggregatesFilter<"Referral"> | $Enums.ReferralAction
    xrdValue?: DecimalWithAggregatesFilter<"Referral"> | Decimal | DecimalJsLike | number | string
  }

  export type ChallengeWhereInput = {
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    challenge?: StringFilter<"Challenge"> | string
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
  }

  export type ChallengeOrderByWithRelationInput = {
    challenge?: SortOrder
    createdAt?: SortOrder
  }

  export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    challenge?: string
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
  }, "challenge">

  export type ChallengeOrderByWithAggregationInput = {
    challenge?: SortOrder
    createdAt?: SortOrder
    _count?: ChallengeCountOrderByAggregateInput
    _max?: ChallengeMaxOrderByAggregateInput
    _min?: ChallengeMinOrderByAggregateInput
  }

  export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    OR?: ChallengeScalarWhereWithAggregatesInput[]
    NOT?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    challenge?: StringWithAggregatesFilter<"Challenge"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    transactionId?: StringFilter<"Event"> | string
    id?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
    questId?: StringNullableFilter<"Event"> | string | null
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeFilter<"Event"> | Date | string
    error?: StringNullableFilter<"Event"> | string | null
    data?: JsonFilter<"Event">
    user?: XOR<UserRelationFilter, UserWhereInput>
    referral?: ReferralListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    transactionId?: SortOrder
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    data?: SortOrder
    user?: UserOrderByWithRelationInput
    referral?: ReferralOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    transactionId?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
    questId?: StringNullableFilter<"Event"> | string | null
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeFilter<"Event"> | Date | string
    error?: StringNullableFilter<"Event"> | string | null
    data?: JsonFilter<"Event">
    user?: XOR<UserRelationFilter, UserWhereInput>
    referral?: ReferralListRelationFilter
  }, "transactionId">

  export type EventOrderByWithAggregationInput = {
    transactionId?: SortOrder
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    data?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    transactionId?: StringWithAggregatesFilter<"Event"> | string
    id?: StringWithAggregatesFilter<"Event"> | string
    userId?: StringWithAggregatesFilter<"Event"> | string
    questId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    status?: EnumEventStatusWithAggregatesFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    error?: StringNullableWithAggregatesFilter<"Event"> | string | null
    data?: JsonWithAggregatesFilter<"Event">
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    userId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    seenAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    data?: JsonFilter<"Message">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    data?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    userId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    seenAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    data?: JsonFilter<"Message">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    data?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    userId?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    seenAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    data?: JsonWithAggregatesFilter<"Message">
  }

  export type LoginAttemptWhereInput = {
    AND?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    OR?: LoginAttemptWhereInput[]
    NOT?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    id?: IntFilter<"LoginAttempt"> | number
    userId?: StringFilter<"LoginAttempt"> | string
    type?: EnumLoginAttemptTypeFilter<"LoginAttempt"> | $Enums.LoginAttemptType
    createdAt?: DateTimeFilter<"LoginAttempt"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type LoginAttemptOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LoginAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    OR?: LoginAttemptWhereInput[]
    NOT?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    userId?: StringFilter<"LoginAttempt"> | string
    type?: EnumLoginAttemptTypeFilter<"LoginAttempt"> | $Enums.LoginAttemptType
    createdAt?: DateTimeFilter<"LoginAttempt"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type LoginAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: LoginAttemptCountOrderByAggregateInput
    _avg?: LoginAttemptAvgOrderByAggregateInput
    _max?: LoginAttemptMaxOrderByAggregateInput
    _min?: LoginAttemptMinOrderByAggregateInput
    _sum?: LoginAttemptSumOrderByAggregateInput
  }

  export type LoginAttemptScalarWhereWithAggregatesInput = {
    AND?: LoginAttemptScalarWhereWithAggregatesInput | LoginAttemptScalarWhereWithAggregatesInput[]
    OR?: LoginAttemptScalarWhereWithAggregatesInput[]
    NOT?: LoginAttemptScalarWhereWithAggregatesInput | LoginAttemptScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LoginAttempt"> | number
    userId?: StringWithAggregatesFilter<"LoginAttempt"> | string
    type?: EnumLoginAttemptTypeWithAggregatesFilter<"LoginAttempt"> | $Enums.LoginAttemptType
    createdAt?: DateTimeWithAggregatesFilter<"LoginAttempt"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    notificationId?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    seenAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
  }

  export type NotificationOrderByWithRelationInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    seenAt?: SortOrderInput | SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    notificationId_userId?: NotificationNotificationIdUserIdCompoundUniqueInput
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    notificationId?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    seenAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
  }, "notificationId_userId">

  export type NotificationOrderByWithAggregationInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    notificationId?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    seenAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
  }

  export type CompletedQuestRequirementWhereInput = {
    AND?: CompletedQuestRequirementWhereInput | CompletedQuestRequirementWhereInput[]
    OR?: CompletedQuestRequirementWhereInput[]
    NOT?: CompletedQuestRequirementWhereInput | CompletedQuestRequirementWhereInput[]
    questId?: StringFilter<"CompletedQuestRequirement"> | string
    userId?: StringFilter<"CompletedQuestRequirement"> | string
    requirementId?: StringFilter<"CompletedQuestRequirement"> | string
    createdAt?: DateTimeFilter<"CompletedQuestRequirement"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CompletedQuestRequirementOrderByWithRelationInput = {
    questId?: SortOrder
    userId?: SortOrder
    requirementId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CompletedQuestRequirementWhereUniqueInput = Prisma.AtLeast<{
    questId_userId_requirementId?: CompletedQuestRequirementQuestIdUserIdRequirementIdCompoundUniqueInput
    AND?: CompletedQuestRequirementWhereInput | CompletedQuestRequirementWhereInput[]
    OR?: CompletedQuestRequirementWhereInput[]
    NOT?: CompletedQuestRequirementWhereInput | CompletedQuestRequirementWhereInput[]
    questId?: StringFilter<"CompletedQuestRequirement"> | string
    userId?: StringFilter<"CompletedQuestRequirement"> | string
    requirementId?: StringFilter<"CompletedQuestRequirement"> | string
    createdAt?: DateTimeFilter<"CompletedQuestRequirement"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "questId_userId_requirementId">

  export type CompletedQuestRequirementOrderByWithAggregationInput = {
    questId?: SortOrder
    userId?: SortOrder
    requirementId?: SortOrder
    createdAt?: SortOrder
    _count?: CompletedQuestRequirementCountOrderByAggregateInput
    _max?: CompletedQuestRequirementMaxOrderByAggregateInput
    _min?: CompletedQuestRequirementMinOrderByAggregateInput
  }

  export type CompletedQuestRequirementScalarWhereWithAggregatesInput = {
    AND?: CompletedQuestRequirementScalarWhereWithAggregatesInput | CompletedQuestRequirementScalarWhereWithAggregatesInput[]
    OR?: CompletedQuestRequirementScalarWhereWithAggregatesInput[]
    NOT?: CompletedQuestRequirementScalarWhereWithAggregatesInput | CompletedQuestRequirementScalarWhereWithAggregatesInput[]
    questId?: StringWithAggregatesFilter<"CompletedQuestRequirement"> | string
    userId?: StringWithAggregatesFilter<"CompletedQuestRequirement"> | string
    requirementId?: StringWithAggregatesFilter<"CompletedQuestRequirement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompletedQuestRequirement"> | Date | string
  }

  export type QuestProgressWhereInput = {
    AND?: QuestProgressWhereInput | QuestProgressWhereInput[]
    OR?: QuestProgressWhereInput[]
    NOT?: QuestProgressWhereInput | QuestProgressWhereInput[]
    questId?: StringFilter<"QuestProgress"> | string
    userId?: StringFilter<"QuestProgress"> | string
    status?: EnumQuestStatusFilter<"QuestProgress"> | $Enums.QuestStatus
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type QuestProgressOrderByWithRelationInput = {
    questId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type QuestProgressWhereUniqueInput = Prisma.AtLeast<{
    questId_userId?: QuestProgressQuestIdUserIdCompoundUniqueInput
    AND?: QuestProgressWhereInput | QuestProgressWhereInput[]
    OR?: QuestProgressWhereInput[]
    NOT?: QuestProgressWhereInput | QuestProgressWhereInput[]
    questId?: StringFilter<"QuestProgress"> | string
    userId?: StringFilter<"QuestProgress"> | string
    status?: EnumQuestStatusFilter<"QuestProgress"> | $Enums.QuestStatus
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "questId_userId">

  export type QuestProgressOrderByWithAggregationInput = {
    questId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    _count?: QuestProgressCountOrderByAggregateInput
    _max?: QuestProgressMaxOrderByAggregateInput
    _min?: QuestProgressMinOrderByAggregateInput
  }

  export type QuestProgressScalarWhereWithAggregatesInput = {
    AND?: QuestProgressScalarWhereWithAggregatesInput | QuestProgressScalarWhereWithAggregatesInput[]
    OR?: QuestProgressScalarWhereWithAggregatesInput[]
    NOT?: QuestProgressScalarWhereWithAggregatesInput | QuestProgressScalarWhereWithAggregatesInput[]
    questId?: StringWithAggregatesFilter<"QuestProgress"> | string
    userId?: StringWithAggregatesFilter<"QuestProgress"> | string
    status?: EnumQuestStatusWithAggregatesFilter<"QuestProgress"> | $Enums.QuestStatus
  }

  export type SavedProgressWhereInput = {
    AND?: SavedProgressWhereInput | SavedProgressWhereInput[]
    OR?: SavedProgressWhereInput[]
    NOT?: SavedProgressWhereInput | SavedProgressWhereInput[]
    userId?: StringFilter<"SavedProgress"> | string
    questId?: StringFilter<"SavedProgress"> | string
    progress?: IntFilter<"SavedProgress"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SavedProgressOrderByWithRelationInput = {
    userId?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SavedProgressWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: SavedProgressWhereInput | SavedProgressWhereInput[]
    OR?: SavedProgressWhereInput[]
    NOT?: SavedProgressWhereInput | SavedProgressWhereInput[]
    questId?: StringFilter<"SavedProgress"> | string
    progress?: IntFilter<"SavedProgress"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "userId">

  export type SavedProgressOrderByWithAggregationInput = {
    userId?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
    _count?: SavedProgressCountOrderByAggregateInput
    _avg?: SavedProgressAvgOrderByAggregateInput
    _max?: SavedProgressMaxOrderByAggregateInput
    _min?: SavedProgressMinOrderByAggregateInput
    _sum?: SavedProgressSumOrderByAggregateInput
  }

  export type SavedProgressScalarWhereWithAggregatesInput = {
    AND?: SavedProgressScalarWhereWithAggregatesInput | SavedProgressScalarWhereWithAggregatesInput[]
    OR?: SavedProgressScalarWhereWithAggregatesInput[]
    NOT?: SavedProgressScalarWhereWithAggregatesInput | SavedProgressScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"SavedProgress"> | string
    questId?: StringWithAggregatesFilter<"SavedProgress"> | string
    progress?: IntWithAggregatesFilter<"SavedProgress"> | number
  }

  export type AuditWhereInput = {
    AND?: AuditWhereInput | AuditWhereInput[]
    OR?: AuditWhereInput[]
    NOT?: AuditWhereInput | AuditWhereInput[]
    transactionId?: StringFilter<"Audit"> | string
    userId?: StringFilter<"Audit"> | string
    date?: DateTimeFilter<"Audit"> | Date | string
    type?: EnumAuditTypeFilter<"Audit"> | $Enums.AuditType
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    data?: JsonFilter<"Audit">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AuditOrderByWithRelationInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
    data?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditWhereUniqueInput = Prisma.AtLeast<{
    transactionId?: string
    AND?: AuditWhereInput | AuditWhereInput[]
    OR?: AuditWhereInput[]
    NOT?: AuditWhereInput | AuditWhereInput[]
    userId?: StringFilter<"Audit"> | string
    date?: DateTimeFilter<"Audit"> | Date | string
    type?: EnumAuditTypeFilter<"Audit"> | $Enums.AuditType
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    data?: JsonFilter<"Audit">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "transactionId">

  export type AuditOrderByWithAggregationInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
    data?: SortOrder
    _count?: AuditCountOrderByAggregateInput
    _avg?: AuditAvgOrderByAggregateInput
    _max?: AuditMaxOrderByAggregateInput
    _min?: AuditMinOrderByAggregateInput
    _sum?: AuditSumOrderByAggregateInput
  }

  export type AuditScalarWhereWithAggregatesInput = {
    AND?: AuditScalarWhereWithAggregatesInput | AuditScalarWhereWithAggregatesInput[]
    OR?: AuditScalarWhereWithAggregatesInput[]
    NOT?: AuditScalarWhereWithAggregatesInput | AuditScalarWhereWithAggregatesInput[]
    transactionId?: StringWithAggregatesFilter<"Audit"> | string
    userId?: StringWithAggregatesFilter<"Audit"> | string
    date?: DateTimeWithAggregatesFilter<"Audit"> | Date | string
    type?: EnumAuditTypeWithAggregatesFilter<"Audit"> | $Enums.AuditType
    xrdUsdValue?: DecimalWithAggregatesFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalWithAggregatesFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    data?: JsonWithAggregatesFilter<"Audit">
  }

  export type TransactionIntentWhereInput = {
    AND?: TransactionIntentWhereInput | TransactionIntentWhereInput[]
    OR?: TransactionIntentWhereInput[]
    NOT?: TransactionIntentWhereInput | TransactionIntentWhereInput[]
    discriminator?: StringFilter<"TransactionIntent"> | string
    status?: EnumTransactionIntentStatusFilter<"TransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFilter<"TransactionIntent"> | Date | string
    error?: StringNullableFilter<"TransactionIntent"> | string | null
    userId?: StringFilter<"TransactionIntent"> | string
    data?: JsonNullableFilter<"TransactionIntent">
    batchId?: StringNullableFilter<"TransactionIntent"> | string | null
    transactions?: SubmittedTransactionListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
    batch?: XOR<BatchedTransactionIntentNullableRelationFilter, BatchedTransactionIntentWhereInput> | null
  }

  export type TransactionIntentOrderByWithRelationInput = {
    discriminator?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    userId?: SortOrder
    data?: SortOrderInput | SortOrder
    batchId?: SortOrderInput | SortOrder
    transactions?: SubmittedTransactionOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    batch?: BatchedTransactionIntentOrderByWithRelationInput
  }

  export type TransactionIntentWhereUniqueInput = Prisma.AtLeast<{
    discriminator?: string
    AND?: TransactionIntentWhereInput | TransactionIntentWhereInput[]
    OR?: TransactionIntentWhereInput[]
    NOT?: TransactionIntentWhereInput | TransactionIntentWhereInput[]
    status?: EnumTransactionIntentStatusFilter<"TransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFilter<"TransactionIntent"> | Date | string
    error?: StringNullableFilter<"TransactionIntent"> | string | null
    userId?: StringFilter<"TransactionIntent"> | string
    data?: JsonNullableFilter<"TransactionIntent">
    batchId?: StringNullableFilter<"TransactionIntent"> | string | null
    transactions?: SubmittedTransactionListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
    batch?: XOR<BatchedTransactionIntentNullableRelationFilter, BatchedTransactionIntentWhereInput> | null
  }, "discriminator">

  export type TransactionIntentOrderByWithAggregationInput = {
    discriminator?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    userId?: SortOrder
    data?: SortOrderInput | SortOrder
    batchId?: SortOrderInput | SortOrder
    _count?: TransactionIntentCountOrderByAggregateInput
    _max?: TransactionIntentMaxOrderByAggregateInput
    _min?: TransactionIntentMinOrderByAggregateInput
  }

  export type TransactionIntentScalarWhereWithAggregatesInput = {
    AND?: TransactionIntentScalarWhereWithAggregatesInput | TransactionIntentScalarWhereWithAggregatesInput[]
    OR?: TransactionIntentScalarWhereWithAggregatesInput[]
    NOT?: TransactionIntentScalarWhereWithAggregatesInput | TransactionIntentScalarWhereWithAggregatesInput[]
    discriminator?: StringWithAggregatesFilter<"TransactionIntent"> | string
    status?: EnumTransactionIntentStatusWithAggregatesFilter<"TransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeWithAggregatesFilter<"TransactionIntent"> | Date | string
    error?: StringNullableWithAggregatesFilter<"TransactionIntent"> | string | null
    userId?: StringWithAggregatesFilter<"TransactionIntent"> | string
    data?: JsonNullableWithAggregatesFilter<"TransactionIntent">
    batchId?: StringNullableWithAggregatesFilter<"TransactionIntent"> | string | null
  }

  export type BatchedTransactionIntentWhereInput = {
    AND?: BatchedTransactionIntentWhereInput | BatchedTransactionIntentWhereInput[]
    OR?: BatchedTransactionIntentWhereInput[]
    NOT?: BatchedTransactionIntentWhereInput | BatchedTransactionIntentWhereInput[]
    id?: StringFilter<"BatchedTransactionIntent"> | string
    status?: EnumTransactionIntentStatusFilter<"BatchedTransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFilter<"BatchedTransactionIntent"> | Date | string
    error?: StringNullableFilter<"BatchedTransactionIntent"> | string | null
    transactionIntents?: TransactionIntentListRelationFilter
  }

  export type BatchedTransactionIntentOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    transactionIntents?: TransactionIntentOrderByRelationAggregateInput
  }

  export type BatchedTransactionIntentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchedTransactionIntentWhereInput | BatchedTransactionIntentWhereInput[]
    OR?: BatchedTransactionIntentWhereInput[]
    NOT?: BatchedTransactionIntentWhereInput | BatchedTransactionIntentWhereInput[]
    status?: EnumTransactionIntentStatusFilter<"BatchedTransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFilter<"BatchedTransactionIntent"> | Date | string
    error?: StringNullableFilter<"BatchedTransactionIntent"> | string | null
    transactionIntents?: TransactionIntentListRelationFilter
  }, "id">

  export type BatchedTransactionIntentOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    _count?: BatchedTransactionIntentCountOrderByAggregateInput
    _max?: BatchedTransactionIntentMaxOrderByAggregateInput
    _min?: BatchedTransactionIntentMinOrderByAggregateInput
  }

  export type BatchedTransactionIntentScalarWhereWithAggregatesInput = {
    AND?: BatchedTransactionIntentScalarWhereWithAggregatesInput | BatchedTransactionIntentScalarWhereWithAggregatesInput[]
    OR?: BatchedTransactionIntentScalarWhereWithAggregatesInput[]
    NOT?: BatchedTransactionIntentScalarWhereWithAggregatesInput | BatchedTransactionIntentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BatchedTransactionIntent"> | string
    status?: EnumTransactionIntentStatusWithAggregatesFilter<"BatchedTransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeWithAggregatesFilter<"BatchedTransactionIntent"> | Date | string
    error?: StringNullableWithAggregatesFilter<"BatchedTransactionIntent"> | string | null
  }

  export type SubmittedTransactionWhereInput = {
    AND?: SubmittedTransactionWhereInput | SubmittedTransactionWhereInput[]
    OR?: SubmittedTransactionWhereInput[]
    NOT?: SubmittedTransactionWhereInput | SubmittedTransactionWhereInput[]
    transactionId?: StringFilter<"SubmittedTransaction"> | string
    transactionIntent?: StringFilter<"SubmittedTransaction"> | string
    status?: StringFilter<"SubmittedTransaction"> | string
    createdAt?: DateTimeFilter<"SubmittedTransaction"> | Date | string
    transaction?: XOR<TransactionIntentRelationFilter, TransactionIntentWhereInput>
  }

  export type SubmittedTransactionOrderByWithRelationInput = {
    transactionId?: SortOrder
    transactionIntent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    transaction?: TransactionIntentOrderByWithRelationInput
  }

  export type SubmittedTransactionWhereUniqueInput = Prisma.AtLeast<{
    transactionId?: string
    AND?: SubmittedTransactionWhereInput | SubmittedTransactionWhereInput[]
    OR?: SubmittedTransactionWhereInput[]
    NOT?: SubmittedTransactionWhereInput | SubmittedTransactionWhereInput[]
    transactionIntent?: StringFilter<"SubmittedTransaction"> | string
    status?: StringFilter<"SubmittedTransaction"> | string
    createdAt?: DateTimeFilter<"SubmittedTransaction"> | Date | string
    transaction?: XOR<TransactionIntentRelationFilter, TransactionIntentWhereInput>
  }, "transactionId">

  export type SubmittedTransactionOrderByWithAggregationInput = {
    transactionId?: SortOrder
    transactionIntent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: SubmittedTransactionCountOrderByAggregateInput
    _max?: SubmittedTransactionMaxOrderByAggregateInput
    _min?: SubmittedTransactionMinOrderByAggregateInput
  }

  export type SubmittedTransactionScalarWhereWithAggregatesInput = {
    AND?: SubmittedTransactionScalarWhereWithAggregatesInput | SubmittedTransactionScalarWhereWithAggregatesInput[]
    OR?: SubmittedTransactionScalarWhereWithAggregatesInput[]
    NOT?: SubmittedTransactionScalarWhereWithAggregatesInput | SubmittedTransactionScalarWhereWithAggregatesInput[]
    transactionId?: StringWithAggregatesFilter<"SubmittedTransaction"> | string
    transactionIntent?: StringWithAggregatesFilter<"SubmittedTransaction"> | string
    status?: StringWithAggregatesFilter<"SubmittedTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SubmittedTransaction"> | Date | string
  }

  export type ConfigWhereInput = {
    AND?: ConfigWhereInput | ConfigWhereInput[]
    OR?: ConfigWhereInput[]
    NOT?: ConfigWhereInput | ConfigWhereInput[]
    key?: StringFilter<"Config"> | string
    value?: StringFilter<"Config"> | string
  }

  export type ConfigOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ConfigWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: ConfigWhereInput | ConfigWhereInput[]
    OR?: ConfigWhereInput[]
    NOT?: ConfigWhereInput | ConfigWhereInput[]
    value?: StringFilter<"Config"> | string
  }, "key">

  export type ConfigOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: ConfigCountOrderByAggregateInput
    _max?: ConfigMaxOrderByAggregateInput
    _min?: ConfigMinOrderByAggregateInput
  }

  export type ConfigScalarWhereWithAggregatesInput = {
    AND?: ConfigScalarWhereWithAggregatesInput | ConfigScalarWhereWithAggregatesInput[]
    OR?: ConfigScalarWhereWithAggregatesInput[]
    NOT?: ConfigScalarWhereWithAggregatesInput | ConfigScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Config"> | string
    value?: StringWithAggregatesFilter<"Config"> | string
  }

  export type UserCreateInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
  }

  export type ImageCreateInput = {
    id: string
    url: string
    type: $Enums.ImageType
  }

  export type ImageUncheckedCreateInput = {
    id: string
    url: string
    type: $Enums.ImageType
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
  }

  export type ImageCreateManyInput = {
    id: string
    url: string
    type: $Enums.ImageType
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
  }

  export type ReferralCreateInput = {
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
    event: EventCreateNestedOneWithoutReferralInput
    user: UserCreateNestedOneWithoutReferalsInput
  }

  export type ReferralUncheckedCreateInput = {
    eventId: string
    userId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type ReferralUpdateInput = {
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    event?: EventUpdateOneRequiredWithoutReferralNestedInput
    user?: UserUpdateOneRequiredWithoutReferalsNestedInput
  }

  export type ReferralUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReferralCreateManyInput = {
    eventId: string
    userId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type ReferralUpdateManyMutationInput = {
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReferralUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ChallengeCreateInput = {
    challenge: string
    createdAt?: Date | string
  }

  export type ChallengeUncheckedCreateInput = {
    challenge: string
    createdAt?: Date | string
  }

  export type ChallengeUpdateInput = {
    challenge?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeUncheckedUpdateInput = {
    challenge?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeCreateManyInput = {
    challenge: string
    createdAt?: Date | string
  }

  export type ChallengeUpdateManyMutationInput = {
    challenge?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeUncheckedUpdateManyInput = {
    challenge?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    transactionId: string
    id: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutEventsInput
    referral?: ReferralCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    transactionId: string
    id: string
    userId: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    referral?: ReferralUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    transactionId: string
    id: string
    userId: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type EventUpdateManyMutationInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type EventUncheckedUpdateManyInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageCreateInput = {
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    userId: string
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageCreateManyInput = {
    id?: number
    userId: string
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type LoginAttemptCreateInput = {
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLoginAttemptsInput
  }

  export type LoginAttemptUncheckedCreateInput = {
    id?: number
    userId: string
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
  }

  export type LoginAttemptUpdateInput = {
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLoginAttemptsNestedInput
  }

  export type LoginAttemptUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptCreateManyInput = {
    id?: number
    userId: string
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
  }

  export type LoginAttemptUpdateManyMutationInput = {
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    notificationId: string
    userId: string
    seenAt?: Date | string | null
  }

  export type NotificationUncheckedCreateInput = {
    notificationId: string
    userId: string
    seenAt?: Date | string | null
  }

  export type NotificationUpdateInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationCreateManyInput = {
    notificationId: string
    userId: string
    seenAt?: Date | string | null
  }

  export type NotificationUpdateManyMutationInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUncheckedUpdateManyInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CompletedQuestRequirementCreateInput = {
    questId: string
    requirementId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCompletedQuestRequirementsInput
  }

  export type CompletedQuestRequirementUncheckedCreateInput = {
    questId: string
    userId: string
    requirementId: string
    createdAt?: Date | string
  }

  export type CompletedQuestRequirementUpdateInput = {
    questId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompletedQuestRequirementsNestedInput
  }

  export type CompletedQuestRequirementUncheckedUpdateInput = {
    questId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedQuestRequirementCreateManyInput = {
    questId: string
    userId: string
    requirementId: string
    createdAt?: Date | string
  }

  export type CompletedQuestRequirementUpdateManyMutationInput = {
    questId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedQuestRequirementUncheckedUpdateManyInput = {
    questId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestProgressCreateInput = {
    questId: string
    status?: $Enums.QuestStatus
    user: UserCreateNestedOneWithoutQuestProgressInput
  }

  export type QuestProgressUncheckedCreateInput = {
    questId: string
    userId: string
    status?: $Enums.QuestStatus
  }

  export type QuestProgressUpdateInput = {
    questId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
    user?: UserUpdateOneRequiredWithoutQuestProgressNestedInput
  }

  export type QuestProgressUncheckedUpdateInput = {
    questId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type QuestProgressCreateManyInput = {
    questId: string
    userId: string
    status?: $Enums.QuestStatus
  }

  export type QuestProgressUpdateManyMutationInput = {
    questId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type QuestProgressUncheckedUpdateManyInput = {
    questId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type SavedProgressCreateInput = {
    questId: string
    progress: number
    user: UserCreateNestedOneWithoutSavedProgressInput
  }

  export type SavedProgressUncheckedCreateInput = {
    userId: string
    questId: string
    progress: number
  }

  export type SavedProgressUpdateInput = {
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutSavedProgressNestedInput
  }

  export type SavedProgressUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type SavedProgressCreateManyInput = {
    userId: string
    questId: string
    progress: number
  }

  export type SavedProgressUpdateManyMutationInput = {
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type SavedProgressUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type AuditCreateInput = {
    transactionId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditUncheckedCreateInput = {
    transactionId: string
    userId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditUncheckedUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditCreateManyInput = {
    transactionId: string
    userId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUpdateManyMutationInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUncheckedUpdateManyInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type TransactionIntentCreateInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionCreateNestedManyWithoutTransactionInput
    user: UserCreateNestedOneWithoutTransactionsInput
    batch?: BatchedTransactionIntentCreateNestedOneWithoutTransactionIntentsInput
  }

  export type TransactionIntentUncheckedCreateInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    userId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: string | null
    transactions?: SubmittedTransactionUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionIntentUpdateInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionUpdateManyWithoutTransactionNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    batch?: BatchedTransactionIntentUpdateOneWithoutTransactionIntentsNestedInput
  }

  export type TransactionIntentUncheckedUpdateInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: SubmittedTransactionUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionIntentCreateManyInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    userId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: string | null
  }

  export type TransactionIntentUpdateManyMutationInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionIntentUncheckedUpdateManyInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchedTransactionIntentCreateInput = {
    id: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    transactionIntents?: TransactionIntentCreateNestedManyWithoutBatchInput
  }

  export type BatchedTransactionIntentUncheckedCreateInput = {
    id: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    transactionIntents?: TransactionIntentUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchedTransactionIntentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    transactionIntents?: TransactionIntentUpdateManyWithoutBatchNestedInput
  }

  export type BatchedTransactionIntentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    transactionIntents?: TransactionIntentUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchedTransactionIntentCreateManyInput = {
    id: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
  }

  export type BatchedTransactionIntentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchedTransactionIntentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubmittedTransactionCreateInput = {
    transactionId: string
    status: string
    createdAt?: Date | string
    transaction: TransactionIntentCreateNestedOneWithoutTransactionsInput
  }

  export type SubmittedTransactionUncheckedCreateInput = {
    transactionId: string
    transactionIntent: string
    status: string
    createdAt?: Date | string
  }

  export type SubmittedTransactionUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionIntentUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type SubmittedTransactionUncheckedUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    transactionIntent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedTransactionCreateManyInput = {
    transactionId: string
    transactionIntent: string
    status: string
    createdAt?: Date | string
  }

  export type SubmittedTransactionUpdateManyMutationInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedTransactionUncheckedUpdateManyInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    transactionIntent?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigCreateInput = {
    key: string
    value: string
  }

  export type ConfigUncheckedCreateInput = {
    key: string
    value: string
  }

  export type ConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigCreateManyInput = {
    key: string
    value: string
  }

  export type ConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type CompletedQuestRequirementListRelationFilter = {
    every?: CompletedQuestRequirementWhereInput
    some?: CompletedQuestRequirementWhereInput
    none?: CompletedQuestRequirementWhereInput
  }

  export type SavedProgressNullableRelationFilter = {
    is?: SavedProgressWhereInput | null
    isNot?: SavedProgressWhereInput | null
  }

  export type AuditListRelationFilter = {
    every?: AuditWhereInput
    some?: AuditWhereInput
    none?: AuditWhereInput
  }

  export type QuestProgressListRelationFilter = {
    every?: QuestProgressWhereInput
    some?: QuestProgressWhereInput
    none?: QuestProgressWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TransactionIntentListRelationFilter = {
    every?: TransactionIntentWhereInput
    some?: TransactionIntentWhereInput
    none?: TransactionIntentWhereInput
  }

  export type ReferralListRelationFilter = {
    every?: ReferralWhereInput
    some?: ReferralWhereInput
    none?: ReferralWhereInput
  }

  export type LoginAttemptListRelationFilter = {
    every?: LoginAttemptWhereInput
    some?: LoginAttemptWhereInput
    none?: LoginAttemptWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompletedQuestRequirementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionIntentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoginAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    createdAt?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
    country?: SortOrder
    type?: SortOrder
    referralCode?: SortOrder
    referredBy?: SortOrder
    status?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    createdAt?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
    country?: SortOrder
    type?: SortOrder
    referralCode?: SortOrder
    referredBy?: SortOrder
    status?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    createdAt?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
    country?: SortOrder
    type?: SortOrder
    referralCode?: SortOrder
    referredBy?: SortOrder
    status?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type EnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type EnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeWithAggregatesFilter<$PrismaModel> | $Enums.ImageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImageTypeFilter<$PrismaModel>
    _max?: NestedEnumImageTypeFilter<$PrismaModel>
  }

  export type EnumReferralActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferralAction | EnumReferralActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReferralActionFilter<$PrismaModel> | $Enums.ReferralAction
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReferralCountOrderByAggregateInput = {
    eventId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    xrdValue?: SortOrder
  }

  export type ReferralAvgOrderByAggregateInput = {
    xrdValue?: SortOrder
  }

  export type ReferralMaxOrderByAggregateInput = {
    eventId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    xrdValue?: SortOrder
  }

  export type ReferralMinOrderByAggregateInput = {
    eventId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    xrdValue?: SortOrder
  }

  export type ReferralSumOrderByAggregateInput = {
    xrdValue?: SortOrder
  }

  export type EnumReferralActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferralAction | EnumReferralActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReferralActionWithAggregatesFilter<$PrismaModel> | $Enums.ReferralAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReferralActionFilter<$PrismaModel>
    _max?: NestedEnumReferralActionFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ChallengeCountOrderByAggregateInput = {
    challenge?: SortOrder
    createdAt?: SortOrder
  }

  export type ChallengeMaxOrderByAggregateInput = {
    challenge?: SortOrder
    createdAt?: SortOrder
  }

  export type ChallengeMinOrderByAggregateInput = {
    challenge?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EventCountOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    data?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    userId?: SortOrder
    questId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
    data?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumLoginAttemptTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoginAttemptType | EnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoginAttemptTypeFilter<$PrismaModel> | $Enums.LoginAttemptType
  }

  export type LoginAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LoginAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumLoginAttemptTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoginAttemptType | EnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoginAttemptTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoginAttemptType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoginAttemptTypeFilter<$PrismaModel>
    _max?: NestedEnumLoginAttemptTypeFilter<$PrismaModel>
  }

  export type NotificationNotificationIdUserIdCompoundUniqueInput = {
    notificationId: string
    userId: string
  }

  export type NotificationCountOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    seenAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    seenAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    seenAt?: SortOrder
  }

  export type CompletedQuestRequirementQuestIdUserIdRequirementIdCompoundUniqueInput = {
    questId: string
    userId: string
    requirementId: string
  }

  export type CompletedQuestRequirementCountOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    requirementId?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletedQuestRequirementMaxOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    requirementId?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletedQuestRequirementMinOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    requirementId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumQuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestStatus | EnumQuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestStatusFilter<$PrismaModel> | $Enums.QuestStatus
  }

  export type QuestProgressQuestIdUserIdCompoundUniqueInput = {
    questId: string
    userId: string
  }

  export type QuestProgressCountOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
  }

  export type QuestProgressMaxOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
  }

  export type QuestProgressMinOrderByAggregateInput = {
    questId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
  }

  export type EnumQuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestStatus | EnumQuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestStatusFilter<$PrismaModel>
    _max?: NestedEnumQuestStatusFilter<$PrismaModel>
  }

  export type SavedProgressCountOrderByAggregateInput = {
    userId?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
  }

  export type SavedProgressAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type SavedProgressMaxOrderByAggregateInput = {
    userId?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
  }

  export type SavedProgressMinOrderByAggregateInput = {
    userId?: SortOrder
    questId?: SortOrder
    progress?: SortOrder
  }

  export type SavedProgressSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type EnumAuditTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditType | EnumAuditTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditTypeFilter<$PrismaModel> | $Enums.AuditType
  }

  export type AuditCountOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
    data?: SortOrder
  }

  export type AuditAvgOrderByAggregateInput = {
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
  }

  export type AuditMaxOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
  }

  export type AuditMinOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
  }

  export type AuditSumOrderByAggregateInput = {
    xrdUsdValue?: SortOrder
    xrdPrice?: SortOrder
  }

  export type EnumAuditTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditType | EnumAuditTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuditType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditTypeFilter<$PrismaModel>
    _max?: NestedEnumAuditTypeFilter<$PrismaModel>
  }

  export type EnumTransactionIntentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionIntentStatus | EnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionIntentStatusFilter<$PrismaModel> | $Enums.TransactionIntentStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SubmittedTransactionListRelationFilter = {
    every?: SubmittedTransactionWhereInput
    some?: SubmittedTransactionWhereInput
    none?: SubmittedTransactionWhereInput
  }

  export type BatchedTransactionIntentNullableRelationFilter = {
    is?: BatchedTransactionIntentWhereInput | null
    isNot?: BatchedTransactionIntentWhereInput | null
  }

  export type SubmittedTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionIntentCountOrderByAggregateInput = {
    discriminator?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    data?: SortOrder
    batchId?: SortOrder
  }

  export type TransactionIntentMaxOrderByAggregateInput = {
    discriminator?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    batchId?: SortOrder
  }

  export type TransactionIntentMinOrderByAggregateInput = {
    discriminator?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    batchId?: SortOrder
  }

  export type EnumTransactionIntentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionIntentStatus | EnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionIntentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionIntentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionIntentStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionIntentStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BatchedTransactionIntentCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
  }

  export type BatchedTransactionIntentMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
  }

  export type BatchedTransactionIntentMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
  }

  export type TransactionIntentRelationFilter = {
    is?: TransactionIntentWhereInput
    isNot?: TransactionIntentWhereInput
  }

  export type SubmittedTransactionCountOrderByAggregateInput = {
    transactionId?: SortOrder
    transactionIntent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmittedTransactionMaxOrderByAggregateInput = {
    transactionId?: SortOrder
    transactionIntent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmittedTransactionMinOrderByAggregateInput = {
    transactionId?: SortOrder
    transactionIntent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConfigCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ConfigMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ConfigMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type UserCreateNestedOneWithoutReferredUsersInput = {
    create?: XOR<UserCreateWithoutReferredUsersInput, UserUncheckedCreateWithoutReferredUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferredUsersInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type CompletedQuestRequirementCreateNestedManyWithoutUserInput = {
    create?: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput> | CompletedQuestRequirementCreateWithoutUserInput[] | CompletedQuestRequirementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompletedQuestRequirementCreateOrConnectWithoutUserInput | CompletedQuestRequirementCreateOrConnectWithoutUserInput[]
    createMany?: CompletedQuestRequirementCreateManyUserInputEnvelope
    connect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
  }

  export type SavedProgressCreateNestedOneWithoutUserInput = {
    create?: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedProgressCreateOrConnectWithoutUserInput
    connect?: SavedProgressWhereUniqueInput
  }

  export type AuditCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput> | AuditCreateWithoutUserInput[] | AuditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditCreateOrConnectWithoutUserInput | AuditCreateOrConnectWithoutUserInput[]
    createMany?: AuditCreateManyUserInputEnvelope
    connect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
  }

  export type QuestProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput> | QuestProgressCreateWithoutUserInput[] | QuestProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuestProgressCreateOrConnectWithoutUserInput | QuestProgressCreateOrConnectWithoutUserInput[]
    createMany?: QuestProgressCreateManyUserInputEnvelope
    connect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutReferredByUserInput = {
    create?: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput> | UserCreateWithoutReferredByUserInput[] | UserUncheckedCreateWithoutReferredByUserInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByUserInput | UserCreateOrConnectWithoutReferredByUserInput[]
    createMany?: UserCreateManyReferredByUserInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TransactionIntentCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput> | TransactionIntentCreateWithoutUserInput[] | TransactionIntentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutUserInput | TransactionIntentCreateOrConnectWithoutUserInput[]
    createMany?: TransactionIntentCreateManyUserInputEnvelope
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
  }

  export type ReferralCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput> | ReferralCreateWithoutUserInput[] | ReferralUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutUserInput | ReferralCreateOrConnectWithoutUserInput[]
    createMany?: ReferralCreateManyUserInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type LoginAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput> | LoginAttemptCreateWithoutUserInput[] | LoginAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginAttemptCreateOrConnectWithoutUserInput | LoginAttemptCreateOrConnectWithoutUserInput[]
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    connect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput> | CompletedQuestRequirementCreateWithoutUserInput[] | CompletedQuestRequirementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompletedQuestRequirementCreateOrConnectWithoutUserInput | CompletedQuestRequirementCreateOrConnectWithoutUserInput[]
    createMany?: CompletedQuestRequirementCreateManyUserInputEnvelope
    connect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
  }

  export type SavedProgressUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedProgressCreateOrConnectWithoutUserInput
    connect?: SavedProgressWhereUniqueInput
  }

  export type AuditUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput> | AuditCreateWithoutUserInput[] | AuditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditCreateOrConnectWithoutUserInput | AuditCreateOrConnectWithoutUserInput[]
    createMany?: AuditCreateManyUserInputEnvelope
    connect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
  }

  export type QuestProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput> | QuestProgressCreateWithoutUserInput[] | QuestProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuestProgressCreateOrConnectWithoutUserInput | QuestProgressCreateOrConnectWithoutUserInput[]
    createMany?: QuestProgressCreateManyUserInputEnvelope
    connect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutReferredByUserInput = {
    create?: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput> | UserCreateWithoutReferredByUserInput[] | UserUncheckedCreateWithoutReferredByUserInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByUserInput | UserCreateOrConnectWithoutReferredByUserInput[]
    createMany?: UserCreateManyReferredByUserInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TransactionIntentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput> | TransactionIntentCreateWithoutUserInput[] | TransactionIntentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutUserInput | TransactionIntentCreateOrConnectWithoutUserInput[]
    createMany?: TransactionIntentCreateManyUserInputEnvelope
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
  }

  export type ReferralUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput> | ReferralCreateWithoutUserInput[] | ReferralUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutUserInput | ReferralCreateOrConnectWithoutUserInput[]
    createMany?: ReferralCreateManyUserInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type LoginAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput> | LoginAttemptCreateWithoutUserInput[] | LoginAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginAttemptCreateOrConnectWithoutUserInput | LoginAttemptCreateOrConnectWithoutUserInput[]
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    connect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type UserUpdateOneWithoutReferredUsersNestedInput = {
    create?: XOR<UserCreateWithoutReferredUsersInput, UserUncheckedCreateWithoutReferredUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferredUsersInput
    upsert?: UserUpsertWithoutReferredUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferredUsersInput, UserUpdateWithoutReferredUsersInput>, UserUncheckedUpdateWithoutReferredUsersInput>
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type CompletedQuestRequirementUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput> | CompletedQuestRequirementCreateWithoutUserInput[] | CompletedQuestRequirementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompletedQuestRequirementCreateOrConnectWithoutUserInput | CompletedQuestRequirementCreateOrConnectWithoutUserInput[]
    upsert?: CompletedQuestRequirementUpsertWithWhereUniqueWithoutUserInput | CompletedQuestRequirementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompletedQuestRequirementCreateManyUserInputEnvelope
    set?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    disconnect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    delete?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    connect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    update?: CompletedQuestRequirementUpdateWithWhereUniqueWithoutUserInput | CompletedQuestRequirementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompletedQuestRequirementUpdateManyWithWhereWithoutUserInput | CompletedQuestRequirementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompletedQuestRequirementScalarWhereInput | CompletedQuestRequirementScalarWhereInput[]
  }

  export type SavedProgressUpdateOneWithoutUserNestedInput = {
    create?: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedProgressCreateOrConnectWithoutUserInput
    upsert?: SavedProgressUpsertWithoutUserInput
    disconnect?: SavedProgressWhereInput | boolean
    delete?: SavedProgressWhereInput | boolean
    connect?: SavedProgressWhereUniqueInput
    update?: XOR<XOR<SavedProgressUpdateToOneWithWhereWithoutUserInput, SavedProgressUpdateWithoutUserInput>, SavedProgressUncheckedUpdateWithoutUserInput>
  }

  export type AuditUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput> | AuditCreateWithoutUserInput[] | AuditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditCreateOrConnectWithoutUserInput | AuditCreateOrConnectWithoutUserInput[]
    upsert?: AuditUpsertWithWhereUniqueWithoutUserInput | AuditUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditCreateManyUserInputEnvelope
    set?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    disconnect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    delete?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    connect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    update?: AuditUpdateWithWhereUniqueWithoutUserInput | AuditUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditUpdateManyWithWhereWithoutUserInput | AuditUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditScalarWhereInput | AuditScalarWhereInput[]
  }

  export type QuestProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput> | QuestProgressCreateWithoutUserInput[] | QuestProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuestProgressCreateOrConnectWithoutUserInput | QuestProgressCreateOrConnectWithoutUserInput[]
    upsert?: QuestProgressUpsertWithWhereUniqueWithoutUserInput | QuestProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuestProgressCreateManyUserInputEnvelope
    set?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    disconnect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    delete?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    connect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    update?: QuestProgressUpdateWithWhereUniqueWithoutUserInput | QuestProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuestProgressUpdateManyWithWhereWithoutUserInput | QuestProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuestProgressScalarWhereInput | QuestProgressScalarWhereInput[]
  }

  export type UserUpdateManyWithoutReferredByUserNestedInput = {
    create?: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput> | UserCreateWithoutReferredByUserInput[] | UserUncheckedCreateWithoutReferredByUserInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByUserInput | UserCreateOrConnectWithoutReferredByUserInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReferredByUserInput | UserUpsertWithWhereUniqueWithoutReferredByUserInput[]
    createMany?: UserCreateManyReferredByUserInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReferredByUserInput | UserUpdateWithWhereUniqueWithoutReferredByUserInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReferredByUserInput | UserUpdateManyWithWhereWithoutReferredByUserInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TransactionIntentUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput> | TransactionIntentCreateWithoutUserInput[] | TransactionIntentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutUserInput | TransactionIntentCreateOrConnectWithoutUserInput[]
    upsert?: TransactionIntentUpsertWithWhereUniqueWithoutUserInput | TransactionIntentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionIntentCreateManyUserInputEnvelope
    set?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    disconnect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    delete?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    update?: TransactionIntentUpdateWithWhereUniqueWithoutUserInput | TransactionIntentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionIntentUpdateManyWithWhereWithoutUserInput | TransactionIntentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
  }

  export type ReferralUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput> | ReferralCreateWithoutUserInput[] | ReferralUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutUserInput | ReferralCreateOrConnectWithoutUserInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutUserInput | ReferralUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralCreateManyUserInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutUserInput | ReferralUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutUserInput | ReferralUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type LoginAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput> | LoginAttemptCreateWithoutUserInput[] | LoginAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginAttemptCreateOrConnectWithoutUserInput | LoginAttemptCreateOrConnectWithoutUserInput[]
    upsert?: LoginAttemptUpsertWithWhereUniqueWithoutUserInput | LoginAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    set?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    disconnect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    delete?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    connect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    update?: LoginAttemptUpdateWithWhereUniqueWithoutUserInput | LoginAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoginAttemptUpdateManyWithWhereWithoutUserInput | LoginAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoginAttemptScalarWhereInput | LoginAttemptScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput> | CompletedQuestRequirementCreateWithoutUserInput[] | CompletedQuestRequirementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompletedQuestRequirementCreateOrConnectWithoutUserInput | CompletedQuestRequirementCreateOrConnectWithoutUserInput[]
    upsert?: CompletedQuestRequirementUpsertWithWhereUniqueWithoutUserInput | CompletedQuestRequirementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompletedQuestRequirementCreateManyUserInputEnvelope
    set?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    disconnect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    delete?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    connect?: CompletedQuestRequirementWhereUniqueInput | CompletedQuestRequirementWhereUniqueInput[]
    update?: CompletedQuestRequirementUpdateWithWhereUniqueWithoutUserInput | CompletedQuestRequirementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompletedQuestRequirementUpdateManyWithWhereWithoutUserInput | CompletedQuestRequirementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompletedQuestRequirementScalarWhereInput | CompletedQuestRequirementScalarWhereInput[]
  }

  export type SavedProgressUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
    connectOrCreate?: SavedProgressCreateOrConnectWithoutUserInput
    upsert?: SavedProgressUpsertWithoutUserInput
    disconnect?: SavedProgressWhereInput | boolean
    delete?: SavedProgressWhereInput | boolean
    connect?: SavedProgressWhereUniqueInput
    update?: XOR<XOR<SavedProgressUpdateToOneWithWhereWithoutUserInput, SavedProgressUpdateWithoutUserInput>, SavedProgressUncheckedUpdateWithoutUserInput>
  }

  export type AuditUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput> | AuditCreateWithoutUserInput[] | AuditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditCreateOrConnectWithoutUserInput | AuditCreateOrConnectWithoutUserInput[]
    upsert?: AuditUpsertWithWhereUniqueWithoutUserInput | AuditUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditCreateManyUserInputEnvelope
    set?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    disconnect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    delete?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    connect?: AuditWhereUniqueInput | AuditWhereUniqueInput[]
    update?: AuditUpdateWithWhereUniqueWithoutUserInput | AuditUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditUpdateManyWithWhereWithoutUserInput | AuditUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditScalarWhereInput | AuditScalarWhereInput[]
  }

  export type QuestProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput> | QuestProgressCreateWithoutUserInput[] | QuestProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuestProgressCreateOrConnectWithoutUserInput | QuestProgressCreateOrConnectWithoutUserInput[]
    upsert?: QuestProgressUpsertWithWhereUniqueWithoutUserInput | QuestProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuestProgressCreateManyUserInputEnvelope
    set?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    disconnect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    delete?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    connect?: QuestProgressWhereUniqueInput | QuestProgressWhereUniqueInput[]
    update?: QuestProgressUpdateWithWhereUniqueWithoutUserInput | QuestProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuestProgressUpdateManyWithWhereWithoutUserInput | QuestProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuestProgressScalarWhereInput | QuestProgressScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutReferredByUserNestedInput = {
    create?: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput> | UserCreateWithoutReferredByUserInput[] | UserUncheckedCreateWithoutReferredByUserInput[]
    connectOrCreate?: UserCreateOrConnectWithoutReferredByUserInput | UserCreateOrConnectWithoutReferredByUserInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutReferredByUserInput | UserUpsertWithWhereUniqueWithoutReferredByUserInput[]
    createMany?: UserCreateManyReferredByUserInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutReferredByUserInput | UserUpdateWithWhereUniqueWithoutReferredByUserInput[]
    updateMany?: UserUpdateManyWithWhereWithoutReferredByUserInput | UserUpdateManyWithWhereWithoutReferredByUserInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TransactionIntentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput> | TransactionIntentCreateWithoutUserInput[] | TransactionIntentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutUserInput | TransactionIntentCreateOrConnectWithoutUserInput[]
    upsert?: TransactionIntentUpsertWithWhereUniqueWithoutUserInput | TransactionIntentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionIntentCreateManyUserInputEnvelope
    set?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    disconnect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    delete?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    update?: TransactionIntentUpdateWithWhereUniqueWithoutUserInput | TransactionIntentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionIntentUpdateManyWithWhereWithoutUserInput | TransactionIntentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
  }

  export type ReferralUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput> | ReferralCreateWithoutUserInput[] | ReferralUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutUserInput | ReferralCreateOrConnectWithoutUserInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutUserInput | ReferralUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReferralCreateManyUserInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutUserInput | ReferralUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutUserInput | ReferralUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type LoginAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput> | LoginAttemptCreateWithoutUserInput[] | LoginAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginAttemptCreateOrConnectWithoutUserInput | LoginAttemptCreateOrConnectWithoutUserInput[]
    upsert?: LoginAttemptUpsertWithWhereUniqueWithoutUserInput | LoginAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoginAttemptCreateManyUserInputEnvelope
    set?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    disconnect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    delete?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    connect?: LoginAttemptWhereUniqueInput | LoginAttemptWhereUniqueInput[]
    update?: LoginAttemptUpdateWithWhereUniqueWithoutUserInput | LoginAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoginAttemptUpdateManyWithWhereWithoutUserInput | LoginAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoginAttemptScalarWhereInput | LoginAttemptScalarWhereInput[]
  }

  export type EnumImageTypeFieldUpdateOperationsInput = {
    set?: $Enums.ImageType
  }

  export type EventCreateNestedOneWithoutReferralInput = {
    create?: XOR<EventCreateWithoutReferralInput, EventUncheckedCreateWithoutReferralInput>
    connectOrCreate?: EventCreateOrConnectWithoutReferralInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReferalsInput = {
    create?: XOR<UserCreateWithoutReferalsInput, UserUncheckedCreateWithoutReferalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferalsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReferralActionFieldUpdateOperationsInput = {
    set?: $Enums.ReferralAction
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EventUpdateOneRequiredWithoutReferralNestedInput = {
    create?: XOR<EventCreateWithoutReferralInput, EventUncheckedCreateWithoutReferralInput>
    connectOrCreate?: EventCreateOrConnectWithoutReferralInput
    upsert?: EventUpsertWithoutReferralInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutReferralInput, EventUpdateWithoutReferralInput>, EventUncheckedUpdateWithoutReferralInput>
  }

  export type UserUpdateOneRequiredWithoutReferalsNestedInput = {
    create?: XOR<UserCreateWithoutReferalsInput, UserUncheckedCreateWithoutReferalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferalsInput
    upsert?: UserUpsertWithoutReferalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferalsInput, UserUpdateWithoutReferalsInput>, UserUncheckedUpdateWithoutReferalsInput>
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type ReferralCreateNestedManyWithoutEventInput = {
    create?: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput> | ReferralCreateWithoutEventInput[] | ReferralUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutEventInput | ReferralCreateOrConnectWithoutEventInput[]
    createMany?: ReferralCreateManyEventInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type ReferralUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput> | ReferralCreateWithoutEventInput[] | ReferralUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutEventInput | ReferralCreateOrConnectWithoutEventInput[]
    createMany?: ReferralCreateManyEventInputEnvelope
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type ReferralUpdateManyWithoutEventNestedInput = {
    create?: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput> | ReferralCreateWithoutEventInput[] | ReferralUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutEventInput | ReferralCreateOrConnectWithoutEventInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutEventInput | ReferralUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ReferralCreateManyEventInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutEventInput | ReferralUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutEventInput | ReferralUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type ReferralUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput> | ReferralCreateWithoutEventInput[] | ReferralUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ReferralCreateOrConnectWithoutEventInput | ReferralCreateOrConnectWithoutEventInput[]
    upsert?: ReferralUpsertWithWhereUniqueWithoutEventInput | ReferralUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ReferralCreateManyEventInputEnvelope
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[]
    update?: ReferralUpdateWithWhereUniqueWithoutEventInput | ReferralUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ReferralUpdateManyWithWhereWithoutEventInput | ReferralUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutLoginAttemptsInput = {
    create?: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumLoginAttemptTypeFieldUpdateOperationsInput = {
    set?: $Enums.LoginAttemptType
  }

  export type UserUpdateOneRequiredWithoutLoginAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoginAttemptsInput
    upsert?: UserUpsertWithoutLoginAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoginAttemptsInput, UserUpdateWithoutLoginAttemptsInput>, UserUncheckedUpdateWithoutLoginAttemptsInput>
  }

  export type UserCreateNestedOneWithoutCompletedQuestRequirementsInput = {
    create?: XOR<UserCreateWithoutCompletedQuestRequirementsInput, UserUncheckedCreateWithoutCompletedQuestRequirementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompletedQuestRequirementsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCompletedQuestRequirementsNestedInput = {
    create?: XOR<UserCreateWithoutCompletedQuestRequirementsInput, UserUncheckedCreateWithoutCompletedQuestRequirementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompletedQuestRequirementsInput
    upsert?: UserUpsertWithoutCompletedQuestRequirementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompletedQuestRequirementsInput, UserUpdateWithoutCompletedQuestRequirementsInput>, UserUncheckedUpdateWithoutCompletedQuestRequirementsInput>
  }

  export type UserCreateNestedOneWithoutQuestProgressInput = {
    create?: XOR<UserCreateWithoutQuestProgressInput, UserUncheckedCreateWithoutQuestProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestProgressInput
    connect?: UserWhereUniqueInput
  }

  export type EnumQuestStatusFieldUpdateOperationsInput = {
    set?: $Enums.QuestStatus
  }

  export type UserUpdateOneRequiredWithoutQuestProgressNestedInput = {
    create?: XOR<UserCreateWithoutQuestProgressInput, UserUncheckedCreateWithoutQuestProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestProgressInput
    upsert?: UserUpsertWithoutQuestProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestProgressInput, UserUpdateWithoutQuestProgressInput>, UserUncheckedUpdateWithoutQuestProgressInput>
  }

  export type UserCreateNestedOneWithoutSavedProgressInput = {
    create?: XOR<UserCreateWithoutSavedProgressInput, UserUncheckedCreateWithoutSavedProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedProgressInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedProgressNestedInput = {
    create?: XOR<UserCreateWithoutSavedProgressInput, UserUncheckedCreateWithoutSavedProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedProgressInput
    upsert?: UserUpsertWithoutSavedProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedProgressInput, UserUpdateWithoutSavedProgressInput>, UserUncheckedUpdateWithoutSavedProgressInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuditTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuditType
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type SubmittedTransactionCreateNestedManyWithoutTransactionInput = {
    create?: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput> | SubmittedTransactionCreateWithoutTransactionInput[] | SubmittedTransactionUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SubmittedTransactionCreateOrConnectWithoutTransactionInput | SubmittedTransactionCreateOrConnectWithoutTransactionInput[]
    createMany?: SubmittedTransactionCreateManyTransactionInputEnvelope
    connect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type BatchedTransactionIntentCreateNestedOneWithoutTransactionIntentsInput = {
    create?: XOR<BatchedTransactionIntentCreateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedCreateWithoutTransactionIntentsInput>
    connectOrCreate?: BatchedTransactionIntentCreateOrConnectWithoutTransactionIntentsInput
    connect?: BatchedTransactionIntentWhereUniqueInput
  }

  export type SubmittedTransactionUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput> | SubmittedTransactionCreateWithoutTransactionInput[] | SubmittedTransactionUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SubmittedTransactionCreateOrConnectWithoutTransactionInput | SubmittedTransactionCreateOrConnectWithoutTransactionInput[]
    createMany?: SubmittedTransactionCreateManyTransactionInputEnvelope
    connect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
  }

  export type EnumTransactionIntentStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionIntentStatus
  }

  export type SubmittedTransactionUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput> | SubmittedTransactionCreateWithoutTransactionInput[] | SubmittedTransactionUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SubmittedTransactionCreateOrConnectWithoutTransactionInput | SubmittedTransactionCreateOrConnectWithoutTransactionInput[]
    upsert?: SubmittedTransactionUpsertWithWhereUniqueWithoutTransactionInput | SubmittedTransactionUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: SubmittedTransactionCreateManyTransactionInputEnvelope
    set?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    disconnect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    delete?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    connect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    update?: SubmittedTransactionUpdateWithWhereUniqueWithoutTransactionInput | SubmittedTransactionUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: SubmittedTransactionUpdateManyWithWhereWithoutTransactionInput | SubmittedTransactionUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: SubmittedTransactionScalarWhereInput | SubmittedTransactionScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type BatchedTransactionIntentUpdateOneWithoutTransactionIntentsNestedInput = {
    create?: XOR<BatchedTransactionIntentCreateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedCreateWithoutTransactionIntentsInput>
    connectOrCreate?: BatchedTransactionIntentCreateOrConnectWithoutTransactionIntentsInput
    upsert?: BatchedTransactionIntentUpsertWithoutTransactionIntentsInput
    disconnect?: BatchedTransactionIntentWhereInput | boolean
    delete?: BatchedTransactionIntentWhereInput | boolean
    connect?: BatchedTransactionIntentWhereUniqueInput
    update?: XOR<XOR<BatchedTransactionIntentUpdateToOneWithWhereWithoutTransactionIntentsInput, BatchedTransactionIntentUpdateWithoutTransactionIntentsInput>, BatchedTransactionIntentUncheckedUpdateWithoutTransactionIntentsInput>
  }

  export type SubmittedTransactionUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput> | SubmittedTransactionCreateWithoutTransactionInput[] | SubmittedTransactionUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SubmittedTransactionCreateOrConnectWithoutTransactionInput | SubmittedTransactionCreateOrConnectWithoutTransactionInput[]
    upsert?: SubmittedTransactionUpsertWithWhereUniqueWithoutTransactionInput | SubmittedTransactionUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: SubmittedTransactionCreateManyTransactionInputEnvelope
    set?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    disconnect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    delete?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    connect?: SubmittedTransactionWhereUniqueInput | SubmittedTransactionWhereUniqueInput[]
    update?: SubmittedTransactionUpdateWithWhereUniqueWithoutTransactionInput | SubmittedTransactionUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: SubmittedTransactionUpdateManyWithWhereWithoutTransactionInput | SubmittedTransactionUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: SubmittedTransactionScalarWhereInput | SubmittedTransactionScalarWhereInput[]
  }

  export type TransactionIntentCreateNestedManyWithoutBatchInput = {
    create?: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput> | TransactionIntentCreateWithoutBatchInput[] | TransactionIntentUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutBatchInput | TransactionIntentCreateOrConnectWithoutBatchInput[]
    createMany?: TransactionIntentCreateManyBatchInputEnvelope
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
  }

  export type TransactionIntentUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput> | TransactionIntentCreateWithoutBatchInput[] | TransactionIntentUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutBatchInput | TransactionIntentCreateOrConnectWithoutBatchInput[]
    createMany?: TransactionIntentCreateManyBatchInputEnvelope
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
  }

  export type TransactionIntentUpdateManyWithoutBatchNestedInput = {
    create?: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput> | TransactionIntentCreateWithoutBatchInput[] | TransactionIntentUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutBatchInput | TransactionIntentCreateOrConnectWithoutBatchInput[]
    upsert?: TransactionIntentUpsertWithWhereUniqueWithoutBatchInput | TransactionIntentUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: TransactionIntentCreateManyBatchInputEnvelope
    set?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    disconnect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    delete?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    update?: TransactionIntentUpdateWithWhereUniqueWithoutBatchInput | TransactionIntentUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: TransactionIntentUpdateManyWithWhereWithoutBatchInput | TransactionIntentUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
  }

  export type TransactionIntentUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput> | TransactionIntentCreateWithoutBatchInput[] | TransactionIntentUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutBatchInput | TransactionIntentCreateOrConnectWithoutBatchInput[]
    upsert?: TransactionIntentUpsertWithWhereUniqueWithoutBatchInput | TransactionIntentUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: TransactionIntentCreateManyBatchInputEnvelope
    set?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    disconnect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    delete?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    connect?: TransactionIntentWhereUniqueInput | TransactionIntentWhereUniqueInput[]
    update?: TransactionIntentUpdateWithWhereUniqueWithoutBatchInput | TransactionIntentUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: TransactionIntentUpdateManyWithWhereWithoutBatchInput | TransactionIntentUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
  }

  export type TransactionIntentCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<TransactionIntentCreateWithoutTransactionsInput, TransactionIntentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutTransactionsInput
    connect?: TransactionIntentWhereUniqueInput
  }

  export type TransactionIntentUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<TransactionIntentCreateWithoutTransactionsInput, TransactionIntentUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: TransactionIntentCreateOrConnectWithoutTransactionsInput
    upsert?: TransactionIntentUpsertWithoutTransactionsInput
    connect?: TransactionIntentWhereUniqueInput
    update?: XOR<XOR<TransactionIntentUpdateToOneWithWhereWithoutTransactionsInput, TransactionIntentUpdateWithoutTransactionsInput>, TransactionIntentUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedEnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType
  }

  export type NestedEnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeWithAggregatesFilter<$PrismaModel> | $Enums.ImageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImageTypeFilter<$PrismaModel>
    _max?: NestedEnumImageTypeFilter<$PrismaModel>
  }

  export type NestedEnumReferralActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferralAction | EnumReferralActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReferralActionFilter<$PrismaModel> | $Enums.ReferralAction
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumReferralActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReferralAction | EnumReferralActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReferralAction[] | ListEnumReferralActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReferralActionWithAggregatesFilter<$PrismaModel> | $Enums.ReferralAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReferralActionFilter<$PrismaModel>
    _max?: NestedEnumReferralActionFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumLoginAttemptTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LoginAttemptType | EnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoginAttemptTypeFilter<$PrismaModel> | $Enums.LoginAttemptType
  }

  export type NestedEnumLoginAttemptTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoginAttemptType | EnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoginAttemptType[] | ListEnumLoginAttemptTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLoginAttemptTypeWithAggregatesFilter<$PrismaModel> | $Enums.LoginAttemptType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoginAttemptTypeFilter<$PrismaModel>
    _max?: NestedEnumLoginAttemptTypeFilter<$PrismaModel>
  }

  export type NestedEnumQuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestStatus | EnumQuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestStatusFilter<$PrismaModel> | $Enums.QuestStatus
  }

  export type NestedEnumQuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestStatus | EnumQuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestStatus[] | ListEnumQuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestStatusFilter<$PrismaModel>
    _max?: NestedEnumQuestStatusFilter<$PrismaModel>
  }

  export type NestedEnumAuditTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditType | EnumAuditTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditTypeFilter<$PrismaModel> | $Enums.AuditType
  }

  export type NestedEnumAuditTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditType | EnumAuditTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuditType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditTypeFilter<$PrismaModel>
    _max?: NestedEnumAuditTypeFilter<$PrismaModel>
  }

  export type NestedEnumTransactionIntentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionIntentStatus | EnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionIntentStatusFilter<$PrismaModel> | $Enums.TransactionIntentStatus
  }

  export type NestedEnumTransactionIntentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionIntentStatus | EnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionIntentStatus[] | ListEnumTransactionIntentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionIntentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionIntentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionIntentStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionIntentStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutReferredUsersInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferredUsersInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferredUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferredUsersInput, UserUncheckedCreateWithoutReferredUsersInput>
  }

  export type EventCreateWithoutUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutUserInput = {
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CompletedQuestRequirementCreateWithoutUserInput = {
    questId: string
    requirementId: string
    createdAt?: Date | string
  }

  export type CompletedQuestRequirementUncheckedCreateWithoutUserInput = {
    questId: string
    requirementId: string
    createdAt?: Date | string
  }

  export type CompletedQuestRequirementCreateOrConnectWithoutUserInput = {
    where: CompletedQuestRequirementWhereUniqueInput
    create: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput>
  }

  export type CompletedQuestRequirementCreateManyUserInputEnvelope = {
    data: CompletedQuestRequirementCreateManyUserInput | CompletedQuestRequirementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedProgressCreateWithoutUserInput = {
    questId: string
    progress: number
  }

  export type SavedProgressUncheckedCreateWithoutUserInput = {
    questId: string
    progress: number
  }

  export type SavedProgressCreateOrConnectWithoutUserInput = {
    where: SavedProgressWhereUniqueInput
    create: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
  }

  export type AuditCreateWithoutUserInput = {
    transactionId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUncheckedCreateWithoutUserInput = {
    transactionId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditCreateOrConnectWithoutUserInput = {
    where: AuditWhereUniqueInput
    create: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput>
  }

  export type AuditCreateManyUserInputEnvelope = {
    data: AuditCreateManyUserInput | AuditCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QuestProgressCreateWithoutUserInput = {
    questId: string
    status?: $Enums.QuestStatus
  }

  export type QuestProgressUncheckedCreateWithoutUserInput = {
    questId: string
    status?: $Enums.QuestStatus
  }

  export type QuestProgressCreateOrConnectWithoutUserInput = {
    where: QuestProgressWhereUniqueInput
    create: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput>
  }

  export type QuestProgressCreateManyUserInputEnvelope = {
    data: QuestProgressCreateManyUserInput | QuestProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutReferredByUserInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferredByUserInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferredByUserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput>
  }

  export type UserCreateManyReferredByUserInputEnvelope = {
    data: UserCreateManyReferredByUserInput | UserCreateManyReferredByUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionIntentCreateWithoutUserInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionCreateNestedManyWithoutTransactionInput
    batch?: BatchedTransactionIntentCreateNestedOneWithoutTransactionIntentsInput
  }

  export type TransactionIntentUncheckedCreateWithoutUserInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: string | null
    transactions?: SubmittedTransactionUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionIntentCreateOrConnectWithoutUserInput = {
    where: TransactionIntentWhereUniqueInput
    create: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput>
  }

  export type TransactionIntentCreateManyUserInputEnvelope = {
    data: TransactionIntentCreateManyUserInput | TransactionIntentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReferralCreateWithoutUserInput = {
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
    event: EventCreateNestedOneWithoutReferralInput
  }

  export type ReferralUncheckedCreateWithoutUserInput = {
    eventId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type ReferralCreateOrConnectWithoutUserInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput>
  }

  export type ReferralCreateManyUserInputEnvelope = {
    data: ReferralCreateManyUserInput | ReferralCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LoginAttemptCreateWithoutUserInput = {
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
  }

  export type LoginAttemptUncheckedCreateWithoutUserInput = {
    id?: number
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
  }

  export type LoginAttemptCreateOrConnectWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    create: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput>
  }

  export type LoginAttemptCreateManyUserInputEnvelope = {
    data: LoginAttemptCreateManyUserInput | LoginAttemptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReferredUsersInput = {
    update: XOR<UserUpdateWithoutReferredUsersInput, UserUncheckedUpdateWithoutReferredUsersInput>
    create: XOR<UserCreateWithoutReferredUsersInput, UserUncheckedCreateWithoutReferredUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferredUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferredUsersInput, UserUncheckedUpdateWithoutReferredUsersInput>
  }

  export type UserUpdateWithoutReferredUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferredUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    transactionId?: StringFilter<"Event"> | string
    id?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
    questId?: StringNullableFilter<"Event"> | string | null
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    createdAt?: DateTimeFilter<"Event"> | Date | string
    error?: StringNullableFilter<"Event"> | string | null
    data?: JsonFilter<"Event">
  }

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    userId?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    seenAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    data?: JsonFilter<"Message">
  }

  export type CompletedQuestRequirementUpsertWithWhereUniqueWithoutUserInput = {
    where: CompletedQuestRequirementWhereUniqueInput
    update: XOR<CompletedQuestRequirementUpdateWithoutUserInput, CompletedQuestRequirementUncheckedUpdateWithoutUserInput>
    create: XOR<CompletedQuestRequirementCreateWithoutUserInput, CompletedQuestRequirementUncheckedCreateWithoutUserInput>
  }

  export type CompletedQuestRequirementUpdateWithWhereUniqueWithoutUserInput = {
    where: CompletedQuestRequirementWhereUniqueInput
    data: XOR<CompletedQuestRequirementUpdateWithoutUserInput, CompletedQuestRequirementUncheckedUpdateWithoutUserInput>
  }

  export type CompletedQuestRequirementUpdateManyWithWhereWithoutUserInput = {
    where: CompletedQuestRequirementScalarWhereInput
    data: XOR<CompletedQuestRequirementUpdateManyMutationInput, CompletedQuestRequirementUncheckedUpdateManyWithoutUserInput>
  }

  export type CompletedQuestRequirementScalarWhereInput = {
    AND?: CompletedQuestRequirementScalarWhereInput | CompletedQuestRequirementScalarWhereInput[]
    OR?: CompletedQuestRequirementScalarWhereInput[]
    NOT?: CompletedQuestRequirementScalarWhereInput | CompletedQuestRequirementScalarWhereInput[]
    questId?: StringFilter<"CompletedQuestRequirement"> | string
    userId?: StringFilter<"CompletedQuestRequirement"> | string
    requirementId?: StringFilter<"CompletedQuestRequirement"> | string
    createdAt?: DateTimeFilter<"CompletedQuestRequirement"> | Date | string
  }

  export type SavedProgressUpsertWithoutUserInput = {
    update: XOR<SavedProgressUpdateWithoutUserInput, SavedProgressUncheckedUpdateWithoutUserInput>
    create: XOR<SavedProgressCreateWithoutUserInput, SavedProgressUncheckedCreateWithoutUserInput>
    where?: SavedProgressWhereInput
  }

  export type SavedProgressUpdateToOneWithWhereWithoutUserInput = {
    where?: SavedProgressWhereInput
    data: XOR<SavedProgressUpdateWithoutUserInput, SavedProgressUncheckedUpdateWithoutUserInput>
  }

  export type SavedProgressUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type SavedProgressUncheckedUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
  }

  export type AuditUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditWhereUniqueInput
    update: XOR<AuditUpdateWithoutUserInput, AuditUncheckedUpdateWithoutUserInput>
    create: XOR<AuditCreateWithoutUserInput, AuditUncheckedCreateWithoutUserInput>
  }

  export type AuditUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditWhereUniqueInput
    data: XOR<AuditUpdateWithoutUserInput, AuditUncheckedUpdateWithoutUserInput>
  }

  export type AuditUpdateManyWithWhereWithoutUserInput = {
    where: AuditScalarWhereInput
    data: XOR<AuditUpdateManyMutationInput, AuditUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditScalarWhereInput = {
    AND?: AuditScalarWhereInput | AuditScalarWhereInput[]
    OR?: AuditScalarWhereInput[]
    NOT?: AuditScalarWhereInput | AuditScalarWhereInput[]
    transactionId?: StringFilter<"Audit"> | string
    userId?: StringFilter<"Audit"> | string
    date?: DateTimeFilter<"Audit"> | Date | string
    type?: EnumAuditTypeFilter<"Audit"> | $Enums.AuditType
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    data?: JsonFilter<"Audit">
  }

  export type QuestProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: QuestProgressWhereUniqueInput
    update: XOR<QuestProgressUpdateWithoutUserInput, QuestProgressUncheckedUpdateWithoutUserInput>
    create: XOR<QuestProgressCreateWithoutUserInput, QuestProgressUncheckedCreateWithoutUserInput>
  }

  export type QuestProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: QuestProgressWhereUniqueInput
    data: XOR<QuestProgressUpdateWithoutUserInput, QuestProgressUncheckedUpdateWithoutUserInput>
  }

  export type QuestProgressUpdateManyWithWhereWithoutUserInput = {
    where: QuestProgressScalarWhereInput
    data: XOR<QuestProgressUpdateManyMutationInput, QuestProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type QuestProgressScalarWhereInput = {
    AND?: QuestProgressScalarWhereInput | QuestProgressScalarWhereInput[]
    OR?: QuestProgressScalarWhereInput[]
    NOT?: QuestProgressScalarWhereInput | QuestProgressScalarWhereInput[]
    questId?: StringFilter<"QuestProgress"> | string
    userId?: StringFilter<"QuestProgress"> | string
    status?: EnumQuestStatusFilter<"QuestProgress"> | $Enums.QuestStatus
  }

  export type UserUpsertWithWhereUniqueWithoutReferredByUserInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutReferredByUserInput, UserUncheckedUpdateWithoutReferredByUserInput>
    create: XOR<UserCreateWithoutReferredByUserInput, UserUncheckedCreateWithoutReferredByUserInput>
  }

  export type UserUpdateWithWhereUniqueWithoutReferredByUserInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutReferredByUserInput, UserUncheckedUpdateWithoutReferredByUserInput>
  }

  export type UserUpdateManyWithWhereWithoutReferredByUserInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutReferredByUserInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    identityAddress?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    accountAddress?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    type?: EnumUserTypeFilter<"User"> | $Enums.UserType
    referralCode?: StringFilter<"User"> | string
    referredBy?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
  }

  export type TransactionIntentUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionIntentWhereUniqueInput
    update: XOR<TransactionIntentUpdateWithoutUserInput, TransactionIntentUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionIntentCreateWithoutUserInput, TransactionIntentUncheckedCreateWithoutUserInput>
  }

  export type TransactionIntentUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionIntentWhereUniqueInput
    data: XOR<TransactionIntentUpdateWithoutUserInput, TransactionIntentUncheckedUpdateWithoutUserInput>
  }

  export type TransactionIntentUpdateManyWithWhereWithoutUserInput = {
    where: TransactionIntentScalarWhereInput
    data: XOR<TransactionIntentUpdateManyMutationInput, TransactionIntentUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionIntentScalarWhereInput = {
    AND?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
    OR?: TransactionIntentScalarWhereInput[]
    NOT?: TransactionIntentScalarWhereInput | TransactionIntentScalarWhereInput[]
    discriminator?: StringFilter<"TransactionIntent"> | string
    status?: EnumTransactionIntentStatusFilter<"TransactionIntent"> | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFilter<"TransactionIntent"> | Date | string
    error?: StringNullableFilter<"TransactionIntent"> | string | null
    userId?: StringFilter<"TransactionIntent"> | string
    data?: JsonNullableFilter<"TransactionIntent">
    batchId?: StringNullableFilter<"TransactionIntent"> | string | null
  }

  export type ReferralUpsertWithWhereUniqueWithoutUserInput = {
    where: ReferralWhereUniqueInput
    update: XOR<ReferralUpdateWithoutUserInput, ReferralUncheckedUpdateWithoutUserInput>
    create: XOR<ReferralCreateWithoutUserInput, ReferralUncheckedCreateWithoutUserInput>
  }

  export type ReferralUpdateWithWhereUniqueWithoutUserInput = {
    where: ReferralWhereUniqueInput
    data: XOR<ReferralUpdateWithoutUserInput, ReferralUncheckedUpdateWithoutUserInput>
  }

  export type ReferralUpdateManyWithWhereWithoutUserInput = {
    where: ReferralScalarWhereInput
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyWithoutUserInput>
  }

  export type ReferralScalarWhereInput = {
    AND?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    OR?: ReferralScalarWhereInput[]
    NOT?: ReferralScalarWhereInput | ReferralScalarWhereInput[]
    eventId?: StringFilter<"Referral"> | string
    userId?: StringFilter<"Referral"> | string
    action?: EnumReferralActionFilter<"Referral"> | $Enums.ReferralAction
    xrdValue?: DecimalFilter<"Referral"> | Decimal | DecimalJsLike | number | string
  }

  export type LoginAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    update: XOR<LoginAttemptUpdateWithoutUserInput, LoginAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<LoginAttemptCreateWithoutUserInput, LoginAttemptUncheckedCreateWithoutUserInput>
  }

  export type LoginAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: LoginAttemptWhereUniqueInput
    data: XOR<LoginAttemptUpdateWithoutUserInput, LoginAttemptUncheckedUpdateWithoutUserInput>
  }

  export type LoginAttemptUpdateManyWithWhereWithoutUserInput = {
    where: LoginAttemptScalarWhereInput
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyWithoutUserInput>
  }

  export type LoginAttemptScalarWhereInput = {
    AND?: LoginAttemptScalarWhereInput | LoginAttemptScalarWhereInput[]
    OR?: LoginAttemptScalarWhereInput[]
    NOT?: LoginAttemptScalarWhereInput | LoginAttemptScalarWhereInput[]
    id?: IntFilter<"LoginAttempt"> | number
    userId?: StringFilter<"LoginAttempt"> | string
    type?: EnumLoginAttemptTypeFilter<"LoginAttempt"> | $Enums.LoginAttemptType
    createdAt?: DateTimeFilter<"LoginAttempt"> | Date | string
  }

  export type EventCreateWithoutReferralInput = {
    transactionId: string
    id: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutReferralInput = {
    transactionId: string
    id: string
    userId: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type EventCreateOrConnectWithoutReferralInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutReferralInput, EventUncheckedCreateWithoutReferralInput>
  }

  export type UserCreateWithoutReferalsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferalsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferalsInput, UserUncheckedCreateWithoutReferalsInput>
  }

  export type EventUpsertWithoutReferralInput = {
    update: XOR<EventUpdateWithoutReferralInput, EventUncheckedUpdateWithoutReferralInput>
    create: XOR<EventCreateWithoutReferralInput, EventUncheckedCreateWithoutReferralInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutReferralInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutReferralInput, EventUncheckedUpdateWithoutReferralInput>
  }

  export type EventUpdateWithoutReferralInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutReferralInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type UserUpsertWithoutReferalsInput = {
    update: XOR<UserUpdateWithoutReferalsInput, UserUncheckedUpdateWithoutReferalsInput>
    create: XOR<UserCreateWithoutReferalsInput, UserUncheckedCreateWithoutReferalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferalsInput, UserUncheckedUpdateWithoutReferalsInput>
  }

  export type UserUpdateWithoutReferalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type ReferralCreateWithoutEventInput = {
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutReferalsInput
  }

  export type ReferralUncheckedCreateWithoutEventInput = {
    userId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type ReferralCreateOrConnectWithoutEventInput = {
    where: ReferralWhereUniqueInput
    create: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput>
  }

  export type ReferralCreateManyEventInputEnvelope = {
    data: ReferralCreateManyEventInput | ReferralCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReferralUpsertWithWhereUniqueWithoutEventInput = {
    where: ReferralWhereUniqueInput
    update: XOR<ReferralUpdateWithoutEventInput, ReferralUncheckedUpdateWithoutEventInput>
    create: XOR<ReferralCreateWithoutEventInput, ReferralUncheckedCreateWithoutEventInput>
  }

  export type ReferralUpdateWithWhereUniqueWithoutEventInput = {
    where: ReferralWhereUniqueInput
    data: XOR<ReferralUpdateWithoutEventInput, ReferralUncheckedUpdateWithoutEventInput>
  }

  export type ReferralUpdateManyWithWhereWithoutEventInput = {
    where: ReferralScalarWhereInput
    data: XOR<ReferralUpdateManyMutationInput, ReferralUncheckedUpdateManyWithoutEventInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLoginAttemptsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLoginAttemptsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLoginAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
  }

  export type UserUpsertWithoutLoginAttemptsInput = {
    update: XOR<UserUpdateWithoutLoginAttemptsInput, UserUncheckedUpdateWithoutLoginAttemptsInput>
    create: XOR<UserCreateWithoutLoginAttemptsInput, UserUncheckedCreateWithoutLoginAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoginAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoginAttemptsInput, UserUncheckedUpdateWithoutLoginAttemptsInput>
  }

  export type UserUpdateWithoutLoginAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLoginAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCompletedQuestRequirementsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompletedQuestRequirementsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompletedQuestRequirementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompletedQuestRequirementsInput, UserUncheckedCreateWithoutCompletedQuestRequirementsInput>
  }

  export type UserUpsertWithoutCompletedQuestRequirementsInput = {
    update: XOR<UserUpdateWithoutCompletedQuestRequirementsInput, UserUncheckedUpdateWithoutCompletedQuestRequirementsInput>
    create: XOR<UserCreateWithoutCompletedQuestRequirementsInput, UserUncheckedCreateWithoutCompletedQuestRequirementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompletedQuestRequirementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompletedQuestRequirementsInput, UserUncheckedUpdateWithoutCompletedQuestRequirementsInput>
  }

  export type UserUpdateWithoutCompletedQuestRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompletedQuestRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutQuestProgressInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestProgressInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuestProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestProgressInput, UserUncheckedCreateWithoutQuestProgressInput>
  }

  export type UserUpsertWithoutQuestProgressInput = {
    update: XOR<UserUpdateWithoutQuestProgressInput, UserUncheckedUpdateWithoutQuestProgressInput>
    create: XOR<UserCreateWithoutQuestProgressInput, UserUncheckedCreateWithoutQuestProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestProgressInput, UserUncheckedUpdateWithoutQuestProgressInput>
  }

  export type UserUpdateWithoutQuestProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSavedProgressInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedProgressInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedProgressInput, UserUncheckedCreateWithoutSavedProgressInput>
  }

  export type UserUpsertWithoutSavedProgressInput = {
    update: XOR<UserUpdateWithoutSavedProgressInput, UserUncheckedUpdateWithoutSavedProgressInput>
    create: XOR<UserCreateWithoutSavedProgressInput, UserUncheckedCreateWithoutSavedProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedProgressInput, UserUncheckedUpdateWithoutSavedProgressInput>
  }

  export type UserUpdateWithoutSavedProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentCreateNestedManyWithoutUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    transactions?: TransactionIntentUncheckedCreateNestedManyWithoutUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubmittedTransactionCreateWithoutTransactionInput = {
    transactionId: string
    status: string
    createdAt?: Date | string
  }

  export type SubmittedTransactionUncheckedCreateWithoutTransactionInput = {
    transactionId: string
    status: string
    createdAt?: Date | string
  }

  export type SubmittedTransactionCreateOrConnectWithoutTransactionInput = {
    where: SubmittedTransactionWhereUniqueInput
    create: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput>
  }

  export type SubmittedTransactionCreateManyTransactionInputEnvelope = {
    data: SubmittedTransactionCreateManyTransactionInput | SubmittedTransactionCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
    referredByUser?: UserCreateNestedOneWithoutReferredUsersInput
    events?: EventCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
    referredUsers?: UserCreateNestedManyWithoutReferredByUserInput
    referals?: ReferralCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    referredBy?: string | null
    status?: $Enums.UserStatus
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
    referredUsers?: UserUncheckedCreateNestedManyWithoutReferredByUserInput
    referals?: ReferralUncheckedCreateNestedManyWithoutUserInput
    loginAttempts?: LoginAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type BatchedTransactionIntentCreateWithoutTransactionIntentsInput = {
    id: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
  }

  export type BatchedTransactionIntentUncheckedCreateWithoutTransactionIntentsInput = {
    id: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
  }

  export type BatchedTransactionIntentCreateOrConnectWithoutTransactionIntentsInput = {
    where: BatchedTransactionIntentWhereUniqueInput
    create: XOR<BatchedTransactionIntentCreateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedCreateWithoutTransactionIntentsInput>
  }

  export type SubmittedTransactionUpsertWithWhereUniqueWithoutTransactionInput = {
    where: SubmittedTransactionWhereUniqueInput
    update: XOR<SubmittedTransactionUpdateWithoutTransactionInput, SubmittedTransactionUncheckedUpdateWithoutTransactionInput>
    create: XOR<SubmittedTransactionCreateWithoutTransactionInput, SubmittedTransactionUncheckedCreateWithoutTransactionInput>
  }

  export type SubmittedTransactionUpdateWithWhereUniqueWithoutTransactionInput = {
    where: SubmittedTransactionWhereUniqueInput
    data: XOR<SubmittedTransactionUpdateWithoutTransactionInput, SubmittedTransactionUncheckedUpdateWithoutTransactionInput>
  }

  export type SubmittedTransactionUpdateManyWithWhereWithoutTransactionInput = {
    where: SubmittedTransactionScalarWhereInput
    data: XOR<SubmittedTransactionUpdateManyMutationInput, SubmittedTransactionUncheckedUpdateManyWithoutTransactionInput>
  }

  export type SubmittedTransactionScalarWhereInput = {
    AND?: SubmittedTransactionScalarWhereInput | SubmittedTransactionScalarWhereInput[]
    OR?: SubmittedTransactionScalarWhereInput[]
    NOT?: SubmittedTransactionScalarWhereInput | SubmittedTransactionScalarWhereInput[]
    transactionId?: StringFilter<"SubmittedTransaction"> | string
    transactionIntent?: StringFilter<"SubmittedTransaction"> | string
    status?: StringFilter<"SubmittedTransaction"> | string
    createdAt?: DateTimeFilter<"SubmittedTransaction"> | Date | string
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    referredByUser?: UserUpdateOneWithoutReferredUsersNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    referredBy?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BatchedTransactionIntentUpsertWithoutTransactionIntentsInput = {
    update: XOR<BatchedTransactionIntentUpdateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedUpdateWithoutTransactionIntentsInput>
    create: XOR<BatchedTransactionIntentCreateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedCreateWithoutTransactionIntentsInput>
    where?: BatchedTransactionIntentWhereInput
  }

  export type BatchedTransactionIntentUpdateToOneWithWhereWithoutTransactionIntentsInput = {
    where?: BatchedTransactionIntentWhereInput
    data: XOR<BatchedTransactionIntentUpdateWithoutTransactionIntentsInput, BatchedTransactionIntentUncheckedUpdateWithoutTransactionIntentsInput>
  }

  export type BatchedTransactionIntentUpdateWithoutTransactionIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchedTransactionIntentUncheckedUpdateWithoutTransactionIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionIntentCreateWithoutBatchInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionCreateNestedManyWithoutTransactionInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionIntentUncheckedCreateWithoutBatchInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    userId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionIntentCreateOrConnectWithoutBatchInput = {
    where: TransactionIntentWhereUniqueInput
    create: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput>
  }

  export type TransactionIntentCreateManyBatchInputEnvelope = {
    data: TransactionIntentCreateManyBatchInput | TransactionIntentCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type TransactionIntentUpsertWithWhereUniqueWithoutBatchInput = {
    where: TransactionIntentWhereUniqueInput
    update: XOR<TransactionIntentUpdateWithoutBatchInput, TransactionIntentUncheckedUpdateWithoutBatchInput>
    create: XOR<TransactionIntentCreateWithoutBatchInput, TransactionIntentUncheckedCreateWithoutBatchInput>
  }

  export type TransactionIntentUpdateWithWhereUniqueWithoutBatchInput = {
    where: TransactionIntentWhereUniqueInput
    data: XOR<TransactionIntentUpdateWithoutBatchInput, TransactionIntentUncheckedUpdateWithoutBatchInput>
  }

  export type TransactionIntentUpdateManyWithWhereWithoutBatchInput = {
    where: TransactionIntentScalarWhereInput
    data: XOR<TransactionIntentUpdateManyMutationInput, TransactionIntentUncheckedUpdateManyWithoutBatchInput>
  }

  export type TransactionIntentCreateWithoutTransactionsInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutTransactionsInput
    batch?: BatchedTransactionIntentCreateNestedOneWithoutTransactionIntentsInput
  }

  export type TransactionIntentUncheckedCreateWithoutTransactionsInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    userId: string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: string | null
  }

  export type TransactionIntentCreateOrConnectWithoutTransactionsInput = {
    where: TransactionIntentWhereUniqueInput
    create: XOR<TransactionIntentCreateWithoutTransactionsInput, TransactionIntentUncheckedCreateWithoutTransactionsInput>
  }

  export type TransactionIntentUpsertWithoutTransactionsInput = {
    update: XOR<TransactionIntentUpdateWithoutTransactionsInput, TransactionIntentUncheckedUpdateWithoutTransactionsInput>
    create: XOR<TransactionIntentCreateWithoutTransactionsInput, TransactionIntentUncheckedCreateWithoutTransactionsInput>
    where?: TransactionIntentWhereInput
  }

  export type TransactionIntentUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: TransactionIntentWhereInput
    data: XOR<TransactionIntentUpdateWithoutTransactionsInput, TransactionIntentUncheckedUpdateWithoutTransactionsInput>
  }

  export type TransactionIntentUpdateWithoutTransactionsInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    batch?: BatchedTransactionIntentUpdateOneWithoutTransactionIntentsNestedInput
  }

  export type TransactionIntentUncheckedUpdateWithoutTransactionsInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateManyUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    status?: $Enums.EventStatus
    createdAt?: Date | string
    error?: string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type CompletedQuestRequirementCreateManyUserInput = {
    questId: string
    requirementId: string
    createdAt?: Date | string
  }

  export type AuditCreateManyUserInput = {
    transactionId: string
    date?: Date | string
    type: $Enums.AuditType
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    xrdPrice?: Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type QuestProgressCreateManyUserInput = {
    questId: string
    status?: $Enums.QuestStatus
  }

  export type UserCreateManyReferredByUserInput = {
    id?: string
    identityAddress: string
    createdAt?: Date | string
    accountAddress?: string | null
    name?: string | null
    country?: string | null
    type?: $Enums.UserType
    referralCode: string
    status?: $Enums.UserStatus
  }

  export type TransactionIntentCreateManyUserInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: string | null
  }

  export type ReferralCreateManyUserInput = {
    eventId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type LoginAttemptCreateManyUserInput = {
    id?: number
    type: $Enums.LoginAttemptType
    createdAt?: Date | string
  }

  export type EventUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
    referral?: ReferralUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type CompletedQuestRequirementUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedQuestRequirementUncheckedUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletedQuestRequirementUncheckedUpdateManyWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    requirementId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUncheckedUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type AuditUncheckedUpdateManyWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    xrdPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    data?: JsonNullValueInput | InputJsonValue
  }

  export type QuestProgressUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type QuestProgressUncheckedUpdateWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type QuestProgressUncheckedUpdateManyWithoutUserInput = {
    questId?: StringFieldUpdateOperationsInput | string
    status?: EnumQuestStatusFieldUpdateOperationsInput | $Enums.QuestStatus
  }

  export type UserUpdateWithoutReferredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
    referredUsers?: UserUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUpdateManyWithoutUserNestedInput
    referals?: ReferralUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
    referredUsers?: UserUncheckedUpdateManyWithoutReferredByUserNestedInput
    transactions?: TransactionIntentUncheckedUpdateManyWithoutUserNestedInput
    referals?: ReferralUncheckedUpdateManyWithoutUserNestedInput
    loginAttempts?: LoginAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutReferredByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    referralCode?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
  }

  export type TransactionIntentUpdateWithoutUserInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionUpdateManyWithoutTransactionNestedInput
    batch?: BatchedTransactionIntentUpdateOneWithoutTransactionIntentsNestedInput
  }

  export type TransactionIntentUncheckedUpdateWithoutUserInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: SubmittedTransactionUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionIntentUncheckedUpdateManyWithoutUserInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReferralUpdateWithoutUserInput = {
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    event?: EventUpdateOneRequiredWithoutReferralNestedInput
  }

  export type ReferralUncheckedUpdateWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReferralUncheckedUpdateManyWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type LoginAttemptUpdateWithoutUserInput = {
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumLoginAttemptTypeFieldUpdateOperationsInput | $Enums.LoginAttemptType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReferralCreateManyEventInput = {
    userId: string
    action: $Enums.ReferralAction
    xrdValue: Decimal | DecimalJsLike | number | string
  }

  export type ReferralUpdateWithoutEventInput = {
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutReferalsNestedInput
  }

  export type ReferralUncheckedUpdateWithoutEventInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReferralUncheckedUpdateManyWithoutEventInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumReferralActionFieldUpdateOperationsInput | $Enums.ReferralAction
    xrdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SubmittedTransactionCreateManyTransactionInput = {
    transactionId: string
    status: string
    createdAt?: Date | string
  }

  export type SubmittedTransactionUpdateWithoutTransactionInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedTransactionUncheckedUpdateWithoutTransactionInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmittedTransactionUncheckedUpdateManyWithoutTransactionInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionIntentCreateManyBatchInput = {
    discriminator: string
    status?: $Enums.TransactionIntentStatus
    createdAt?: Date | string
    error?: string | null
    userId: string
    data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TransactionIntentUpdateWithoutBatchInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionUpdateManyWithoutTransactionNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionIntentUncheckedUpdateWithoutBatchInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    transactions?: SubmittedTransactionUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionIntentUncheckedUpdateManyWithoutBatchInput = {
    discriminator?: StringFieldUpdateOperationsInput | string
    status?: EnumTransactionIntentStatusFieldUpdateOperationsInput | $Enums.TransactionIntentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventCountOutputTypeDefaultArgs instead
     */
    export type EventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionIntentCountOutputTypeDefaultArgs instead
     */
    export type TransactionIntentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BatchedTransactionIntentCountOutputTypeDefaultArgs instead
     */
    export type BatchedTransactionIntentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchedTransactionIntentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ImageDefaultArgs instead
     */
    export type ImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReferralDefaultArgs instead
     */
    export type ReferralArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReferralDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChallengeDefaultArgs instead
     */
    export type ChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChallengeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventDefaultArgs instead
     */
    export type EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LoginAttemptDefaultArgs instead
     */
    export type LoginAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoginAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompletedQuestRequirementDefaultArgs instead
     */
    export type CompletedQuestRequirementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompletedQuestRequirementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestProgressDefaultArgs instead
     */
    export type QuestProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SavedProgressDefaultArgs instead
     */
    export type SavedProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SavedProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditDefaultArgs instead
     */
    export type AuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionIntentDefaultArgs instead
     */
    export type TransactionIntentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionIntentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BatchedTransactionIntentDefaultArgs instead
     */
    export type BatchedTransactionIntentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchedTransactionIntentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubmittedTransactionDefaultArgs instead
     */
    export type SubmittedTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubmittedTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConfigDefaultArgs instead
     */
    export type ConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

/**
 * Client
**/

import * as runtime from './runtime/library';
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
 * Model UserPhoneNumber
 * 
 */
export type UserPhoneNumber = $Result.DefaultSelection<Prisma.$UserPhoneNumberPayload>
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
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EventError: {
  ERROR_INVALID_DATA: 'ERROR_INVALID_DATA',
  ERROR_USER_NOT_FOUND: 'ERROR_USER_NOT_FOUND',
  ERROR_UNHANDLED_EVENT: 'ERROR_UNHANDLED_EVENT'
};

export type EventError = (typeof EventError)[keyof typeof EventError]


export const QuestStatus: {
  IN_PROGRESS: 'IN_PROGRESS',
  REWARDS_DEPOSITED: 'REWARDS_DEPOSITED',
  REWARDS_CLAIMED: 'REWARDS_CLAIMED',
  COMPLETED: 'COMPLETED'
};

export type QuestStatus = (typeof QuestStatus)[keyof typeof QuestStatus]


export const AuditType: {
  DIRECT_DEPOSIT: 'DIRECT_DEPOSIT',
  CLAIMBOX_DEPOSIT: 'CLAIMBOX_DEPOSIT'
};

export type AuditType = (typeof AuditType)[keyof typeof AuditType]


export const TransactionStatus: {
  PENDING: 'PENDING',
  ERROR_KYC_REQUIRED: 'ERROR_KYC_REQUIRED',
  ERROR_FAILED_TO_SUBMIT: 'ERROR_FAILED_TO_SUBMIT',
  ERROR_TIMEOUT: 'ERROR_TIMEOUT',
  ERROR_UNKNOWN: 'ERROR_UNKNOWN',
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS'
};

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]

}

export type EventError = $Enums.EventError

export const EventError: typeof $Enums.EventError

export type QuestStatus = $Enums.QuestStatus

export const QuestStatus: typeof $Enums.QuestStatus

export type AuditType = $Enums.AuditType

export const AuditType: typeof $Enums.AuditType

export type TransactionStatus = $Enums.TransactionStatus

export const TransactionStatus: typeof $Enums.TransactionStatus

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
   * `prisma.userPhoneNumber`: Exposes CRUD operations for the **UserPhoneNumber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPhoneNumbers
    * const userPhoneNumbers = await prisma.userPhoneNumber.findMany()
    * ```
    */
  get userPhoneNumber(): Prisma.UserPhoneNumberDelegate<ExtArgs>;

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
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs>;
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
   * Prisma Client JS version: 5.7.1
   * Query Engine version: 0ca5ccbcfa6bdc81c003cf549abe4269f59c41e5
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
    UserPhoneNumber: 'UserPhoneNumber',
    Challenge: 'Challenge',
    Event: 'Event',
    Notification: 'Notification',
    CompletedQuestRequirement: 'CompletedQuestRequirement',
    QuestProgress: 'QuestProgress',
    SavedProgress: 'SavedProgress',
    Audit: 'Audit',
    Transaction: 'Transaction'
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
      modelProps: 'user' | 'userPhoneNumber' | 'challenge' | 'event' | 'notification' | 'completedQuestRequirement' | 'questProgress' | 'savedProgress' | 'audit' | 'transaction'
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
      UserPhoneNumber: {
        payload: Prisma.$UserPhoneNumberPayload<ExtArgs>
        fields: Prisma.UserPhoneNumberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPhoneNumberFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPhoneNumberFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          findFirst: {
            args: Prisma.UserPhoneNumberFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPhoneNumberFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          findMany: {
            args: Prisma.UserPhoneNumberFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>[]
          }
          create: {
            args: Prisma.UserPhoneNumberCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          createMany: {
            args: Prisma.UserPhoneNumberCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserPhoneNumberDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          update: {
            args: Prisma.UserPhoneNumberUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          deleteMany: {
            args: Prisma.UserPhoneNumberDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserPhoneNumberUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserPhoneNumberUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPhoneNumberPayload>
          }
          aggregate: {
            args: Prisma.UserPhoneNumberAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserPhoneNumber>
          }
          groupBy: {
            args: Prisma.UserPhoneNumberGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserPhoneNumberGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPhoneNumberCountArgs<ExtArgs>,
            result: $Utils.Optional<UserPhoneNumberCountAggregateOutputType> | number
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
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>,
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
    notifications: number
    completedQuestRequirements: number
    auditLogs: number
    questProgress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    completedQuestRequirements?: boolean | UserCountOutputTypeCountCompletedQuestRequirementsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    questProgress?: boolean | UserCountOutputTypeCountQuestProgressArgs
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
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
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
    accountAddress: string | null
    name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    identityAddress: string | null
    accountAddress: string | null
    name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    identityAddress: number
    accountAddress: number
    name: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    identityAddress?: true
    accountAddress?: true
    name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    identityAddress?: true
    accountAddress?: true
    name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    identityAddress?: true
    accountAddress?: true
    name?: true
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
    accountAddress: string | null
    name: string | null
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
    accountAddress?: boolean
    name?: boolean
    events?: boolean | User$eventsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    phoneNumber?: boolean | User$phoneNumberArgs<ExtArgs>
    completedQuestRequirements?: boolean | User$completedQuestRequirementsArgs<ExtArgs>
    savedProgress?: boolean | User$savedProgressArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    questProgress?: boolean | User$questProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    identityAddress?: boolean
    accountAddress?: boolean
    name?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | User$eventsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    phoneNumber?: boolean | User$phoneNumberArgs<ExtArgs>
    completedQuestRequirements?: boolean | User$completedQuestRequirementsArgs<ExtArgs>
    savedProgress?: boolean | User$savedProgressArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    questProgress?: boolean | User$questProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      phoneNumber: Prisma.$UserPhoneNumberPayload<ExtArgs> | null
      completedQuestRequirements: Prisma.$CompletedQuestRequirementPayload<ExtArgs>[]
      savedProgress: Prisma.$SavedProgressPayload<ExtArgs> | null
      auditLogs: Prisma.$AuditPayload<ExtArgs>[]
      questProgress: Prisma.$QuestProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identityAddress: string
      accountAddress: string | null
      name: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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

    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findMany'> | Null>;

    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, 'findMany'> | Null>;

    phoneNumber<T extends User$phoneNumberArgs<ExtArgs> = {}>(args?: Subset<T, User$phoneNumberArgs<ExtArgs>>): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    completedQuestRequirements<T extends User$completedQuestRequirementsArgs<ExtArgs> = {}>(args?: Subset<T, User$completedQuestRequirementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletedQuestRequirementPayload<ExtArgs>, T, 'findMany'> | Null>;

    savedProgress<T extends User$savedProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$savedProgressArgs<ExtArgs>>): Prisma__SavedProgressClient<$Result.GetResult<Prisma.$SavedProgressPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditPayload<ExtArgs>, T, 'findMany'> | Null>;

    questProgress<T extends User$questProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$questProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestProgressPayload<ExtArgs>, T, 'findMany'> | Null>;

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
    readonly accountAddress: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }


  /**
   * User.phoneNumber
   */
  export type User$phoneNumberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    where?: UserPhoneNumberWhereInput
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model UserPhoneNumber
   */

  export type AggregateUserPhoneNumber = {
    _count: UserPhoneNumberCountAggregateOutputType | null
    _min: UserPhoneNumberMinAggregateOutputType | null
    _max: UserPhoneNumberMaxAggregateOutputType | null
  }

  export type UserPhoneNumberMinAggregateOutputType = {
    userId: string | null
    phoneNumber: string | null
    createdAt: Date | null
  }

  export type UserPhoneNumberMaxAggregateOutputType = {
    userId: string | null
    phoneNumber: string | null
    createdAt: Date | null
  }

  export type UserPhoneNumberCountAggregateOutputType = {
    userId: number
    phoneNumber: number
    createdAt: number
    _all: number
  }


  export type UserPhoneNumberMinAggregateInputType = {
    userId?: true
    phoneNumber?: true
    createdAt?: true
  }

  export type UserPhoneNumberMaxAggregateInputType = {
    userId?: true
    phoneNumber?: true
    createdAt?: true
  }

  export type UserPhoneNumberCountAggregateInputType = {
    userId?: true
    phoneNumber?: true
    createdAt?: true
    _all?: true
  }

  export type UserPhoneNumberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPhoneNumber to aggregate.
     */
    where?: UserPhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPhoneNumbers to fetch.
     */
    orderBy?: UserPhoneNumberOrderByWithRelationInput | UserPhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPhoneNumbers
    **/
    _count?: true | UserPhoneNumberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPhoneNumberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPhoneNumberMaxAggregateInputType
  }

  export type GetUserPhoneNumberAggregateType<T extends UserPhoneNumberAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPhoneNumber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPhoneNumber[P]>
      : GetScalarType<T[P], AggregateUserPhoneNumber[P]>
  }




  export type UserPhoneNumberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPhoneNumberWhereInput
    orderBy?: UserPhoneNumberOrderByWithAggregationInput | UserPhoneNumberOrderByWithAggregationInput[]
    by: UserPhoneNumberScalarFieldEnum[] | UserPhoneNumberScalarFieldEnum
    having?: UserPhoneNumberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPhoneNumberCountAggregateInputType | true
    _min?: UserPhoneNumberMinAggregateInputType
    _max?: UserPhoneNumberMaxAggregateInputType
  }

  export type UserPhoneNumberGroupByOutputType = {
    userId: string
    phoneNumber: string
    createdAt: Date
    _count: UserPhoneNumberCountAggregateOutputType | null
    _min: UserPhoneNumberMinAggregateOutputType | null
    _max: UserPhoneNumberMaxAggregateOutputType | null
  }

  type GetUserPhoneNumberGroupByPayload<T extends UserPhoneNumberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPhoneNumberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPhoneNumberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPhoneNumberGroupByOutputType[P]>
            : GetScalarType<T[P], UserPhoneNumberGroupByOutputType[P]>
        }
      >
    >


  export type UserPhoneNumberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPhoneNumber"]>

  export type UserPhoneNumberSelectScalar = {
    userId?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
  }

  export type UserPhoneNumberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $UserPhoneNumberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPhoneNumber"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      phoneNumber: string
      createdAt: Date
    }, ExtArgs["result"]["userPhoneNumber"]>
    composites: {}
  }


  type UserPhoneNumberGetPayload<S extends boolean | null | undefined | UserPhoneNumberDefaultArgs> = $Result.GetResult<Prisma.$UserPhoneNumberPayload, S>

  type UserPhoneNumberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserPhoneNumberFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: UserPhoneNumberCountAggregateInputType | true
    }

  export interface UserPhoneNumberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPhoneNumber'], meta: { name: 'UserPhoneNumber' } }
    /**
     * Find zero or one UserPhoneNumber that matches the filter.
     * @param {UserPhoneNumberFindUniqueArgs} args - Arguments to find a UserPhoneNumber
     * @example
     * // Get one UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserPhoneNumberFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberFindUniqueArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserPhoneNumber that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserPhoneNumberFindUniqueOrThrowArgs} args - Arguments to find a UserPhoneNumber
     * @example
     * // Get one UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserPhoneNumberFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserPhoneNumber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberFindFirstArgs} args - Arguments to find a UserPhoneNumber
     * @example
     * // Get one UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserPhoneNumberFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberFindFirstArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserPhoneNumber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberFindFirstOrThrowArgs} args - Arguments to find a UserPhoneNumber
     * @example
     * // Get one UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserPhoneNumberFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserPhoneNumbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPhoneNumbers
     * const userPhoneNumbers = await prisma.userPhoneNumber.findMany()
     * 
     * // Get first 10 UserPhoneNumbers
     * const userPhoneNumbers = await prisma.userPhoneNumber.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userPhoneNumberWithUserIdOnly = await prisma.userPhoneNumber.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends UserPhoneNumberFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserPhoneNumber.
     * @param {UserPhoneNumberCreateArgs} args - Arguments to create a UserPhoneNumber.
     * @example
     * // Create one UserPhoneNumber
     * const UserPhoneNumber = await prisma.userPhoneNumber.create({
     *   data: {
     *     // ... data to create a UserPhoneNumber
     *   }
     * })
     * 
    **/
    create<T extends UserPhoneNumberCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberCreateArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserPhoneNumbers.
     *     @param {UserPhoneNumberCreateManyArgs} args - Arguments to create many UserPhoneNumbers.
     *     @example
     *     // Create many UserPhoneNumbers
     *     const userPhoneNumber = await prisma.userPhoneNumber.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserPhoneNumberCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserPhoneNumber.
     * @param {UserPhoneNumberDeleteArgs} args - Arguments to delete one UserPhoneNumber.
     * @example
     * // Delete one UserPhoneNumber
     * const UserPhoneNumber = await prisma.userPhoneNumber.delete({
     *   where: {
     *     // ... filter to delete one UserPhoneNumber
     *   }
     * })
     * 
    **/
    delete<T extends UserPhoneNumberDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberDeleteArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserPhoneNumber.
     * @param {UserPhoneNumberUpdateArgs} args - Arguments to update one UserPhoneNumber.
     * @example
     * // Update one UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserPhoneNumberUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberUpdateArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserPhoneNumbers.
     * @param {UserPhoneNumberDeleteManyArgs} args - Arguments to filter UserPhoneNumbers to delete.
     * @example
     * // Delete a few UserPhoneNumbers
     * const { count } = await prisma.userPhoneNumber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserPhoneNumberDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPhoneNumberDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPhoneNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPhoneNumbers
     * const userPhoneNumber = await prisma.userPhoneNumber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserPhoneNumberUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserPhoneNumber.
     * @param {UserPhoneNumberUpsertArgs} args - Arguments to update or create a UserPhoneNumber.
     * @example
     * // Update or create a UserPhoneNumber
     * const userPhoneNumber = await prisma.userPhoneNumber.upsert({
     *   create: {
     *     // ... data to create a UserPhoneNumber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPhoneNumber we want to update
     *   }
     * })
    **/
    upsert<T extends UserPhoneNumberUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserPhoneNumberUpsertArgs<ExtArgs>>
    ): Prisma__UserPhoneNumberClient<$Result.GetResult<Prisma.$UserPhoneNumberPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserPhoneNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberCountArgs} args - Arguments to filter UserPhoneNumbers to count.
     * @example
     * // Count the number of UserPhoneNumbers
     * const count = await prisma.userPhoneNumber.count({
     *   where: {
     *     // ... the filter for the UserPhoneNumbers we want to count
     *   }
     * })
    **/
    count<T extends UserPhoneNumberCountArgs>(
      args?: Subset<T, UserPhoneNumberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPhoneNumberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPhoneNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserPhoneNumberAggregateArgs>(args: Subset<T, UserPhoneNumberAggregateArgs>): Prisma.PrismaPromise<GetUserPhoneNumberAggregateType<T>>

    /**
     * Group by UserPhoneNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPhoneNumberGroupByArgs} args - Group by arguments.
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
      T extends UserPhoneNumberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPhoneNumberGroupByArgs['orderBy'] }
        : { orderBy?: UserPhoneNumberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserPhoneNumberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPhoneNumberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPhoneNumber model
   */
  readonly fields: UserPhoneNumberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPhoneNumber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPhoneNumberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UserPhoneNumber model
   */ 
  interface UserPhoneNumberFieldRefs {
    readonly userId: FieldRef<"UserPhoneNumber", 'String'>
    readonly phoneNumber: FieldRef<"UserPhoneNumber", 'String'>
    readonly createdAt: FieldRef<"UserPhoneNumber", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * UserPhoneNumber findUnique
   */
  export type UserPhoneNumberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which UserPhoneNumber to fetch.
     */
    where: UserPhoneNumberWhereUniqueInput
  }


  /**
   * UserPhoneNumber findUniqueOrThrow
   */
  export type UserPhoneNumberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which UserPhoneNumber to fetch.
     */
    where: UserPhoneNumberWhereUniqueInput
  }


  /**
   * UserPhoneNumber findFirst
   */
  export type UserPhoneNumberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which UserPhoneNumber to fetch.
     */
    where?: UserPhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPhoneNumbers to fetch.
     */
    orderBy?: UserPhoneNumberOrderByWithRelationInput | UserPhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPhoneNumbers.
     */
    cursor?: UserPhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPhoneNumbers.
     */
    distinct?: UserPhoneNumberScalarFieldEnum | UserPhoneNumberScalarFieldEnum[]
  }


  /**
   * UserPhoneNumber findFirstOrThrow
   */
  export type UserPhoneNumberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which UserPhoneNumber to fetch.
     */
    where?: UserPhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPhoneNumbers to fetch.
     */
    orderBy?: UserPhoneNumberOrderByWithRelationInput | UserPhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPhoneNumbers.
     */
    cursor?: UserPhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPhoneNumbers.
     */
    distinct?: UserPhoneNumberScalarFieldEnum | UserPhoneNumberScalarFieldEnum[]
  }


  /**
   * UserPhoneNumber findMany
   */
  export type UserPhoneNumberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which UserPhoneNumbers to fetch.
     */
    where?: UserPhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPhoneNumbers to fetch.
     */
    orderBy?: UserPhoneNumberOrderByWithRelationInput | UserPhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPhoneNumbers.
     */
    cursor?: UserPhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPhoneNumbers.
     */
    skip?: number
    distinct?: UserPhoneNumberScalarFieldEnum | UserPhoneNumberScalarFieldEnum[]
  }


  /**
   * UserPhoneNumber create
   */
  export type UserPhoneNumberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPhoneNumber.
     */
    data: XOR<UserPhoneNumberCreateInput, UserPhoneNumberUncheckedCreateInput>
  }


  /**
   * UserPhoneNumber createMany
   */
  export type UserPhoneNumberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPhoneNumbers.
     */
    data: UserPhoneNumberCreateManyInput | UserPhoneNumberCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserPhoneNumber update
   */
  export type UserPhoneNumberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPhoneNumber.
     */
    data: XOR<UserPhoneNumberUpdateInput, UserPhoneNumberUncheckedUpdateInput>
    /**
     * Choose, which UserPhoneNumber to update.
     */
    where: UserPhoneNumberWhereUniqueInput
  }


  /**
   * UserPhoneNumber updateMany
   */
  export type UserPhoneNumberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPhoneNumbers.
     */
    data: XOR<UserPhoneNumberUpdateManyMutationInput, UserPhoneNumberUncheckedUpdateManyInput>
    /**
     * Filter which UserPhoneNumbers to update
     */
    where?: UserPhoneNumberWhereInput
  }


  /**
   * UserPhoneNumber upsert
   */
  export type UserPhoneNumberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPhoneNumber to update in case it exists.
     */
    where: UserPhoneNumberWhereUniqueInput
    /**
     * In case the UserPhoneNumber found by the `where` argument doesn't exist, create a new UserPhoneNumber with this data.
     */
    create: XOR<UserPhoneNumberCreateInput, UserPhoneNumberUncheckedCreateInput>
    /**
     * In case the UserPhoneNumber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPhoneNumberUpdateInput, UserPhoneNumberUncheckedUpdateInput>
  }


  /**
   * UserPhoneNumber delete
   */
  export type UserPhoneNumberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
    /**
     * Filter which UserPhoneNumber to delete.
     */
    where: UserPhoneNumberWhereUniqueInput
  }


  /**
   * UserPhoneNumber deleteMany
   */
  export type UserPhoneNumberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPhoneNumbers to delete
     */
    where?: UserPhoneNumberWhereInput
  }


  /**
   * UserPhoneNumber without action
   */
  export type UserPhoneNumberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPhoneNumber
     */
    select?: UserPhoneNumberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPhoneNumberInclude<ExtArgs> | null
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
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one Challenge that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {ChallengeFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     *     @example
     *     // Create many Challenges
     *     const challenge = await prisma.challenge.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChallengeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    questId: string | null
    userId: string | null
    createdAt: Date | null
    processedAt: Date | null
    error: $Enums.EventError | null
  }

  export type EventMaxAggregateOutputType = {
    transactionId: string | null
    id: string | null
    questId: string | null
    userId: string | null
    createdAt: Date | null
    processedAt: Date | null
    error: $Enums.EventError | null
  }

  export type EventCountAggregateOutputType = {
    transactionId: number
    id: number
    questId: number
    userId: number
    createdAt: number
    processedAt: number
    error: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    transactionId?: true
    id?: true
    questId?: true
    userId?: true
    createdAt?: true
    processedAt?: true
    error?: true
  }

  export type EventMaxAggregateInputType = {
    transactionId?: true
    id?: true
    questId?: true
    userId?: true
    createdAt?: true
    processedAt?: true
    error?: true
  }

  export type EventCountAggregateInputType = {
    transactionId?: true
    id?: true
    questId?: true
    userId?: true
    createdAt?: true
    processedAt?: true
    error?: true
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
    questId: string | null
    userId: string | null
    createdAt: Date
    processedAt: Date | null
    error: $Enums.EventError | null
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
    questId?: boolean
    userId?: boolean
    createdAt?: boolean
    processedAt?: boolean
    error?: boolean
    user?: boolean | Event$userArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    transactionId?: boolean
    id?: boolean
    questId?: boolean
    userId?: boolean
    createdAt?: boolean
    processedAt?: boolean
    error?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Event$userArgs<ExtArgs>
  }


  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      transactionId: string
      id: string
      questId: string | null
      userId: string | null
      createdAt: Date
      processedAt: Date | null
      error: $Enums.EventError | null
    }, ExtArgs["result"]["event"]>
    composites: {}
  }


  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one Event that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {EventFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {EventCreateManyArgs} args - Arguments to create many Events.
     *     @example
     *     // Create many Events
     *     const event = await prisma.event.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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

    user<T extends Event$userArgs<ExtArgs> = {}>(args?: Subset<T, Event$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

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
    readonly questId: FieldRef<"Event", 'String'>
    readonly userId: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly processedAt: FieldRef<"Event", 'DateTime'>
    readonly error: FieldRef<"Event", 'EventError'>
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * Event.user
   */
  export type Event$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
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
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
  }



  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: string | null
    createdAt: Date | null
    seenAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    createdAt: Date | null
    seenAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    seenAt: number
    data: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    seenAt?: true
    data?: true
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
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
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
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: string
    createdAt: Date
    seenAt: Date | null
    data: JsonValue
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
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
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    seenAt?: boolean
    data?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    seenAt?: boolean
    data?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      createdAt: Date
      seenAt: Date | null
      data: Prisma.JsonValue
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }


  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one Notification that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {NotificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
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
     *     @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     *     @example
     *     // Create many Notifications
     *     const notification = await prisma.notification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly seenAt: FieldRef<"Notification", 'DateTime'>
    readonly data: FieldRef<"Notification", 'Json'>
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
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

  export type CompletedQuestRequirementSelectScalar = {
    questId?: boolean
    userId?: boolean
    requirementId?: boolean
    createdAt?: boolean
  }

  export type CompletedQuestRequirementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    Omit<CompletedQuestRequirementFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one CompletedQuestRequirement that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {CompletedQuestRequirementFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {CompletedQuestRequirementCreateManyArgs} args - Arguments to create many CompletedQuestRequirements.
     *     @example
     *     // Create many CompletedQuestRequirements
     *     const completedQuestRequirement = await prisma.completedQuestRequirement.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CompletedQuestRequirementCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompletedQuestRequirementCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * CompletedQuestRequirement update
   */
  export type CompletedQuestRequirementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletedQuestRequirement
     */
    select?: CompletedQuestRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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

  export type QuestProgressSelectScalar = {
    questId?: boolean
    userId?: boolean
    status?: boolean
  }

  export type QuestProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    Omit<QuestProgressFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one QuestProgress that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {QuestProgressFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {QuestProgressCreateManyArgs} args - Arguments to create many QuestProgresses.
     *     @example
     *     // Create many QuestProgresses
     *     const questProgress = await prisma.questProgress.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends QuestProgressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, QuestProgressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * QuestProgress update
   */
  export type QuestProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestProgress
     */
    select?: QuestProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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

  export type SavedProgressSelectScalar = {
    userId?: boolean
    questId?: boolean
    progress?: boolean
  }

  export type SavedProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    Omit<SavedProgressFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one SavedProgress that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {SavedProgressFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {SavedProgressCreateManyArgs} args - Arguments to create many SavedProgresses.
     *     @example
     *     // Create many SavedProgresses
     *     const savedProgress = await prisma.savedProgress.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SavedProgressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SavedProgressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * SavedProgress update
   */
  export type SavedProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProgress
     */
    select?: SavedProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
  }

  export type AuditSumAggregateOutputType = {
    xrdUsdValue: Decimal | null
  }

  export type AuditMinAggregateOutputType = {
    transactionId: string | null
    userId: string | null
    date: Date | null
    type: $Enums.AuditType | null
    xrdUsdValue: Decimal | null
  }

  export type AuditMaxAggregateOutputType = {
    transactionId: string | null
    userId: string | null
    date: Date | null
    type: $Enums.AuditType | null
    xrdUsdValue: Decimal | null
  }

  export type AuditCountAggregateOutputType = {
    transactionId: number
    userId: number
    date: number
    type: number
    metadata: number
    xrdUsdValue: number
    _all: number
  }


  export type AuditAvgAggregateInputType = {
    xrdUsdValue?: true
  }

  export type AuditSumAggregateInputType = {
    xrdUsdValue?: true
  }

  export type AuditMinAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    xrdUsdValue?: true
  }

  export type AuditMaxAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    xrdUsdValue?: true
  }

  export type AuditCountAggregateInputType = {
    transactionId?: true
    userId?: true
    date?: true
    type?: true
    metadata?: true
    xrdUsdValue?: true
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
    metadata: JsonValue
    xrdUsdValue: Decimal
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
    metadata?: boolean
    xrdUsdValue?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audit"]>

  export type AuditSelectScalar = {
    transactionId?: boolean
    userId?: boolean
    date?: boolean
    type?: boolean
    metadata?: boolean
    xrdUsdValue?: boolean
  }

  export type AuditInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
      metadata: Prisma.JsonValue
      xrdUsdValue: Prisma.Decimal
    }, ExtArgs["result"]["audit"]>
    composites: {}
  }


  type AuditGetPayload<S extends boolean | null | undefined | AuditDefaultArgs> = $Result.GetResult<Prisma.$AuditPayload, S>

  type AuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditFindManyArgs, 'select' | 'include' | 'distinct' > & {
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
     * Find one Audit that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
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
     * @param {AuditFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     *     @param {AuditCreateManyArgs} args - Arguments to create many Audits.
     *     @example
     *     // Create many Audits
     *     const audit = await prisma.audit.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuditCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    readonly metadata: FieldRef<"Audit", 'Json'>
    readonly xrdUsdValue: FieldRef<"Audit", 'Decimal'>
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * Audit update
   */
  export type AuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Audit
     */
    select?: AuditSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditInclude<ExtArgs> | null
  }



  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    attempt: number | null
  }

  export type TransactionSumAggregateOutputType = {
    attempt: number | null
  }

  export type TransactionMinAggregateOutputType = {
    attempt: number | null
    transactionKey: string | null
    transactionId: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
    error: string | null
    badgeId: string | null
    badgeResourceAddress: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    attempt: number | null
    transactionKey: string | null
    transactionId: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
    error: string | null
    badgeId: string | null
    badgeResourceAddress: string | null
  }

  export type TransactionCountAggregateOutputType = {
    attempt: number
    transactionKey: number
    transactionId: number
    status: number
    createdAt: number
    error: number
    badgeId: number
    badgeResourceAddress: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    attempt?: true
  }

  export type TransactionSumAggregateInputType = {
    attempt?: true
  }

  export type TransactionMinAggregateInputType = {
    attempt?: true
    transactionKey?: true
    transactionId?: true
    status?: true
    createdAt?: true
    error?: true
    badgeId?: true
    badgeResourceAddress?: true
  }

  export type TransactionMaxAggregateInputType = {
    attempt?: true
    transactionKey?: true
    transactionId?: true
    status?: true
    createdAt?: true
    error?: true
    badgeId?: true
    badgeResourceAddress?: true
  }

  export type TransactionCountAggregateInputType = {
    attempt?: true
    transactionKey?: true
    transactionId?: true
    status?: true
    createdAt?: true
    error?: true
    badgeId?: true
    badgeResourceAddress?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    attempt: number
    transactionKey: string
    transactionId: string | null
    status: $Enums.TransactionStatus
    createdAt: Date
    error: string | null
    badgeId: string
    badgeResourceAddress: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    attempt?: boolean
    transactionKey?: boolean
    transactionId?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    badgeId?: boolean
    badgeResourceAddress?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    attempt?: boolean
    transactionKey?: boolean
    transactionId?: boolean
    status?: boolean
    createdAt?: boolean
    error?: boolean
    badgeId?: boolean
    badgeResourceAddress?: boolean
  }


  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      attempt: number
      transactionKey: string
      transactionId: string | null
      status: $Enums.TransactionStatus
      createdAt: Date
      error: string | null
      badgeId: string
      badgeResourceAddress: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }


  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Transaction that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `attempt`
     * const transactionWithAttemptOnly = await prisma.transaction.findMany({ select: { attempt: true } })
     * 
    **/
    findMany<T extends TransactionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
    **/
    create<T extends TransactionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Transactions.
     *     @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     *     @example
     *     // Create many Transactions
     *     const transaction = await prisma.transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
    **/
    delete<T extends TransactionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Transaction model
   */ 
  interface TransactionFieldRefs {
    readonly attempt: FieldRef<"Transaction", 'Int'>
    readonly transactionKey: FieldRef<"Transaction", 'String'>
    readonly transactionId: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'TransactionStatus'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly error: FieldRef<"Transaction", 'String'>
    readonly badgeId: FieldRef<"Transaction", 'String'>
    readonly badgeResourceAddress: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }


  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
  }


  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }


  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
  }


  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
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
    accountAddress: 'accountAddress',
    name: 'name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserPhoneNumberScalarFieldEnum: {
    userId: 'userId',
    phoneNumber: 'phoneNumber',
    createdAt: 'createdAt'
  };

  export type UserPhoneNumberScalarFieldEnum = (typeof UserPhoneNumberScalarFieldEnum)[keyof typeof UserPhoneNumberScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    challenge: 'challenge',
    createdAt: 'createdAt'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const EventScalarFieldEnum: {
    transactionId: 'transactionId',
    id: 'id',
    questId: 'questId',
    userId: 'userId',
    createdAt: 'createdAt',
    processedAt: 'processedAt',
    error: 'error'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    seenAt: 'seenAt',
    data: 'data'
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
    metadata: 'metadata',
    xrdUsdValue: 'xrdUsdValue'
  };

  export type AuditScalarFieldEnum = (typeof AuditScalarFieldEnum)[keyof typeof AuditScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    attempt: 'attempt',
    transactionKey: 'transactionKey',
    transactionId: 'transactionId',
    status: 'status',
    createdAt: 'createdAt',
    error: 'error',
    badgeId: 'badgeId',
    badgeResourceAddress: 'badgeResourceAddress'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'EventError'
   */
  export type EnumEventErrorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventError'>
    


  /**
   * Reference to a field of type 'EventError[]'
   */
  export type ListEnumEventErrorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventError[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus'>
    


  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>
    


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
    accountAddress?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    events?: EventListRelationFilter
    notifications?: NotificationListRelationFilter
    phoneNumber?: XOR<UserPhoneNumberNullableRelationFilter, UserPhoneNumberWhereInput> | null
    completedQuestRequirements?: CompletedQuestRequirementListRelationFilter
    savedProgress?: XOR<SavedProgressNullableRelationFilter, SavedProgressWhereInput> | null
    auditLogs?: AuditListRelationFilter
    questProgress?: QuestProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    accountAddress?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    events?: EventOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    phoneNumber?: UserPhoneNumberOrderByWithRelationInput
    completedQuestRequirements?: CompletedQuestRequirementOrderByRelationAggregateInput
    savedProgress?: SavedProgressOrderByWithRelationInput
    auditLogs?: AuditOrderByRelationAggregateInput
    questProgress?: QuestProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    identityAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    accountAddress?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    events?: EventListRelationFilter
    notifications?: NotificationListRelationFilter
    phoneNumber?: XOR<UserPhoneNumberNullableRelationFilter, UserPhoneNumberWhereInput> | null
    completedQuestRequirements?: CompletedQuestRequirementListRelationFilter
    savedProgress?: XOR<SavedProgressNullableRelationFilter, SavedProgressWhereInput> | null
    auditLogs?: AuditListRelationFilter
    questProgress?: QuestProgressListRelationFilter
  }, "id" | "identityAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    accountAddress?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
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
    accountAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserPhoneNumberWhereInput = {
    AND?: UserPhoneNumberWhereInput | UserPhoneNumberWhereInput[]
    OR?: UserPhoneNumberWhereInput[]
    NOT?: UserPhoneNumberWhereInput | UserPhoneNumberWhereInput[]
    userId?: StringFilter<"UserPhoneNumber"> | string
    phoneNumber?: StringFilter<"UserPhoneNumber"> | string
    createdAt?: DateTimeFilter<"UserPhoneNumber"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserPhoneNumberOrderByWithRelationInput = {
    userId?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserPhoneNumberWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    phoneNumber?: string
    AND?: UserPhoneNumberWhereInput | UserPhoneNumberWhereInput[]
    OR?: UserPhoneNumberWhereInput[]
    NOT?: UserPhoneNumberWhereInput | UserPhoneNumberWhereInput[]
    createdAt?: DateTimeFilter<"UserPhoneNumber"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "phoneNumber" | "userId" | "phoneNumber">

  export type UserPhoneNumberOrderByWithAggregationInput = {
    userId?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    _count?: UserPhoneNumberCountOrderByAggregateInput
    _max?: UserPhoneNumberMaxOrderByAggregateInput
    _min?: UserPhoneNumberMinOrderByAggregateInput
  }

  export type UserPhoneNumberScalarWhereWithAggregatesInput = {
    AND?: UserPhoneNumberScalarWhereWithAggregatesInput | UserPhoneNumberScalarWhereWithAggregatesInput[]
    OR?: UserPhoneNumberScalarWhereWithAggregatesInput[]
    NOT?: UserPhoneNumberScalarWhereWithAggregatesInput | UserPhoneNumberScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserPhoneNumber"> | string
    phoneNumber?: StringWithAggregatesFilter<"UserPhoneNumber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserPhoneNumber"> | Date | string
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
    questId?: StringNullableFilter<"Event"> | string | null
    userId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    processedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    error?: EnumEventErrorNullableFilter<"Event"> | $Enums.EventError | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type EventOrderByWithRelationInput = {
    transactionId?: SortOrder
    id?: SortOrder
    questId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    transactionId?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    questId?: StringNullableFilter<"Event"> | string | null
    userId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    processedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    error?: EnumEventErrorNullableFilter<"Event"> | $Enums.EventError | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "transactionId">

  export type EventOrderByWithAggregationInput = {
    transactionId?: SortOrder
    id?: SortOrder
    questId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
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
    questId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    userId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    error?: EnumEventErrorNullableWithAggregatesFilter<"Event"> | $Enums.EventError | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    seenAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    data?: JsonFilter<"Notification">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    data?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    seenAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    data?: JsonFilter<"Notification">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrderInput | SortOrder
    data?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    seenAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    data?: JsonWithAggregatesFilter<"Notification">
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
    metadata?: JsonFilter<"Audit">
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AuditOrderByWithRelationInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    xrdUsdValue?: SortOrder
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
    metadata?: JsonFilter<"Audit">
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "transactionId">

  export type AuditOrderByWithAggregationInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    xrdUsdValue?: SortOrder
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
    metadata?: JsonWithAggregatesFilter<"Audit">
    xrdUsdValue?: DecimalWithAggregatesFilter<"Audit"> | Decimal | DecimalJsLike | number | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    attempt?: IntFilter<"Transaction"> | number
    transactionKey?: StringFilter<"Transaction"> | string
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    error?: StringNullableFilter<"Transaction"> | string | null
    badgeId?: StringFilter<"Transaction"> | string
    badgeResourceAddress?: StringFilter<"Transaction"> | string
  }

  export type TransactionOrderByWithRelationInput = {
    attempt?: SortOrder
    transactionKey?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    badgeId?: SortOrder
    badgeResourceAddress?: SortOrder
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    transactionKey_badgeId_badgeResourceAddress_attempt?: TransactionTransactionKeyBadgeIdBadgeResourceAddressAttemptCompoundUniqueInput
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    attempt?: IntFilter<"Transaction"> | number
    transactionKey?: StringFilter<"Transaction"> | string
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    error?: StringNullableFilter<"Transaction"> | string | null
    badgeId?: StringFilter<"Transaction"> | string
    badgeResourceAddress?: StringFilter<"Transaction"> | string
  }, "transactionKey_badgeId_badgeResourceAddress_attempt">

  export type TransactionOrderByWithAggregationInput = {
    attempt?: SortOrder
    transactionKey?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrderInput | SortOrder
    badgeId?: SortOrder
    badgeResourceAddress?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    attempt?: IntWithAggregatesFilter<"Transaction"> | number
    transactionKey?: StringWithAggregatesFilter<"Transaction"> | string
    transactionId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    error?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    badgeId?: StringWithAggregatesFilter<"Transaction"> | string
    badgeResourceAddress?: StringWithAggregatesFilter<"Transaction"> | string
  }

  export type UserCreateInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserPhoneNumberCreateInput = {
    phoneNumber: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPhoneNumberInput
  }

  export type UserPhoneNumberUncheckedCreateInput = {
    userId: string
    phoneNumber: string
    createdAt?: Date | string
  }

  export type UserPhoneNumberUpdateInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPhoneNumberNestedInput
  }

  export type UserPhoneNumberUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPhoneNumberCreateManyInput = {
    userId: string
    phoneNumber: string
    createdAt?: Date | string
  }

  export type UserPhoneNumberUpdateManyMutationInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPhoneNumberUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
    user?: UserCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateInput = {
    transactionId: string
    id: string
    questId?: string | null
    userId?: string | null
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
  }

  export type EventUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
    user?: UserUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type EventCreateManyInput = {
    transactionId: string
    id: string
    questId?: string | null
    userId?: string | null
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
  }

  export type EventUpdateManyMutationInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type EventUncheckedUpdateManyInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type NotificationCreateInput = {
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: string
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: string
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
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
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditUncheckedCreateInput = {
    transactionId: string
    userId: string
    date?: Date | string
    type: $Enums.AuditType
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
  }

  export type AuditUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditUncheckedUpdateInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditCreateManyInput = {
    transactionId: string
    userId: string
    date?: Date | string
    type: $Enums.AuditType
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
  }

  export type AuditUpdateManyMutationInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditUncheckedUpdateManyInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TransactionCreateInput = {
    attempt?: number
    transactionKey: string
    transactionId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    error?: string | null
    badgeId: string
    badgeResourceAddress: string
  }

  export type TransactionUncheckedCreateInput = {
    attempt?: number
    transactionKey: string
    transactionId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    error?: string | null
    badgeId: string
    badgeResourceAddress: string
  }

  export type TransactionUpdateInput = {
    attempt?: IntFieldUpdateOperationsInput | number
    transactionKey?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    badgeId?: StringFieldUpdateOperationsInput | string
    badgeResourceAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateInput = {
    attempt?: IntFieldUpdateOperationsInput | number
    transactionKey?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    badgeId?: StringFieldUpdateOperationsInput | string
    badgeResourceAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    attempt?: number
    transactionKey: string
    transactionId?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    error?: string | null
    badgeId: string
    badgeResourceAddress: string
  }

  export type TransactionUpdateManyMutationInput = {
    attempt?: IntFieldUpdateOperationsInput | number
    transactionKey?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    badgeId?: StringFieldUpdateOperationsInput | string
    badgeResourceAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    attempt?: IntFieldUpdateOperationsInput | number
    transactionKey?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    badgeId?: StringFieldUpdateOperationsInput | string
    badgeResourceAddress?: StringFieldUpdateOperationsInput | string
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

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type UserPhoneNumberNullableRelationFilter = {
    is?: UserPhoneNumberWhereInput | null
    isNot?: UserPhoneNumberWhereInput | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    identityAddress?: SortOrder
    accountAddress?: SortOrder
    name?: SortOrder
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

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserPhoneNumberCountOrderByAggregateInput = {
    userId?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type UserPhoneNumberMaxOrderByAggregateInput = {
    userId?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type UserPhoneNumberMinOrderByAggregateInput = {
    userId?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
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

  export type EnumEventErrorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EventError | EnumEventErrorFieldRefInput<$PrismaModel> | null
    in?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEventErrorNullableFilter<$PrismaModel> | $Enums.EventError | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type EventCountOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    questId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    questId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    transactionId?: SortOrder
    id?: SortOrder
    questId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    error?: SortOrder
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

  export type EnumEventErrorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventError | EnumEventErrorFieldRefInput<$PrismaModel> | null
    in?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEventErrorNullableWithAggregatesFilter<$PrismaModel> | $Enums.EventError | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEventErrorNullableFilter<$PrismaModel>
    _max?: NestedEnumEventErrorNullableFilter<$PrismaModel>
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

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
    data?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    seenAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
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

  export type AuditCountOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    xrdUsdValue?: SortOrder
  }

  export type AuditAvgOrderByAggregateInput = {
    xrdUsdValue?: SortOrder
  }

  export type AuditMaxOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
  }

  export type AuditMinOrderByAggregateInput = {
    transactionId?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    xrdUsdValue?: SortOrder
  }

  export type AuditSumOrderByAggregateInput = {
    xrdUsdValue?: SortOrder
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

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type TransactionTransactionKeyBadgeIdBadgeResourceAddressAttemptCompoundUniqueInput = {
    transactionKey: string
    badgeId: string
    badgeResourceAddress: string
    attempt: number
  }

  export type TransactionCountOrderByAggregateInput = {
    attempt?: SortOrder
    transactionKey?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    badgeId?: SortOrder
    badgeResourceAddress?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    attempt?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    attempt?: SortOrder
    transactionKey?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    badgeId?: SortOrder
    badgeResourceAddress?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    attempt?: SortOrder
    transactionKey?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    error?: SortOrder
    badgeId?: SortOrder
    badgeResourceAddress?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    attempt?: SortOrder
  }

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserPhoneNumberCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPhoneNumberCreateOrConnectWithoutUserInput
    connect?: UserPhoneNumberWhereUniqueInput
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

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPhoneNumberCreateOrConnectWithoutUserInput
    connect?: UserPhoneNumberWhereUniqueInput
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserPhoneNumberUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPhoneNumberCreateOrConnectWithoutUserInput
    upsert?: UserPhoneNumberUpsertWithoutUserInput
    disconnect?: UserPhoneNumberWhereInput | boolean
    delete?: UserPhoneNumberWhereInput | boolean
    connect?: UserPhoneNumberWhereUniqueInput
    update?: XOR<XOR<UserPhoneNumberUpdateToOneWithWhereWithoutUserInput, UserPhoneNumberUpdateWithoutUserInput>, UserPhoneNumberUncheckedUpdateWithoutUserInput>
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

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPhoneNumberCreateOrConnectWithoutUserInput
    upsert?: UserPhoneNumberUpsertWithoutUserInput
    disconnect?: UserPhoneNumberWhereInput | boolean
    delete?: UserPhoneNumberWhereInput | boolean
    connect?: UserPhoneNumberWhereUniqueInput
    update?: XOR<XOR<UserPhoneNumberUpdateToOneWithWhereWithoutUserInput, UserPhoneNumberUpdateWithoutUserInput>, UserPhoneNumberUncheckedUpdateWithoutUserInput>
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

  export type UserCreateNestedOneWithoutPhoneNumberInput = {
    create?: XOR<UserCreateWithoutPhoneNumberInput, UserUncheckedCreateWithoutPhoneNumberInput>
    connectOrCreate?: UserCreateOrConnectWithoutPhoneNumberInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutPhoneNumberNestedInput = {
    create?: XOR<UserCreateWithoutPhoneNumberInput, UserUncheckedCreateWithoutPhoneNumberInput>
    connectOrCreate?: UserCreateOrConnectWithoutPhoneNumberInput
    upsert?: UserUpsertWithoutPhoneNumberInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPhoneNumberInput, UserUpdateWithoutPhoneNumberInput>, UserUncheckedUpdateWithoutPhoneNumberInput>
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumEventErrorFieldUpdateOperationsInput = {
    set?: $Enums.EventError | null
  }

  export type UserUpdateOneWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus
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

  export type NestedEnumEventErrorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EventError | EnumEventErrorFieldRefInput<$PrismaModel> | null
    in?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEventErrorNullableFilter<$PrismaModel> | $Enums.EventError | null
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

  export type NestedEnumEventErrorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventError | EnumEventErrorFieldRefInput<$PrismaModel> | null
    in?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EventError[] | ListEnumEventErrorFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEventErrorNullableWithAggregatesFilter<$PrismaModel> | $Enums.EventError | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEventErrorNullableFilter<$PrismaModel>
    _max?: NestedEnumEventErrorNullableFilter<$PrismaModel>
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

  export type NestedEnumAuditTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditType | EnumAuditTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditType[] | ListEnumAuditTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuditType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditTypeFilter<$PrismaModel>
    _max?: NestedEnumAuditTypeFilter<$PrismaModel>
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

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type EventCreateWithoutUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
  }

  export type EventUncheckedCreateWithoutUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    seenAt?: Date | string | null
    data: JsonNullValueInput | InputJsonValue
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserPhoneNumberCreateWithoutUserInput = {
    phoneNumber: string
    createdAt?: Date | string
  }

  export type UserPhoneNumberUncheckedCreateWithoutUserInput = {
    phoneNumber: string
    createdAt?: Date | string
  }

  export type UserPhoneNumberCreateOrConnectWithoutUserInput = {
    where: UserPhoneNumberWhereUniqueInput
    create: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
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
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
  }

  export type AuditUncheckedCreateWithoutUserInput = {
    transactionId: string
    date?: Date | string
    type: $Enums.AuditType
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
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
    questId?: StringNullableFilter<"Event"> | string | null
    userId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    processedAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    error?: EnumEventErrorNullableFilter<"Event"> | $Enums.EventError | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    seenAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    data?: JsonFilter<"Notification">
  }

  export type UserPhoneNumberUpsertWithoutUserInput = {
    update: XOR<UserPhoneNumberUpdateWithoutUserInput, UserPhoneNumberUncheckedUpdateWithoutUserInput>
    create: XOR<UserPhoneNumberCreateWithoutUserInput, UserPhoneNumberUncheckedCreateWithoutUserInput>
    where?: UserPhoneNumberWhereInput
  }

  export type UserPhoneNumberUpdateToOneWithWhereWithoutUserInput = {
    where?: UserPhoneNumberWhereInput
    data: XOR<UserPhoneNumberUpdateWithoutUserInput, UserPhoneNumberUncheckedUpdateWithoutUserInput>
  }

  export type UserPhoneNumberUpdateWithoutUserInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPhoneNumberUncheckedUpdateWithoutUserInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    metadata?: JsonFilter<"Audit">
    xrdUsdValue?: DecimalFilter<"Audit"> | Decimal | DecimalJsLike | number | string
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

  export type UserCreateWithoutPhoneNumberInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPhoneNumberInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPhoneNumberInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPhoneNumberInput, UserUncheckedCreateWithoutPhoneNumberInput>
  }

  export type UserUpsertWithoutPhoneNumberInput = {
    update: XOR<UserUpdateWithoutPhoneNumberInput, UserUncheckedUpdateWithoutPhoneNumberInput>
    create: XOR<UserCreateWithoutPhoneNumberInput, UserUncheckedCreateWithoutPhoneNumberInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPhoneNumberInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPhoneNumberInput, UserUncheckedUpdateWithoutPhoneNumberInput>
  }

  export type UserUpdateWithoutPhoneNumberInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPhoneNumberInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
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
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCompletedQuestRequirementsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompletedQuestRequirementsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
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
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompletedQuestRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutQuestProgressInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuestProgressInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
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
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSavedProgressInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    auditLogs?: AuditCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedProgressInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditUncheckedCreateNestedManyWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
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
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    auditLogs?: AuditUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditUncheckedUpdateManyWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressCreateNestedOneWithoutUserInput
    questProgress?: QuestProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    identityAddress: string
    accountAddress?: string | null
    name?: string | null
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    phoneNumber?: UserPhoneNumberUncheckedCreateNestedOneWithoutUserInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedCreateNestedManyWithoutUserInput
    savedProgress?: SavedProgressUncheckedCreateNestedOneWithoutUserInput
    questProgress?: QuestProgressUncheckedCreateNestedManyWithoutUserInput
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
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUpdateOneWithoutUserNestedInput
    questProgress?: QuestProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    accountAddress?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    phoneNumber?: UserPhoneNumberUncheckedUpdateOneWithoutUserNestedInput
    completedQuestRequirements?: CompletedQuestRequirementUncheckedUpdateManyWithoutUserNestedInput
    savedProgress?: SavedProgressUncheckedUpdateOneWithoutUserNestedInput
    questProgress?: QuestProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventCreateManyUserInput = {
    transactionId: string
    id: string
    questId?: string | null
    createdAt?: Date | string
    processedAt?: Date | string | null
    error?: $Enums.EventError | null
  }

  export type NotificationCreateManyUserInput = {
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
    metadata: JsonNullValueInput | InputJsonValue
    xrdUsdValue: Decimal | DecimalJsLike | number | string
  }

  export type QuestProgressCreateManyUserInput = {
    questId: string
    status?: $Enums.QuestStatus
  }

  export type EventUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    questId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableEnumEventErrorFieldUpdateOperationsInput | $Enums.EventError | null
  }

  export type NotificationUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: JsonNullValueInput | InputJsonValue
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
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
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditUncheckedUpdateWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditUncheckedUpdateManyWithoutUserInput = {
    transactionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumAuditTypeFieldUpdateOperationsInput | $Enums.AuditType
    metadata?: JsonNullValueInput | InputJsonValue
    xrdUsdValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserPhoneNumberDefaultArgs instead
     */
    export type UserPhoneNumberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserPhoneNumberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChallengeDefaultArgs instead
     */
    export type ChallengeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChallengeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventDefaultArgs instead
     */
    export type EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventDefaultArgs<ExtArgs>
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
     * @deprecated Use TransactionDefaultArgs instead
     */
    export type TransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionDefaultArgs<ExtArgs>

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
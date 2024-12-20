type LessThan<TNumber extends number, TArray extends any[] = []> = TNumber extends TArray['length']
  ? TArray[number]
  : LessThan<TNumber, [...TArray, TArray['length']]>

export type NumericRange<TStart extends number, TEnd extends number> = Exclude<
  TEnd | LessThan<TEnd>,
  LessThan<TStart>
>

export type ApiError = ReturnType<ReturnType<typeof createApiError>>

export const createApiError =
  (reason: string, httpResponseCode: NumericRange<400, 599>) =>
  (
    jsError?: any
  ): { jsError?: Error; httpResponseCode: NumericRange<400, 599>; reason: string } => ({
    jsError,
    httpResponseCode,
    reason
  })

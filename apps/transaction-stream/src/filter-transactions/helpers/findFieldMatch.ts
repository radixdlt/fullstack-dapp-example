import { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'
import { MatchField } from 'content'

export const findFieldMatch = (
  fields: any[],
  { value, kind, type_name }: MatchField
): ProgrammaticScryptoSborValue[] =>
  fields.filter(
    (field) => field.kind === kind && field.value === value && field.type_name === type_name
  )

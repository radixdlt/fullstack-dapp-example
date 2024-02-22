import { ProgrammaticScryptoSborValue } from '@radixdlt/babylon-gateway-api-sdk'

export const getEventDataFields = (
  data: ProgrammaticScryptoSborValue
): ProgrammaticScryptoSborValue[] | undefined => {
  if (data.kind === 'Enum') return data.fields
  return
}

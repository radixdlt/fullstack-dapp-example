import { Addresses } from 'common'

export const getEntityAddresses = (networkId: number) => {
  const addresses = Addresses

  if (!addresses) throw new Error(`Entity addresses not found for network ID: ${networkId}`)

  return addresses
}

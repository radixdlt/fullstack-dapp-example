import { env as publicEnv } from '$env/dynamic/public'

const { PUBLIC_NETWORK_ID } = publicEnv

const environment = {
  ['2']: {
    dAppDefinitionAddress: 'account_tdx_2_12x3rn7tqqqm3wguz6kmg5fy7saf8v92lt5xuwgn6kgh8zaejlf80ce'
  }
}[PUBLIC_NETWORK_ID]

export const publicConfig = {
  networkId: parseInt(PUBLIC_NETWORK_ID),
  dAppDefinitionAddress: environment?.dAppDefinitionAddress || ''
}

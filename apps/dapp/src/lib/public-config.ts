const { PUBLIC_NETWORK_ID } = process.env

export const publicConfig = {
  ['2']: {
    dAppDefinitionAddress: 'account_tdx_2_12x3rn7tqqqm3wguz6kmg5fy7saf8v92lt5xuwgn6kgh8zaejlf80ce',
    networkId: parseInt(PUBLIC_NETWORK_ID!)
  }
}[PUBLIC_NETWORK_ID || '2']!

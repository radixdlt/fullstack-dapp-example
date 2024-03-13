import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t5nfy52latlarrukrdhyl7p9nevvt0z496e9neg3zj7pr39uasfzqu',
          superAdminBadgeAddress:
            'resource_tdx_2_1t4ntu44ndy3w9pw4z6wmlaa8cdu5tccda2twryz4av5w4693z37kyn',
          userBadgeAddress: 'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1th5y72fe3afxhuh4nkdtvcqw6tvhvdfupl87ua7flynk97mqxlmgsh'
        },
        package: 'package_tdx_2_1p4ad0gvtrrcndtlza7xd409x7qk7sqtz35qsjnaejrgxz6gdtjmghd',
        components: {
          questRewards: 'component_tdx_2_1crs0mxn0fv0ml789q6thepetdcxg7gruurt07asddxrz4sv453fpvq'
        }
      }
    } as const
  )[networkConfig.networkName]!
}

export type WellKnownAddresses = {
  resourceAddresses: {
    xrd: string
  }
  accountAddress: {
    payerAccount: string
    systemAccount: string
  }
}

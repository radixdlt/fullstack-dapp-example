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
          elementAddress: 'resource_tdx_2_1th5y72fe3afxhuh4nkdtvcqw6tvhvdfupl87ua7flynk97mqxlmgsh',
          clamAddress: 'resource_tdx_2_1tkhmnxnw3hklh84kdzcz3plmevlnseyflzuvv7a0ldy6jq5m6skxza',
          morphEnergyCards: 'resource_tdx_2_1ngvftz0x5kufj5tes0gx9qzgfpp0lkjccl5q72fhw4gssvnm3ak30k'
        },
        package: 'package_tdx_2_1p4jymnsl7qc35vfvwdqv8z5df2q64fvhhul2tnfz6vgh5vrru8px23',
        components: {
          questRewards: 'component_tdx_2_1cp2qf6rzzfhny0qdp40w9jz4m98g9hdtmzd4fdg6gc0epknezg0y65',
          cardForge: 'component_tdx_2_1czsdnwqurcmdzhv3yj94lxhc92ayjlpguaz7nf30mry0s5avy7fk30'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          jetty: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt'
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
    jetty: string
  }
}

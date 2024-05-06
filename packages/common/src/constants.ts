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
          morphEnergyCards:
            'resource_tdx_2_1ngvftz0x5kufj5tes0gx9qzgfpp0lkjccl5q72fhw4gssvnm3ak30k',
          radgemAddress: 'resource_tdx_2_1ngjnrmx62r9xptepyf9ce2tk4tqrqdfapeqwk69s7ftjezw63yega3',
          radmorphAddress: 'resource_tdx_2_1n2zj4333en9mfshg8c9kvaqx8qxzyjr7hhkt50jqu4epkxwq8wwv06'
        },
        package: 'package_tdx_2_1p4jymnsl7qc35vfvwdqv8z5df2q64fvhhul2tnfz6vgh5vrru8px23',
        components: {
          questRewards: 'component_tdx_2_1cp2qf6rzzfhny0qdp40w9jz4m98g9hdtmzd4fdg6gc0epknezg0y65',
          cardForge: 'component_tdx_2_1czsdnwqurcmdzhv3yj94lxhc92ayjlpguaz7nf30mry0s5avy7fk30',
          radgemForge: 'component_tdx_2_1cp7lsg052hcw55uwnl55wr9wc0ynqw2mhfymfadphze9w2eu72cfk5',
          radmorphForge: 'component_tdx_2_1cp9ndqvnd6t38ssh56sn4h6g3g970t7760hlq76ra7ptst5cuyu86s',
          imageOracle: 'component_tdx_2_1cr3ppkvc6e87ryzv67r33z2lrn0h3xfpxzxzu0mgyhumefvpzv6lg3',
          refinery: 'component_tdx_2_1cqg5khdgj3hy8raczvsc89lf7mss07zespxk933vnjedef39dfekle'
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

export const RedisKeys = {
  TrackedAccountAddresses: 'tracked-account-addresses'
}

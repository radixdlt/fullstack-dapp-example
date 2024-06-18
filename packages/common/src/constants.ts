import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tkqxhltmrtxy6tjnp2p4dpt9vfxymv0mrqvlemtq39uva5lv5dlj85',
          superAdminBadgeAddress:
            'resource_tdx_2_1thul90pjpsjxnfk6qxavtq5qf35sca9nhs2lgw7r9f27pznjnkj07s',
          heroBadgeAddress: 'resource_tdx_2_1nfqughuxfm6hetnkc7xg0qtnx8a7agl80pz9srxy4dvhz8ckvscs88'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
          clamAddress: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
          morphEnergyCards:
            'resource_tdx_2_1ngwfwe363l7rag3l2n8pcqjh3828nden6tdsrlww640ggnkv0hvn32',
          radgemAddress: 'resource_tdx_2_1ngsqqj66xx6u7athxynr0n95phj3ljuvje2hkzfvd90ua8569csaje',
          radmorphAddress: 'resource_tdx_2_1nghxdspyat6ef69w8rcg5xk0sjeluk664yf485g9csmqzufhkytxlx',
          instapassBadgeAddress:
            'resource_tdx_2_1nffgrg4sxxswkc3vjydt57y6dcstrl8vp2z22al5h2thzzafk3ql8n',
          otterCoinAddress: 'resource_tdx_2_1t5pvx3yuwa7rxpa8h8uxnx068ruap9k7nqd7k5qxgay4yjalp9seng'
        },
        package: 'package_tdx_2_1phfqf7gg947hu3r3sugd96k8uu4p9s4h297f4zfwleyyz7pc55kst8',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          heroBadgeForge: 'component_tdx_2_1crk4rw6myf3g43cqpfq5nvzfcgt9vayklcvw4zhcqddpgjmyfamrhe',
          questRewards: 'component_tdx_2_1cqyapw708gcd48zv2pdu639khjzpflnhx37gvw3vnzt33zzc6g80l7',
          kycOracle: 'component_tdx_2_1cred5kgzs2c3asqh07k8c2ljkd9p8jqcl5lmvxpnf6s8feuc6wkxxz',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq02ctxth46j8wrj8mqufz8z3rl7ur0a5jy8zxuyvwsperjrqxap0h',
          cardForge: 'component_tdx_2_1crg6nhkhm606tqclkxta35jweujn2u0pxuh2m84ujshk6876a4jxd9',
          radgemForge: 'component_tdx_2_1cpm8uehashfa5c2mpdcjdgaqnax7hjkpmuvnqs3sr5mntfaq80xq2q',
          radmorphForge: 'component_tdx_2_1cr0sf5kg2wutjalnh6ppfr55nk4he35v6hyhd7m3ysl6lpr88majv7',
          imageOracle: 'component_tdx_2_1crzehakcmcy4pwlpzltumxnwp62z63zh76g6rzw39yjqx78xvtk22y',
          refinery: 'component_tdx_2_1czey7c2act6r6lhxv4wpg6a4k8d0rwmxsnup6afwwe8978jc0gffj3',
          jettySwap: 'component_tdx_2_1czsvrwv0gmdf9fkffv0a0n0mx86r0jw9agz0knxde36yeur83ne0sg',
          lettySwap: 'component_tdx_2_1crcfm8dw90rxgva0ph8fwl356jntmc3dpnra9y2kn9eecc2e5cy0v9'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          jetty: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt'
        },
        dapps: {
          instapass: {
            url: 'https://instapass-lite-dev.instapass.fi/RadQuest/'
          },
          jettySwap: {
            url: 'https://jettyswap-dev.rdx-works-main.extratools.works'
          },
          lettySwap: {
            url: 'https://lettyswap-dev.rdx-works-main.extratools.works'
          },
          radquest: {
            url: 'https://radquest-dev.rdx-works-main.extratools.works'
          }
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

export const EventId = {
  DepositUserBadge: 'DepositUserBadge',
  JettyReceivedClams: 'JettyReceivedClams',
  XrdStaked: 'XrdStaked',
  MayaRouterWithdrawEvent: 'MayaRouterWithdrawEvent',
  QuestRewardDeposited: 'QuestRewardDeposited',
  QuestRewardClaimed: 'QuestRewardClaimed',
  JettySwap: 'JettySwap',
  LettySwap: 'LettySwap',
  InstapassBadgeDeposited: 'InstapassBadgeDeposited',
  CombineElementsDeposited: 'CombineElementsDeposited',
  CombineElementsMintedRadgem: 'CombineElementsMintedRadgem',
  CombineElementsAddedRadgemImage: 'CombineElementsAddedRadgemImage',
  CombineElementsClaimed: 'CombineElementsClaimed'
} as const

export type EventId = keyof typeof EventId

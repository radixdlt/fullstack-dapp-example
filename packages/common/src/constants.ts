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
        package: 'package_tdx_2_1p4r8n4jse52z0hsccgdrns44n7mr7a5hkvfypxfru9uj407etlq0xf',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          heroBadgeForge: '',
          questRewards: 'component_tdx_2_1cq02l5g0w2rd3rgm6vwg2496pntgdjvrk40ej0jv4hd37dthr3qxxs',
          kycOracle: 'component_tdx_2_1cqndnna99wffypyp3s6js7t3lpsje06qt7s0p7xg2pj5g9ae59fp7p',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kp0he3csvzmanekja7z80rpu3axspl8qrdlf9tfz09w02uz8xgj2sf',
          cardForge: 'component_tdx_2_1cznyvhmeujc5pft22a2jzt0yc5h9uqv0x0k0xtpsfsj2aflvuxlt3z',
          radgemForge: 'component_tdx_2_1crfa45q2s35mzehduz5pq0hwmyqwlvkpxpp4c2hsfweq7l7rjd6qd7',
          radmorphForge: 'component_tdx_2_1cz4zqrrjyjey3xuesxnh7x790q37duw9x59y8u88uk42hy9md06wq0',
          imageOracle: 'component_tdx_2_1cz679zju0d9pv2hxc24u8x7m65z8lcy3du0l60463pqzy0jw38vtuw',
          refinery: 'component_tdx_2_1crwfzvesznfmqdz5fudw8gaqzaq5uq5uyfgl5pffggghuz3ngp2lp6',
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

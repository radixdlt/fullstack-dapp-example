import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t4xlsunrlwsphz8xs4z3lkx95nsdcduvp0ns2n6jsarpzwj0mttvwj',
          superAdminBadgeAddress:
            'resource_tdx_2_1t55stdr7xlkxu27j5qqz402lsuua9tz6gzpc9ky8k5utm4mk2vcmkh',
          heroBadgeAddress:
            'resource_tdx_2_1nfdq2k28ye2ywn8dsc3kxdfqv94p8wl7mkphqj2yrh9fxfegh3qpx4',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1th2kwgcqwms3668eup3chd4f0ntw44nwtdhk466hc375uw3700x7sl',
          clamAddress: 'resource_tdx_2_1thtp8ud63sjl0ue6qrz3vrg9tm340e639xm8c8pzhqcsv3lqh2c7vj',
          radgemAddress: 'resource_tdx_2_1ngppcvg3w58g8zgcky45czq5uuumalh42ftpzm7jsgwftdypd80v4r',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfu5400kzjp33d23paldzh7qha9r422wpyc7hr4jmzm03cnl0sqpy6',
          radmorphAddress: 'resource_tdx_2_1nf6znt7e25gw82mzryc3urr99lzls5kru3lm2l6z5tt4lyhd8u62er',
          otterCoinAddress:
            'resource_tdx_2_1t53hs37sxq0xgyg2hd8fd3lqfakhp09m8tmhkp0kqtwp859rqvja7w',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          giftBox: {
            Starter: 'resource_tdx_2_1t53t0x0lh5t4mw9r6gtr490cxetvafeszkyrwzhmryls3fkmq3ymwz',
            Simple: 'resource_tdx_2_1tktsu0xcn03y9klzr3qm3avrwu0dwr8lugyuzsccx8ftm34f7fg4zj',
            Fancy: 'resource_tdx_2_1thzh76rwwnvc5ncdwyjjw6uzqwr8txf4q6rg90xyzkxz26pmu89546',
            Elite: 'resource_tdx_2_1t4fkt03j9rwyshp3p28y75gqrqwt0stv3v47hrnrag4uwkxln3zn8c'
          }
        },
        package: 'package_tdx_2_1p4yyjnsjtd460xxvgmxssx00ws05ttx8cwhjectf6t8vhwzk2lpdln',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          heroBadgeForge: 'component_tdx_2_1cqhm5xw8t928mpcudja3ye78m3g5tke4cr0k624kjts8ff9v2zupvw',
          kycOracle: 'component_tdx_2_1cpks302n2tk5r60s2rjt4qnky83v6qaxd2kz4q3vgttzdfdd72kwmn',
          questRewards: 'component_tdx_2_1czmcy2xdnkeg84taw63xslzsap4nmn4re3rc35r93jydwwztfam2t3',
          giftBoxOpener: 'component_tdx_2_1crt9476maf5jng9xydpfshjsxzwf9n8mgs3k4v02znk74wwkkcntsx',
          cardForge: 'component_tdx_2_1cqd2llafxugetvnmuaxrrgt4cqgnvqu9ey3pptp32z0c6vu5924c8t',
          radgemForge: 'component_tdx_2_1cpkhxalqkjhyvlmad9d4jjjv4kt5dnxdqkzhad2l9lqm3kmesn2p67',
          radmorphForge: 'component_tdx_2_1cpzav994qe66kxgze4tmzesh4gzkrc98xxk7tyfhfym95vh7q50dk6',
          imageOracle: 'component_tdx_2_1cpxkuq2h6dpv2c883tlkqnh0gxpnewsjegezrw36762uwkf44kt0l0',
          refinery: 'component_tdx_2_1cqjzuvwynfz5zquk34hdtek0ppfyucf60frpxg5hg7ns8wqq78qlnl',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kr3ek9y3kdwk8f6hfdnkkssywuyw5m7xsrppcr04xxlg94a3scrquj',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1czsvrwv0gmdf9fkffv0a0n0mx86r0jw9agz0knxde36yeur83ne0sg',
          lettySwap: 'component_tdx_2_1crcfm8dw90rxgva0ph8fwl356jntmc3dpnra9y2kn9eecc2e5cy0v9'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          owner: {
            address: 'account_tdx_2_129mydulw6hteg6hwmg02mcml7z2mz25mhzvavxe2rms0xywlvptx2m',
            accessController:
              'accesscontroller_tdx_2_1cwm8u8e6maj4fhuuhmrftjywugln705xc0eql40ag3696kfzfefpve'
          },
          dAppDefinition: {
            address: 'account_tdx_2_12ypap8t44k4pw9p0p56aqdp0ewexjcszzsj5suxduvsfnnmxpcj5qk',
            accessController:
              'accesscontroller_tdx_2_1cwm8u8e6maj4fhuuhmrftjywugln705xc0eql40ag3696kfzfefpve'
          },
          payer: {
            address: 'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0',
            accessController:
              'accesscontroller_tdx_2_1cd52u4ula852q66525tj2dxywdgh3h8lse0uppk4ytqt8vrjhs7rka'
          },
          system: {
            address: 'account_tdx_2_12yt6mpsqcwzaesvxt5arllsjq78xwpjaklqzwee7cva8yej52navkg',
            accessController:
              'accesscontroller_tdx_2_1cdmny6m5jcsrq8wajjd7x8v0k0x464xmxq8m4tqae0z9ycxl7zyvg9'
          },
          jetty: {
            address: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt',
            accessController: ''
          },
          jettySwapDappDefinition: {
            address: 'account_tdx_2_128e634vx9dfg0prxz2zwj8c7k48y28ftyggl52ppdk6qe9x7q3m2r9'
          },
          lettySwapDappDefinition: {
            address: 'account_tdx_2_1299hh40njlhtn54n0kllj2ldxq32asfsp3apvfvqwp775wh50yslp6'
          }
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

export const QuestTogetherConfig = {
  triggerRewardAfterQuest: 'TransferTokens'
}

export const EventId = {
  DepositHeroBadge: 'DepositHeroBadge',
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
  CombineElementsClaimed: 'CombineElementsClaimed',
  AccountAllowedToForgeHeroBadge: 'AccountAllowedToForgeHeroBadge',
  GiftBoxOpened: 'GiftBoxOpened',
  GiftBoxDeposited: 'GiftBoxDeposited'
} as const

export type EventId = keyof typeof EventId

export const CookieKeys = {
  Utm: 'rq_ma'
} as const

export type Metadata = typeof metadata
export type GiftBoxKey = keyof Metadata['resources']['giftBox']
export type GiftBoxMetadata =
  (typeof metadata.resources.giftBox)[keyof typeof metadata.resources.giftBox]
export const metadata = {
  resources: {
    giftBox: {
      starter: {
        name: 'Starter Gift Box',
        description:
          'This Gift Box from RadQuest’s Jetty will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      },
      simple: {
        name: 'Simple Gift Box',
        description:
          'This simple Gift Box from RadQuest’s Jetty contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      },
      fancy: {
        name: 'Fancy Gift Box',
        description:
          'This fancy Gift Box from RadQuest’s Jetty contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      },
      elite: {
        name: 'Elite Gift Box',
        description:
          'This truly elite Gift Box from RadQuest’s Jetty, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      }
    }
  }
} as const

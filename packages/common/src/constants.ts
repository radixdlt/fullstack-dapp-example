import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1thghfsg3fz0ve5kppr4wgykgnswg34ueuev7l5nwxhmx95nhxjkr00',
          superAdminBadgeAddress:
            'resource_tdx_2_1t4gpac5c4fjekyufz25gyd5jwv4tz9dusgx0vg3k7wfgft7hgqvwhk',
          heroBadgeAddress:
            'resource_tdx_2_1nfac48pgc0mckv3lq42x0pzka3gysuk5qtw57gknwzmlu5sc65dfjz',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t49aftat2gyrxljntfxplvv79qjxp38ct4al6khp5u6mgze66rakys',
          clamAddress: 'resource_tdx_2_1thdlg7lfsrele424h7y36vlpvj3rrf2chnlp290lx3tu49akusu5p6',
          radgemAddress: 'resource_tdx_2_1ng9u50zrh72ydqtt92mvlgdvfr46yy08als9mxqyrtqsg3fsz3wnz6',
          morphEnergyCardAddress:
            'resource_tdx_2_1nt6tndwvdprn0yjffa35d4yfw7p0pdx8wnh960pthtru0v26ulem7d',
          radmorphAddress: 'resource_tdx_2_1ngepzfes9femxaxqn7xt3shca239q73jsca44qmxscarjm269tpk2q',
          otterCoinAddress:
            'resource_tdx_2_1tkumkgvqtcagqwqsty83sjced2sgshdh8gfkqmu0exh2r7j3mwkqrs',

          giftBox: {
            Starter: 'resource_tdx_2_1t4ejqj5vx857fznc26e9qwmdhl7w34y4yhxugwqq4s4zgwl4jy8t03',
            Simple: 'resource_tdx_2_1thq84l5w8q74dkq9ks3qjv0llt6td347y00hc4shmj90u5rahcegwr',
            Fancy: 'resource_tdx_2_1tkg659espj2gg30erwfdtguydz37ftsu8d2c350wrqr5cc8mcgwrgl',
            Elite: 'resource_tdx_2_1th9flh264rnqh8uw4np24kyf26egueh8fmfwtaqstg09g5d3v6ewzv'
          }
        },
        radQuestPackage: 'package_tdx_2_1pheu6hryyn8vhxvmelz9pes87ff799ar27d3q0nk3e8z6xsn9cslk3',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          heroBadgeForge: 'component_tdx_2_1cr262ammquudnwev5hhn3fnuznesavmz5uymnlltv6yzvxug5rc4g6',
          kycOracle: 'component_tdx_2_1cz4jm8xe55gf2ta9p4ztdupuh3y7m7mzvraqwfesm22cywl0xymas0',
          questRewards: 'component_tdx_2_1crlszgfe23nr86fs4hdksdx2crrrh8h88kr5tq59r3d3v6dysm4mrh',
          giftBoxOpener: 'component_tdx_2_1cp4n0g9spnhkq5azrnhh9ej7gcwvq9afr6kmurwvqj74slma23mdaa',
          cardForge: 'component_tdx_2_1czxraa5k8pxp5hh78c4me6arv6cwzfha35v8d6jy92p02tc6h3sjes',
          radgemForge: 'component_tdx_2_1cran4x289l84rfrn7jw4fjvvp020j5pe4azh8ajglc7frdpn5yxfwx',
          radmorphForge: 'component_tdx_2_1cpdemw654yluwlcp0w8607gzwt6ap8cvlj7lc52q8petnggehvy8zu',
          imageOracle: 'component_tdx_2_1crnutdclhxfa69tjfg3ue3hptknmxftn6lrfhdcwspg6rxzlnhzl5c',
          refinery: 'component_tdx_2_1cpdn5qwfujv56sl64v7ys5v4fmrrjavvh3puuwhxgh20v0eumfypnf',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzs2y3td8v3e3wy8yrxx775zrscz7c3zdctaq49ge6nvvwj6dqyh3w',
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

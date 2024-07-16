import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tklzmcsv7dfyd4687245h9zvukg0zgaqj7tet2sd2zg3s3zxyrsdud',
          superAdminBadgeAddress:
            'resource_tdx_2_1thv46n548ln3077qlchlqut8j3u853ma7c4t0gvpdmzekq7s4g688l',
          heroBadgeAddress:
            'resource_tdx_2_1ntz8x7cu5ga57397e0amxnq4uypl8z8pkntq89aqnt4xfj6s8s0v6h',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1th66a8xn5h8ateqzgprl9pkr8l3gll9dzffwpcc9tnvppt3tvcug5y',
          clamAddress: 'resource_tdx_2_1th9rtquc4h9x29szq09vf2vdr5t2g084paksqesddee6muef9ewcnv',
          radgemAddress: 'resource_tdx_2_1n2jmlgx7gtw70rx02kgqsrq90rlrtrp7geyu6hwc38kkpxqjt2y39h',
          morphEnergyCardAddress:
            'resource_tdx_2_1n2gw4l3076d3jt6ucgu2yumrz0tlzdpv6vweyp74g5r2dj9mrvd2d3',
          radmorphAddress: 'resource_tdx_2_1ngane28t2thvxmaq4nxajg4ekpra46kfmens2twq2p8xalgv3fusyv',
          ottercoinAddress:
            'resource_tdx_2_1t56ps4lmjlrynxj44h2m8gygcl5su2pkp3u969nz3ygy2yhnae6y9u',
          giftBox: {
            Starter: 'resource_tdx_2_1t5n8spd5f43quss4yxa5hjgwtrygjxehv8zs4qhf4vckpl32qzhwhr',
            Simple: 'resource_tdx_2_1thet038vm8g9ru3rayqw5v0l43tgnxuj9cktmqpfzqke0e5gqx92n8',
            Fancy: 'resource_tdx_2_1thr9e6xnap7k2nd9820recxccfu2pr4eh63w36c05qfjc3pj2jf5z8',
            Elite: 'resource_tdx_2_1th76gaghcqu4kz0yczzdlkaezye78a4ae0alnef7g3wcw90msjad3a'
          }
        },
        radQuestPackage: 'package_tdx_2_1ph6ff5qwu75ykn92e735d00da0uavpzp0tg78x7phhlxay47rnvy0t',
        clamDexPackage: 'package_tdx_2_1pk35c0us3v68zmnd0nv23xq9eu29p5962c67csy4zfc694663wj5ss',
        components: {
          heroBadgeForge: 'component_tdx_2_1cpkss3tc9z8ecvl8x0s0p9wlkml9t7axm4wmytgd25hkhqftmhpvhq',
          kycOracle: 'component_tdx_2_1cqhkkvjl56t70kp23g7x74md97ynefyxqe4nup3mmwzgr3x5e6dy6a',
          questRewards: 'component_tdx_2_1crurf6hkanh223gut67mp8vg6cqfe4dnn83lapld3rrtag0nlszzd2',
          giftBoxOpener: 'component_tdx_2_1crnv8wjz7xuzsxyktwp80ayl8agwqe5qeu6ejccs690qdqn3ymjmt9',
          cardForge: 'component_tdx_2_1czl43dxcf96lvvplurlk0gwdk76ca58e8xmd3nrrxyrhgxzzyzrytj',
          radgemForge: 'component_tdx_2_1cpq4ygtkwwf5h4sr6j90j2fdxmpu4lnkkxld6jlegkpukfyet2ekhr',
          radmorphForge: 'component_tdx_2_1cp6famfp23znx8xuzufn7ht32kqt3ym80r2wpaf3k097n9r0g7z0wx',
          imageOracle: 'component_tdx_2_1czwrwel0uxcm4z350pk4gur7w0dmpc0xrp4knkqcr9csajugwxxwgh',
          refinery: 'component_tdx_2_1czxyfwaxn3acm0mu5gyc0qkrztc5tpecvka0f2sv3w0rhgugfkfp3q',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kppqe2ayknetkq2ukpmf3knz6lzqn0pkmpmge7dfmzpvfec6qcf9yc',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cpfe5aekahnw9r8uvznk3x9h2gxxzup8sut49ty83lesn7fh4zdsrg',
          lettySwap: 'component_tdx_2_1cpswmnr3e4sfdj9lhgs9lnpdplfwnggyyl5hwar7r975gzcsl8fva0'
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
  triggerRewardAfterQuest: 'TransferTokens',
  maxReferrals: 10
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
      Starter: {
        name: 'Starter Gift Box',
        description:
          'This Gift Box from RadQuest’s Jetty will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/ykgYDzucDR-laXkFu-Mtb00sb_6jNq-VMKebHMAv32k',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Box',
        description:
          'This simple Gift Box from RadQuest’s Jetty contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/dh4CsYX8ZXBCZboy03TwvYdEdOk8D9iNHmIxMpM0UjM',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Box',
        description:
          'This fancy Gift Box from RadQuest’s Jetty contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/Ba8bp5mqJYicUGvyEznwA63HF7DZevO_LyZEwAw9GWs',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Box',
        description:
          'This truly elite Gift Box from RadQuest’s Jetty, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/vdrkR2hi0dII5R_GEWsshock2ER8EKLs93Qb_L___gA',
        tags: ['radquest']
      }
    }
  }
} as const

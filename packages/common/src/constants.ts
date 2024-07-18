import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1thfrdywckjhdvztdfapr3dnnluha2tjnafjuczc9j90seretayhcr4',
          superAdminBadgeAddress:
            'resource_tdx_2_1tk2w3qw806qz0e3flue0jut2wxp9gvjtlawj5wj7cjv0z7mdtmr57r',
          heroBadgeAddress:
            'resource_tdx_2_1n2859tekly0ed2n606fwtw924drp5rzwhmx7hmmf3attuh202vkjd3',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25',
          clamAddress: 'resource_tdx_2_1th9nmjzvtun2gzgmv9arza56vv9q66gpy2lrfud989hmfz86z7ylru',
          radgemAddress: 'resource_tdx_2_1ntlvekwwg6v50xn63yhxjhe8zlfhjz9a4y6380wlmm9le5eugu5khj',
          morphEnergyCardAddress:
            'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
          radmorphAddress: 'resource_tdx_2_1nfmw0rxyfxhmma6dafgkuh4wqvxklduveuh9e5lauve6pan0ah3v3p',
          ottercoinAddress:
            'resource_tdx_2_1tkeldqqkz6605zx0jkuvtf0ufvzq5sd7m6gctjm7jzdpnk53dlrqp7',
          giftBox: {
            Starter: 'resource_tdx_2_1t4evzm73cvm0a8kp3ues3vf336skwwg53vkyuku0fn8gkhrjafj4cy',
            Simple: 'resource_tdx_2_1t4gcczqylywrc7d3e98m809l49e8huf9dmgap6kpx4sxzk8qsch3xs',
            Fancy: 'resource_tdx_2_1ths56khu9ca3s8xru352sdakklqjwxpgucu9uxp7l7hjdq03x7ugv5',
            Elite: 'resource_tdx_2_1t42ne24zypwwfznpumdg2ss46rtra8k7qr9nhhpjxr7l72q6u3zdp9'
          }
        },
        radQuestPackage: 'package_tdx_2_1p58nns2tfm70kxa7dvu9dxzhlhe8mueqdecxs7etxdd3nqzp7x476h',
        clamDexPackage: 'package_tdx_2_1p43p5xg233gvrkz6jdd5yvd52v0dxvy9905cpalztsws398phj5fs4',
        components: {
          heroBadgeForge: 'component_tdx_2_1cpvky640kmm79geqvvadhxek6prvs8lt0vpza732x85dzdzkmm5swm',
          kycOracle: 'component_tdx_2_1cq6gc05mxnw4jhqr5xx0a6pee0dvzlx0prtp8xkyd8u6vx8kv0n69a',
          questRewards: 'component_tdx_2_1cqf2nhfzdhfp8grkjxtt6gkt82d0q57nps8cmpj4wzk72vfku4wh6n',
          giftBoxOpener: 'component_tdx_2_1crflnq2jxcelz6fkpp48rw950qlnkezxh68t3qmcxntc09tghgzq3g',
          cardForge: 'component_tdx_2_1crvwvp83j96e3gerjexspqsw3r4wpqzsylcp7dn69pt4nh5knwxcw5',
          radgemForge: 'component_tdx_2_1cpsfezm3gggpw3gk9ln4uftcthpsn0w8jhdkl8dxnzeql5rxsx95sr',
          radmorphForge: 'component_tdx_2_1cpw7atp6ndjew929yry9j7vwwuncurdc877vevk60yaexfe0mqdmkt',
          imageOracle: 'component_tdx_2_1crhm6546wkcfdmsk7st52m9jxh0lt0u5jmepzk7xamq0yvuwhvppwg',
          refinery: 'component_tdx_2_1cz0avpsd2cwmd9q4ukqux2zrkxmfemysxk5mdwlvh09euyr75raqpx',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1krc2j8s8e362yxtgqwncwxqvffwnx6ggrnkaccahzcn04xul9w7sxe',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cplnxfup3aua9f7733hhreg8jydaspme8w9fs0eks9j9fss532z6q0',
          lettySwap: 'component_tdx_2_1cra28au5hy2kd748am8zlaawwncqq3chfnnqngv9g6u5g68x0hh8lk'
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
              'accesscontroller_tdx_2_1cd9v70l2rvz90n02g0w627ywh0xlmu734mm0yq52ahm74p9fawqkxv'
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
        name: 'Starter Gift Boxes',
        description:
          'This Gift Box from RadQuest’s Jetty will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/ykgYDzucDR-laXkFu-Mtb00sb_6jNq-VMKebHMAv32k',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Boxes',
        description:
          'This simple Gift Box from RadQuest’s Jetty contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/dh4CsYX8ZXBCZboy03TwvYdEdOk8D9iNHmIxMpM0UjM',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Boxes',
        description:
          'This fancy Gift Box from RadQuest’s Jetty contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/Ba8bp5mqJYicUGvyEznwA63HF7DZevO_LyZEwAw9GWs',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Boxes',
        description:
          'This truly elite Gift Box from RadQuest’s Jetty, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://arweave.net/vdrkR2hi0dII5R_GEWsshock2ER8EKLs93Qb_L___gA',
        tags: ['radquest']
      }
    }
  }
} as const

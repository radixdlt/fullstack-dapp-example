import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t5aexqfh6695zkkvpf3hkenjx3jxvy4gvh4zkse9htyqmsc8rvujal',
          superAdminBadgeAddress:
            'resource_tdx_2_1tk9hsmzsxscskkj6gt32qjg2xs9kxmch2tzu4mqy9e3s92nqvl9w40',
          heroBadgeAddress:
            'resource_tdx_2_1ngqe6e0ty64jxj3ct208w8s5ju0nvseznfr6cxuecpc3k2p590czwu',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thfs0glmgf5z6rp6gradqan66p45rahl8lqcq6k3pk2fma4kdfdjz8',
          clamAddress: 'resource_tdx_2_1t5zj4lnxafxxxc95erxt8ue6gk7zz7nfxtql9a3rrzpaht40p3s4e4',
          radgemAddress: 'resource_tdx_2_1nt3xf766fhxf087lam93dxwx8k7lgfrzwatgzs6smhuty7r7dkg3lx',
          morphEnergyCardAddress:
            'resource_tdx_2_1ng39xlm8hrwsm6dwpx44jlthw32nppm4txrsvkt3xgsmqqlqkfhma9',
          radmorphAddress: 'resource_tdx_2_1ngpan6f23sx4cwp38fpelwlwfcgavtm5ghlgc3euexmdnyjgz5sgrz',
          ottercoinAddress:
            'resource_tdx_2_1t5f6h948pl62jctqdyqsjhdslrt2q0ppxedgkzqx44ph799qgxrn8n',
          giftBox: {
            Starter: 'resource_tdx_2_1thdql3qa6pe7n8gvc5zd7s8jxcdzugyuddhd27daysyxtjmxp2kn43',
            Simple: 'resource_tdx_2_1t4knc7qgtxpvd7fr9p87kf06zuux3suw7j53hyt7pc4h3c56ulvdc8',
            Fancy: 'resource_tdx_2_1t59hy7cqx8fpwj4ss73ahlfuyplhdt4xvaz5f520lswaa9ucwnmezc',
            Elite: 'resource_tdx_2_1t5t0scg8l0329hxwj7fxd3qrr85ran3ep77l29w3c3vmkm08hhvm58'
          }
        },
        radQuestPackage: 'package_tdx_2_1phwglhy35ay2anw4y5vfjhxgytjjnnju78dkudqgm3zazajvjyp0hc',
        clamDexPackage: 'package_tdx_2_1pklsdy7mqrhxe9zxktz8wnmx9q2acmj3fws07sw0hn0jzwvy5w3f2l',
        components: {
          heroBadgeForge: 'component_tdx_2_1cpldfd5q2y9jzyg9q37mtyk2pzt7evek9y6x5adalnxsxtvd7c98s8',
          kycOracle: 'component_tdx_2_1cqvsyjx4w5e4vrvgydnrkmwlkunhc2xqa7vccjcunyevsuk8m0x82p',
          questRewards: 'component_tdx_2_1czl5yr6t5vnr446tassjm09m2vyyf9xnt6x28vt65eh9yfya0vg0yk',
          giftBoxOpener: 'component_tdx_2_1czm7lgsuehjpwa4pe5plzezlmaqgmxwccsdu0yxksudqsr0x4jz7vk',
          cardForge: 'component_tdx_2_1czgffwqpe66ht6af0c25v3v3mr4pj9mqkfuufuhc03jat4rq5y0zdf',
          radgemForge: 'component_tdx_2_1cr5u7ur59md3wxm7vv82mvhjjwdkcw7hsg3u0a95fg62lef6jd9smp',
          radmorphForge: 'component_tdx_2_1cqrt4w5vqdtr2vmclw6yfelela4fhs5ntvk27lvdpr3rvh03a4jg4s',
          imageOracle: 'component_tdx_2_1cztjh3expjk5lmqz0k22nzf5w2t3u9jygxy2ud2hu4jvyumj2n4rca',
          refinery: 'component_tdx_2_1crsjd58gzu5c8cwpmw6d6wfj8wda65czpxdfjyq4cvp70xnay5zhmh',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kp8jsqeyyjdfpr995tasa6vkaw3s3urdk8c993xtcp5w8nys5nuu6d',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1czllug3kkp7uetvv9hpsgrpsqrkjcxnschy93yv4rp2t3hcp4fvf2w',
          lettySwap: 'component_tdx_2_1cq9mplttd7duracheduq4n9h8sy2u43wtx4q6tqy6vl56h79damcrk'
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

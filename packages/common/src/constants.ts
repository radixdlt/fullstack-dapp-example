import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t4ry29fem4mn7f3yertq29a0muyf2ktu559zkqa07hletu233zyarh',
          superAdminBadgeAddress:
            'resource_tdx_2_1tk0e4rusrhmv5t6zt0p9tt7lp4trgvtjhg0n7rlrzkvssqjngsnsdr',
          heroBadgeAddress:
            'resource_tdx_2_1nfl34mhrc37j4m2uug5h86dq37qz4vku4l64uy9nkqdqflhqe2ue98',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thn009juacw4rqqpmyjg94mn8xe4wggjhg24ywmy02hpejcvyf97md',
          clamAddress: 'resource_tdx_2_1t4yzvlcpmylv7l793atjylp0ww7lkyxqhue7353exfrmy20dkhga39',
          radgemAddress: 'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c',
          morphEnergyCardAddress:
            'resource_tdx_2_1ngeluhd5fkhxza03h08lmn2rlny5a6at07tm6ah4fr9kh97zwtcxa6',
          radmorphAddress: 'resource_tdx_2_1nt6u2lduqqxv0ggldtl8e4s8sjwrhe4j8fpfelychevus72fsmw7ax',
          ottercoinAddress:
            'resource_tdx_2_1tksdkqmhgvn25g2hnupqvw28kmzdmpjv44h7h9a3kqpmwh5jzt9frx',
          giftBox: {
            Starter: 'resource_tdx_2_1th7fkf05693fvffunfqw4p8m84jxdeuwrfzt3hpnvmnq3una48eavj',
            Simple: 'resource_tdx_2_1t4u5phyrtd4t8u9glt40fdl09yky9r57varfc5xy9nx4ukgultpphr',
            Fancy: 'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
            Elite: 'resource_tdx_2_1t5yqzdlmwkc3r8qctzuwr48cftvtlv4zu3vqnduuncf8ca8su8h04n'
          }
        },
        radQuestPackage: 'package_tdx_2_1p47pj8gly2xl7z4w527cuhj9ecdlljwrw6waqdhw0jnmpk0uyvauk2',
        clamDexPackage: 'package_tdx_2_1pkaz7qladfcj8ggam3cnxc0adfch39ezsv4qj5dh4p9qkqzs4n2w7h',
        components: {
          heroBadgeForge: 'component_tdx_2_1cp2rp4zst3ut5uw2pc87ev0878084c5n44nanexx39u83hguy9lfkj',
          kycOracle: 'component_tdx_2_1cpn35vds8t9993avky26zqvdcnteukmfk04uy65ld4flzdqly7fkme',
          questRewards: 'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m',
          giftBoxOpener: 'component_tdx_2_1cr78xq2prkdmx60zk7vfxecekr89l3aahgf65ldp64509t4ar5fhju',
          cardForge: 'component_tdx_2_1cpym8shh85k8av5vex9fnvcxv4enppgvunuvm9png40tz53uf855s0',
          radgemForge: 'component_tdx_2_1cpyc6yg9r7zvty89e6kyg5nvrxxpvpl697pypmt0gsn7usrllaypfs',
          radmorphForge: 'component_tdx_2_1cqwvrfl0dsh52r2sm8d8edm3xv6tfgenfu322wpcw5jm2jmkxta02y',
          imageOracle: 'component_tdx_2_1cpgr9jy2lpqt56780e83zg06z8z9fjsjmsup30cw5wdrygtw9eqnma',
          refinery: 'component_tdx_2_1cq46e9fpa58a66us5h8eh2v5wz8ysmt7awgy0mq8nazpmu43dnqq9e',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzuv77chh2xnkcwy80sng70dqdgqf0hvgfd02s7asz4xnflr4zn82r',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cza82ye8fwj7qa9lytzpwtdh9v90l4n7v75f0w4hgh2srhuhd5jql3',
          lettySwap: 'component_tdx_2_1cpl4zgfn52fqsv9y9qvqps8ttsd42kjfmk097rkfvuylh49c6g5j3k'
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
        icon_url: '',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Box',
        description:
          'This simple Gift Box from RadQuest’s Jetty contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Box',
        description:
          'This fancy Gift Box from RadQuest’s Jetty contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Box',
        description:
          'This truly elite Gift Box from RadQuest’s Jetty, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        icon_url: '',
        tags: ['radquest']
      }
    }
  }
} as const

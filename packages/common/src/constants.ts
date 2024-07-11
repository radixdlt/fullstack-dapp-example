import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t4d7sy9f2hc3s9w38dlm36mnajxcj6wn6gvrlvrhhjc2peazy3agdl',
          superAdminBadgeAddress:
            'resource_tdx_2_1t5g979v3szdnzludtdl3j9zefu7zcyma55wg5hr7yvth8ela0wvfw4',
          heroBadgeAddress:
            'resource_tdx_2_1ntzzh6cw63az3p5g0ak97dkvahdgxvk38v07lnlcddjcw94kacj58l',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq',
          clamAddress: 'resource_tdx_2_1t57xphjyq8hstxf776rlpmhm0dtk36hvvemk5ntkrnzvvfvkw0xh6m',
          radgemAddress: 'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz',
          radmorphAddress: 'resource_tdx_2_1n2ywedpf6kd3e96khelvp6c05ykeuprmvaasm7c4qmwtumualq9vnh',
          ottercoinAddress:
            'resource_tdx_2_1t552ls9tn8p92452kx4wpd3qksg6mgm7mx74ekew09n2hkjv3qanfz',
          giftBox: {
            Starter: 'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
            Simple: 'resource_tdx_2_1th5ngrqy3xkl4ce90yqn74wqd4efucdcn3zaegcg8km5yg730ksq6k',
            Fancy: 'resource_tdx_2_1tkkmfgyp8yjfd0h555hjc4n3358de62ftnv25akkfhfpy4vj77uw3e',
            Elite: 'resource_tdx_2_1t5ts7egnc8akwwa5uueq24nyyw7n2dnrs0cgfrhsywf0qcs8lja55c'
          }
        },
        radQuestPackage: 'package_tdx_2_1p47g0ah5efzstj0ywcslylem62tne5eh05nu4jp7nnpjz4krl7prmf',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          heroBadgeForge: 'component_tdx_2_1cz9hluu9fuemr2gpvq7henugcgfzqps46rrg6ts3p8fjtz5lthslg2',
          kycOracle: 'component_tdx_2_1czqsa5axakx6ve740hxafuulef7a50u5hmc9kmcxjp3pj6lm37xnyp',
          questRewards: 'component_tdx_2_1cr9h09w76m5p3ctgkpg7ynxvj2q5gral3uxsr3nl8valhsz8p7w6l0',
          giftBoxOpener: 'component_tdx_2_1crjxe0rdx4yzgv28wk2l99t85ks4e5fqhxu29xuj2r2lczdjnumy5g',
          cardForge: 'component_tdx_2_1cpzu3v723ezqm3vv9s25cprdhwpajds8ua5dd55j64xmdjlv96cst3',
          radgemForge: 'component_tdx_2_1cpvurndgpyxqpd0tfccjjuruner04238k3mrtrevk2re3cuwjyxt7v',
          radmorphForge: 'component_tdx_2_1cp0jsq5sxc66n94gycyvfhum7fn3ktkdaulssdcmya7877v9cz8lzz',
          imageOracle: 'component_tdx_2_1cplvxrpam3m99n870yn5zdq09yza25v9ezju89u9xx9lq0tzdd750t',
          refinery: 'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzugqdyae6me77ecyctcxaqqhcrrxn27a6q3g93v0mtweslswh99r6',
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

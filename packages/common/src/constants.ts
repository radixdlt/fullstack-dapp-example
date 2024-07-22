import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tkewy5e4cgwr6qztyum8zch85fgccfjpujkp3jx45ag9qzwev3ud49',
          superAdminBadgeAddress:
            'resource_tdx_2_1thwucrt37ajfknluwmj9s483qxz7cqcwlvf9xaun9wx5yxn3r8zh7v',
          heroBadgeAddress:
            'resource_tdx_2_1nt72qwswkjkaayfwgyy0d2un8wvpjlq2dg5lq54382wlmf6yly8vz5',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
          clamAddress: 'resource_tdx_2_1t5m454mwsa54u8hmlzfxl474vsynf8nm0htzhw6kkh7ksr0xkcxdrc',
          radgemAddress: 'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
          radmorphAddress: 'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
          ottercoinAddress:
            'resource_tdx_2_1t5t6t93ngy442dr2aarqvsrk6vdqxs70m6yeepfudhnfzxpfzxsvsd',
          giftBox: {
            Starter: 'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn',
            Simple: 'resource_tdx_2_1th69mu7mhq5rse8k5p48du3kw5gzf0nwu2tjry3ttqpz240c0sjdf5',
            Fancy: 'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
            Elite: 'resource_tdx_2_1t4esvjqcjr8l4fpuurg0un9lesmfa8mdv85dc34qmxg7xhpwwntcx6'
          }
        },
        radQuestPackage: 'package_tdx_2_1p4ttuuq58zk2lrm77488rfhdattf0r47e7q3wxsk3lmrc9vwduheyk',
        clamDexPackage: 'package_tdx_2_1pk54w09fwqv9resal68ee43y2gzjm3m0kfw0sjhnhrpw5w8kzxgvc6',
        components: {
          heroBadgeForge: 'component_tdx_2_1cpgw99fcjsd74tdyleeh5q6agn80muxd3zcwxemaqnvjlgtqhqkg3e',
          kycOracle: 'component_tdx_2_1cp84fkgrlexaanaclrf5dd5agc0vss7pktvru83nyutlel4fcf3a85',
          questRewards: 'component_tdx_2_1cqq4p4uqeersge776r2rdlgujwk2vt3dgtz0yuhjw0ruq92960jj8d',
          giftBoxOpener: 'component_tdx_2_1cpjrdsfu8hgkrasulzgucqmu0kzdh7sxp8lfg4h87wqvw9funz6j9y',
          cardForge: 'component_tdx_2_1cz076mclrappmt0ah0hu5fstpj8ychvdk49v48s6dglxhuxj7pcfrz',
          radgemForge: 'component_tdx_2_1czr60gtxm3wkqe83m8z6e3d847nc3xl52tlje6v4z6tl6l6g96p5mr',
          radmorphForge: 'component_tdx_2_1cpvqkthu2etgjaearwfa0l0h8j5lkcrjv5hqw0vyp2uq5hrht8v3we',
          imageOracle: 'component_tdx_2_1cpu0rw2yxtd57g8ganduded3gx4tgxvmqxg7wguz9ccuyy7xrev8sr',
          refinery: 'component_tdx_2_1cqd3lwkveky3uxex492ekkkj4nwu6t7ndqyzavljnym3e88rvt0qjk',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq47p43qn68apz5hm7sq5ugpqcamlwxw20yacv0d5l7gwgeuetj9r4',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cqkfz08n6hf3upsxwmmum2jur5uzdrqyg3cj7wer0j5enkx09vf8aj',
          lettySwap: 'component_tdx_2_1cprs50nccw9mxy3ycaws8whdjhglszl36n5qrxmt334sj54cn8fsl9'
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
            address: 'account_tdx_2_1c9ypvf4v950yellpnkteuxk2lf8vj62dcqpgakt3wxeduck8t3ksl3',
            accessController:
              'accesscontroller_tdx_2_1cv2thjxmyy8n7zs3jfcq8sd2x2cgyhcyj820528h5nsv0xcluw2r47'
          },
          jettySwapDappDefinition: {
            address: 'account_tdx_2_1cx3enkwl3f4aj43qg7jjwnla2a6qr8gjz4lceuydht3aetpjrgj9fy',
            accessController:
              'accesscontroller_tdx_2_1c0u7zzep03fxn555e4m34zsxlw8aspvywrkgj3vtdpa0mcrdphv7ws'
          },
          lettySwapDappDefinition: {
            address: 'account_tdx_2_1c8vwnt9q992vqd2dhdrz7rqxmq4sfsxqj5zqcpzyev4s9y3ars4s64',
            accessController:
              'accesscontroller_tdx_2_1cwla73jqd97sf8qpzsfcg0mtr8fqnwgg27zwp7eepl86es7kqxatnz'
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
      },
      Mainnet: {
        badges: {
          adminBadgeAddress: '',
          superAdminBadgeAddress: '',
          heroBadgeAddress: '',
          kycBadgeAddress: '',
          instapassBadgeAddress: ''
        },
        resources: {
          elementAddress: '',
          clamAddress: '',
          radgemAddress: '',
          morphEnergyCardAddress: '',
          radmorphAddress: '',
          ottercoinAddress: '',
          giftBox: {
            Starter: '',
            Simple: '',
            Fancy: '',
            Elite: ''
          }
        },
        radQuestPackage: '',
        clamDexPackage: '',
        components: {
          heroBadgeForge: '',
          kycOracle: '',
          questRewards: '',
          giftBoxOpener: '',
          cardForge: '',
          radgemForge: '',
          radmorphForge: '',
          imageOracle: '',
          refinery: '',
          kycOracleKeyValueStore: '',
          mayaRouter: '',
          jettySwap: '',
          lettySwap: ''
        },
        xrd: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
        accounts: {
          owner: {
            address: 'account_rdx12y0v97zppwn8cx5fks8ap2hk6jshpjjx8mwzwn9tvymg2pyx0mv9nk',
            accessController:
              'accesscontroller_rdx1cwyyg3rlxrdpyzus2adrq9lnfexf8wgs4p6r8ugsgmdnu0g4utjqq4'
          },
          dAppDefinition: {
            address: 'account_rdx12xkqkcxqzkuc0xnsme9etvttmwfz8aqnhpwc0ygv8tnnpdw2v5cfzd',
            accessController:
              'accesscontroller_rdx1c0dpryhtc9s7a5qymj2zrun6pj644r66n8at2r8q6k5ztwkr7s84hm'
          },
          payer: {
            address: 'account_rdx12yvpng9r5u3ggqqfwva0u6vya3hjrd6jantdq72p0jm6qarg8lld2f',
            accessController:
              'accesscontroller_rdx1cdwhkag6gv2m4rfwdm57w44sffa8eufd0wvvu6d3atfcfv64y3t2qn'
          },
          system: {
            address: 'account_rdx1287ttlwdj70l4qhe6hc6gcad5ltxahf0vrydqnhj7dvc8kyqp52x9t',
            accessController:
              'accesscontroller_rdx1c0t7hcmt90htanr37s4vy0g6uqc0wgdvsq80n6mu5pjv2ecqgxmnhx'
          },
          jetty: {
            address: 'account_rdx1cyeaxqkuaqcgj6fnq6eq9av6pxzsud38xhl4ar0hygep74r48mluht',
            accessController:
              'accesscontroller_rdx1cvmgr0rd8xqp28gg9sdx0klu20028gnuzp693yewazucrfy8kwqpkr'
          },
          jettySwapDappDefinition: {
            address: '',
            accessController: ''
          },
          lettySwapDappDefinition: {
            address: '',
            accessController: ''
          }
        },
        dapps: {
          instapass: {
            url: ''
          },
          jettySwap: {
            url: 'https://jettyswap.io'
          },
          lettySwap: {
            url: 'https://lettyswap.io'
          },
          radquest: {
            url: 'https://radquest.io'
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

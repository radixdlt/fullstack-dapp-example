import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1thafz0a77yundgjawqcft9qyxpewymzwkugutmnve2kp97s6jjxkay',
          superAdminBadgeAddress:
            'resource_tdx_2_1t5d4ufxeg992z405jlp45atm7ur7utr7a3j69u6hpu837fm2plj9zm',
          heroBadgeAddress:
            'resource_tdx_2_1nt72qwswkjkaayfwgyy0d2un8wvpjlq2dg5lq54382wlmf6yly8vz5',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tkq4pl7nrs0330hwkyqlu4kgjrvjs0xy7nr8efmdsx5w8wgvg3dslf',
          clamAddress: 'resource_tdx_2_1t5kyscsaf4udvzzc778t9s5g0jlam0ftd3qtgh6s97z023maw9djes',
          radgemAddress: 'resource_tdx_2_1nfn7gclgvptv5w99zk4lfe5tvnk2npp9f474g4p54m95xpual3pdck',
          morphEnergyCardAddress:
            'resource_tdx_2_1n2uz0xh3jt2yfaj90vnq3uyxnunl2pdtcqq2rs8dsrzpjucng4ssla',
          radmorphAddress: 'resource_tdx_2_1ngzayva4aunjsysjldq444kkp5m0c4qtxsaxdgmq27uyvqacz6mfue',
          ottercoinAddress:
            'resource_tdx_2_1thd9zusvcng2g03wkg559chhywfxf4wrcdzarrszjwc9hr93pmszsd',
          giftBox: {
            Starter: 'resource_tdx_2_1thkau45mtpq9jay2a8ya9qjzk7squz6ufczugxfk3qfscxtyz7faf3',
            Simple: 'resource_tdx_2_1t4zmlewms2h6a8ytjmlhk6sa293ue0kakj2mvf9u3z0kjfzu54xwft',
            Fancy: 'resource_tdx_2_1tharyfc8eh2pk8ajy668cz2ffuq9gca2wfq254uy8wzse755x7xq52',
            Elite: 'resource_tdx_2_1t4eh8a9vv5kh3fyxf7er3vvkd52wavehwx5j6egvqrr8kysvkpg6xg'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        clamDexPackage: 'package_tdx_2_1pk54w09fwqv9resal68ee43y2gzjm3m0kfw0sjhnhrpw5w8kzxgvc6',
        giftBoxOpenerV2Package:
          'package_tdx_2_1p4smghly0ywcnmpdjqla7rvn4mvuffqlu0g6dy87mqf0e8taq05crm',
        cardForgeV2Package: 'package_tdx_2_1p4h7fmtl36jqprzf3ks944lquwfwkxearrcq4mjyjjv7p6nvm6v356',
        radgemForgeV2Package:
          'package_tdx_2_1phplch9ccp4ry62x8kxlgjx3fjfhptszltyrn5y7qn4tcjz3r5vaz0',
        questRewardsV2Package:
          'package_tdx_2_1pkgjt5ylzaryzhsh5fnkgfcjgkemj0fn3zsxyhmkea4s0chrjndv8k',
        heroBadgeForgeV2Package:
          'package_tdx_2_1p5lk258zwn6qs677gqlkn8srwy8cwm5zfq97qhkwgphr2yhuqhllr3',
        ticketMachinePackage:
          'package_tdx_2_1pkmkll2d63ugxrd5uph0ddlm0gjrgvlqmdyctr82aaneft66tehljm',
        components: {
          heroBadgeForge: 'component_tdx_2_1czggp0fz9pcarmhp8uxpy9qr8ysz46qkpr49t3jdrn8zzanujj8fpy',
          ticketMachine: 'component_tdx_2_1cr6mvq384sjshjwxgjrf20l25wcq4hqfhuezujh7l88w5ulf6gy9pf',
          kycOracle: 'component_tdx_2_1cqgu87tk0sx6ldn7x0heev0vgc6jq4uu0tahkfumfpgmw7acxtgqd3',
          mayaRouter: 'component_rdx1cp7hrk7k0pjavnpt5h6dsel096kzlj96r8ukw2ywqgdc5tlvpvn0as',
          questRewards: 'component_tdx_2_1czukjx0y294tgzz2w236je8sv8pr4mrz3p566rm6vlq4nfr2w2punu',
          giftBoxOpener: 'component_tdx_2_1crsll3wjqke9detnpr8r0t0ls6m5kd57fu2jr5r20qfauuy575rh5p',
          cardForge: 'component_tdx_2_1cp2r0wrszxf0qj9hqykm6nv6avzweqazxp2yu43zemp5q0prpl0rfw',
          radgemForge: 'component_tdx_2_1cp64ncg6ghglxup5fmyxlwzasa7hcrhxwuxptwxuuja7cuhg9fyhzq',
          radmorphForge: 'component_tdx_2_1cp557n533vua73t3u7gw8h65shr09suwq7trmcgtg2w35u6fldwxcg',
          imageOracle: 'component_tdx_2_1cpv8kqscy5my4v0n7nzrnhcsusvdtrp73l2qdvjvsmga0k6p5yzrkr',
          refinery: 'component_tdx_2_1czrjg4sm923gq8xe2xdr32wrsd7ccdfm798kd0kvfedjr93dp7fchh',
          giftBoxOpenerV2:
            'component_tdx_2_1crrlzuynltx4dyd8j4je7tuwvg3f8r457xjx0dj0erv5cjf9dhhq87',
          cardForgeV2: 'component_tdx_2_1cpklvrnnp7uhyunkng5xelap446j0yzxl3s2yqed0mdcll0fkdrnnp',
          heroBadgeForgeV2:
            'component_tdx_2_1cprh6mf0n8xzr3zgcru0m6frr8kuuur8m6lhhnytf6elqwqm7fzxut',
          radgemForgeV2: 'component_tdx_2_1czh9dpk3fu5ud99mzzewfc9h9yymzrxv7hxuzz8p9m40mvzn50vmg0',
          questRewardsV2: 'component_tdx_2_1cqutzhph3yvqywcvsxmzum87vssrfgycxc0na35quk5m3a5s99v2c3',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq4cuyae3uuw9ss06an9cdhd577p7gjnkfqm7mwqvsdyecqe4syxql',
          radgemRecordsKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kqdlru04d9gfvjzzkhmmf2lptxfdenw38kn5kz5nr5rdjh9m0yek70',
          radgemRecordsV2KeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzr894n384n7arfrnc4vejxfdqawu5e83rcuph6cjjqeswlmr80gsu',
          giftBoxRecordsKeyValueStore:
            'internal_keyvaluestore_tdx_2_1krepp99ahmrzxe5qrsyhzy6e7cyvqwhg4dvtqt3pdjq94yd4xwaynq',
          jettySwap: 'component_tdx_2_1czu6r9zpgsuylret7jfswwlzfgxp39spvd6wh72waqy30sd55gwz4y',
          jettySwapPriceOracle:
            'component_tdx_2_1cqcsfhgk8k8kuknmk7cmvkfu2whrz0ysd3swxggdu3lreu3lh7hyhq',
          lettySwap: 'component_tdx_2_1crzgytxmmpee8n79ehlhkgvqzza6utcqv0e3jh9fatqwjc4r7kwm4s',
          lettySwapPriceOracle:
            'component_tdx_2_1cqwgc8ppm4ahxpdc4lepm77vz7vwzrp30hz0ukr0mfu5r07w9jydtf',
          clamFaucet: 'component_tdx_2_1czchem76enagktv3wzkffp0upcn0gs4s4wleluemnws3ztraps05av'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          owner: {
            address: '',
            accessController: ''
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
            address: 'account_tdx_2_1cxzl72tc7llpkjxngy9red5gthvrcwuzy3negu83wwh5rj4wvve8hl',
            accessController:
              'accesscontroller_tdx_2_1cvuswukv7nvrk6ax4k75k8zaypzmy0c5yv6ek8j46nhs4ll7d5rpls'
          },
          lettySwapDappDefinition: {
            address: 'account_tdx_2_1cx93lagvxjky7g32v4jlhup7sy96qxvcahephuteukxuzv06jqv63u',
            accessController:
              'accesscontroller_tdx_2_1c0ahm9p2dhk233yaptfaupzklh8dkzht3etpy874fudl5n3y84p7cf'
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

export const EventId = {
  DepositHeroBadge: 'DepositHeroBadge',
  JettyReceivedClams: 'JettyReceivedClams',
  XrdStaked: 'XrdStaked',
  MayaRouterWithdrawEvent: 'MayaRouterWithdrawEvent',
  QuestRewardDeposited: 'QuestRewardDeposited',
  QuestRewardDepositedV2: 'QuestRewardDepositedV2',
  QuestRewardClaimed: 'QuestRewardClaimed',
  QuestRewardClaimedV2: 'QuestRewardClaimedV2',
  JettySwap: 'JettySwap',
  LettySwap: 'LettySwap',
  GiftBoxesOpenedEvent: 'GiftBoxesOpenedEvent',
  DepositedElements: 'DepositedElements',
  RadGemsClaimed: 'RadGemsClaimed',
  RadMorphCreated: 'RadMorphCreated',
  PurchaseTicketsEvent: 'PurchaseTicketsEvent'
} as const

export type EventId = keyof typeof EventId

export const CookieKeys = {
  Utm: 'rq_ma',
  GoldenTicket: 'golden-ticket'
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

export const BusinessLogic = {
  Maya: {
    supportedTokens: {
      XRD: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
      xwBTC: 'resource_rdx1t580qxc7upat7lww4l2c4jckacafjeudxj5wpjrrct0p3e82sq4y75',
      xETH: 'resource_rdx1th88qcj5syl9ghka2g9l7tw497vy5x6zaatyvgfkwcfe8n9jt2npww',
      xUSDC: 'resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf'
    },
    transferValueInUSD: 50,
    paddingValueInUSD: 1
  },
  QuestTogether: {
    triggerRewardAfterQuest: 'CreatingRadMorphs',
    maxReferrals: 10
  }
} as const

export const Priority = {
  High: 10,
  Medium: 20,
  Low: 30
} as const

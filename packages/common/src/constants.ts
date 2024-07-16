import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tk9e07up5fepd46xgnrqqcakq604cwq33v97smd7qcnqs0af94eewn',
          superAdminBadgeAddress:
            'resource_tdx_2_1t4aa27t8m0k5np08snnf8l4gx0q2azmjexau5uz9jcgf289ascsuu8',
          heroBadgeAddress:
            'resource_tdx_2_1nthqv2vwuxmmvlq8evdgxmdrz9u9ue74a5pqhwfg0mxcezn45l3xup',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t5986unw3w64h0w2zx8nc8wfhhwer3uxpg7hh8jy2rad7lp50s7pht',
          clamAddress: 'resource_tdx_2_1t5z9x2gekqfuem3pyh0z2gz0ytzuz3vdjz53ycxye8d29pu0lcyjvc',
          radgemAddress: 'resource_tdx_2_1nt5y663nqhhpulqr2zdgv89xctegevhw2xjmsa3h5w4j2m5f6h79ja',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfc7743pq4qsm9guranl3ej6n62maz4hklyw0k6rfsfrx4rlq7w9gh',
          radmorphAddress: 'resource_tdx_2_1n290uc0zxx32caele5rts7nrpzt3eeyulgfd4g29zurzzd0knv3kex',
          ottercoinAddress:
            'resource_tdx_2_1t4agu2vrae8taf9zwjt9u8pplkcnu83tt64nafm3fgg7qthdzvzcjg',
          giftBox: {
            Starter: 'resource_tdx_2_1t5xqsddldgh0stzfcy4tq6n5hgm76y0680xxewgqu8lsphn66627dk',
            Simple: 'resource_tdx_2_1tht7dkc6utgw7ww6sll9vnz4ey7pcufrp8r0j7q0pmzn4cpx3ucf4f',
            Fancy: 'resource_tdx_2_1t4ryxpghm2z7q3nqqa7txj993ckd5waxtd2qtplza6jt8jmdc6lzne',
            Elite: 'resource_tdx_2_1t4ckj28ll8xksdrcatm4y7c9tjcsv3tfrwjulrvj432fesjf75vdmc'
          }
        },
        radQuestPackage: 'package_tdx_2_1ph6ff5qwu75ykn92e735d00da0uavpzp0tg78x7phhlxay47rnvy0t',
        clamDexPackage: 'package_tdx_2_1pk35c0us3v68zmnd0nv23xq9eu29p5962c67csy4zfc694663wj5ss',
        components: {
          heroBadgeForge: 'component_tdx_2_1cr8fch6kgxa5jzgaf8j9rzuh6mwehfrgqd77mx58f7tecv62xlwx2h',
          kycOracle: 'component_tdx_2_1cr4w2vvwk7wcly2nkak7ex6lmjtw06uhl5uke3mnpksm2f0ugjlhz6',
          questRewards: 'component_tdx_2_1cqvrfl8z4esyljqklrfz6ektqtfq5dm3kyhmf3cf7c38ssslp72ryq',
          giftBoxOpener: 'component_tdx_2_1cpdltr4d0grj2n9gu6exjk7vtyttczatpspzy2cfg6sya4phmhu9p9',
          cardForge: 'component_tdx_2_1cqf2emfrnvzzsw07s7g9zhenel8lya9wpnnhngs063xmr3u42dr643',
          radgemForge: 'component_tdx_2_1cqrc7rf8tulnnf4zrlskmttp5q358nqc25whzup93h64s6kqg9827p',
          radmorphForge: 'component_tdx_2_1czumc3geup9etlzrh3624ryucv28pvn7x5r92j222lzref28a3ppgj',
          imageOracle: 'component_tdx_2_1czmj7z4zw33ayhwz8hvjsc43mspsu04hs4n7rj9du8lfda92e7hr83',
          refinery: 'component_tdx_2_1cqs79a8g0rusa5ks526muxey8s6vt0v99h8cqzzg3n0wtkhsy4phh5',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzaff8vglxegu8v4qg5gghhr2jq73u2sdsvl5m83ksr96qznep2cw6',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cqta04sr7pple9mjfr8hmwe0lkl8nqdvjnmc2sgtjs9mucajzyjvpm',
          lettySwap: 'component_tdx_2_1cr4a5zcsqt445pdwyfkfrlpn60kg2fdpnyvz5uwhfdev0neq4qa696'
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

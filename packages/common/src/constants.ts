import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tkm2de6mt5f443yum2c2mrlc85nhmdj32zrtke63xn0mu3fqqena44',
          superAdminBadgeAddress:
            'resource_tdx_2_1t4uhzhlh764uvjhzfvn9dl4j82898cazwm2r65c8swwlh9r0xk3hqq',
          heroBadgeAddress:
            'resource_tdx_2_1ngd3snavcr2w54h7da80w0j68nvx7m0xlg640tc2un7e3s3g4jt3lr',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t5vugl5pygyzwlh25wc8re33rcrwkdl47shy2psfz8y6hrympg2qpt',
          clamAddress: 'resource_tdx_2_1thm5aw6e00fsl48su8n86npmdnt3wfevvmkfg4gp9rwaw5syqk58qu',
          radgemAddress: 'resource_tdx_2_1ntzsdtyj3qky7hssrg09lj68lw0208gxjgfgmfavuum7eravzs3u0j',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfw0skhlvq4rd4wzsrj0sgdy9wast0vhvr3nq2jz8kuc8nzpf94k2g',
          radmorphAddress: 'resource_tdx_2_1nt53ej9aphqwpqql463lffs850x8ksqqeacaf5989kt27rrdj6695l',
          ottercoinAddress:
            'resource_tdx_2_1tk57jvg5xaaqaed2wz7jll3rphtyzu8r99c3l4rc07epzpn2sazw3z',
          giftBox: {
            Starter: 'resource_tdx_2_1t45gmpum8vk53r59zfwyhfzqcfvracvum2st7tsc3r64uel94xjy2s',
            Simple: 'resource_tdx_2_1t4h74d7l6kja4a2w2x203l77ewwqkkkwxnhnr342tlssmn4nurc6wx',
            Fancy: 'resource_tdx_2_1thrrwmwu0qf9uqscz87ufqz5ak6y20sv8hmawp9pn4qcd9m2k5vlh5',
            Elite: 'resource_tdx_2_1t5f6vzw6erjfm4rum979uyflnzeaye04qvmrahhhsd8tjdpfs9vrxy'
          }
        },
        radQuestPackage: 'package_tdx_2_1ph6ff5qwu75ykn92e735d00da0uavpzp0tg78x7phhlxay47rnvy0t',
        clamDexPackage: 'package_tdx_2_1pk35c0us3v68zmnd0nv23xq9eu29p5962c67csy4zfc694663wj5ss',
        components: {
          heroBadgeForge: 'component_tdx_2_1cqylf6ywz6ue8ufex7ltf8hsnztcf7v6yq0k3kxvnerp6wvvnzqkgr',
          kycOracle: 'component_tdx_2_1czrr8a69ezlvvem0uz47xtfynet29g20w7hlr8lk2zjps3ausd64pw',
          questRewards: 'component_tdx_2_1cqm5a29hgg5tsuqfgsapp6s2749ya6plql0dfljw2l24xatyernve5',
          giftBoxOpener: 'component_tdx_2_1czhgmu3lm0wy6u6klwl40udwfgfdnh09z67gzgpm7utt5s35ee6el2',
          cardForge: 'component_tdx_2_1cpqq8cjyasefnctma9pa9dq226u6yayyznw67z2pmy30z77uf0gmdf',
          radgemForge: 'component_tdx_2_1czhuzgt345nr9vh7mwet3ufenln2xe4ldzwxatgu6sxyzsunpgsnlw',
          radmorphForge: 'component_tdx_2_1cqepa0ct7tam9szjw60kae02zfduk4qtq2dr4whzysevv0f5n73zwz',
          imageOracle: 'component_tdx_2_1cpx3lqrlw6ymuxskqrr5xa3j2sphdhz9c8nl0u94h5wuk3cv8mxwtr',
          refinery: 'component_tdx_2_1czj5z0n0dhjtxzmauaucy67emcral45zhn34r2acn0wz5qezkcrh2v',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1krxc3z3ugeempueqm8rggq3s4h3lmtggwuhyh4huvpu3a04rs6ac4w',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1cqz24mpme3va6kcetw7k63mf5ygr0fzwmqmuar9x9lxv3r9g7jl5j2',
          lettySwap: 'component_tdx_2_1czagnse46f8kmx57m4n0ejhn68mmvknmqm3ehcprwu3a48ctey4jch'
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
        iconUrl:
          'https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Box',
        description:
          'This simple Gift Box from RadQuest’s Jetty contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        iconUrl:
          'https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Box',
        description:
          'This fancy Gift Box from RadQuest’s Jetty contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        iconUrl:
          'https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Box',
        description:
          'This truly elite Gift Box from RadQuest’s Jetty, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        iconUrl:
          'https://assets-global.website-files.com/618962e5f285fb3c879d82ca/61b8f414d213fd7349b654b9_icon-DEX.svg',
        tags: ['radquest']
      }
    }
  }
} as const

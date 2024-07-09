import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t42w8wgdpg2uk6zgcynd239kzuvc4wc2czwcllvzh4rq73wlu8pkec',
          superAdminBadgeAddress:
            'resource_tdx_2_1tk60umm6u6rv87yr3gy4qxd24uqqxpa72e6alnrqjg6fk75j203psl',
          heroBadgeAddress:
            'resource_tdx_2_1nfav05g6tnuvhtphz6t7rv8wpsceh8hh4mg5aud6c0996dkuzz98e7',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k',
          clamAddress: 'resource_tdx_2_1thpvfcsuwfkp60pvrd5kcn9rg6d7pa0myk4hqrv28qa40j3efctvyv',
          morphEnergyCards:
            'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5',
          radgemAddress: 'resource_tdx_2_1nf96jrpa3lxxzc27y3dttlsg3xvqyjeuddwh4zl6lu59zhdmhv2jqv',
          radmorphAddress: 'resource_tdx_2_1ntl0225s23ap0zkzpc7xpnqy8zh97yud4gltl7jn4ggqdam7nf8u9u',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          otterCoinAddress:
            'resource_tdx_2_1t5pvx3yuwa7rxpa8h8uxnx068ruap9k7nqd7k5qxgay4yjalp9seng',
          giftBox: {
            Starter: 'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5',
            Simple: 'resource_tdx_2_1t5yh4c7kynz84f3lz9tpmx0vlstkat2cmxfe8j3z5teg07wngsuqu6',
            Fancy: 'resource_tdx_2_1tkalk3pwr3dkmluj7rujvg6r27c3kmmw46p6tveqelfhm6mhfyj069',
            Elite: 'resource_tdx_2_1t4vlqdywf6m4p3eeecu2cglneeqt7lc8mrl9xnaryzs9u9edxsr65u'
          }
        },
        package: 'package_tdx_2_1p4s8zzff75nl96nmzxu6scrmfpflm0k0smtsfruel9vd3ndfyt5lzk',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          heroBadgeForge: 'component_tdx_2_1czyf3acwcm596ywmls90l2m6h36la0wvvfwqs96epjq4ahu95kj7sd',
          kycOracle: 'component_tdx_2_1crg8u3tgf5x0664kg4jyvd8dmnrufusmf4m9tvmpdckweakaprmvrt',
          questRewards: 'component_tdx_2_1crcck37dgjmw7feqm85hn647p22jj78xfh0sguqk07z5h8p4katexf',
          giftBoxOpener: 'component_tdx_2_1cpysluekg24ddzrx8u7z3wdfm8udy63rdxws9mv79n8rzy2nms7s0w',
          cardForge: 'component_tdx_2_1crzhwymn62sj7l4aq3e94lc65jhy4l7zpdqszkhaj74tqu64q032en',
          radgemForge: 'component_tdx_2_1cp595y6exxv384kl5ph5669jze0qcx2a6c9us0fl9gqfhf8zuaatgs',
          radmorphForge: 'component_tdx_2_1crhryskrdh8wdwgv0vcznlumwx3ds7dlvmyy6383f7ze3dnkn3dd7w',
          imageOracle: 'component_tdx_2_1cqn0n3jjmkk3wpw8t9kjzwatku0fs5l5um4f3hu4lfweh4tzzas3vf',
          refinery: 'component_tdx_2_1cz3hpjhn94h87ke29egykv6nt7r5lkvflntdnx7qdldfpk7rvu3kxc',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq5gaw4c5kgge0a636dsp9wzu7l06elvff72snuzr45f9775msuqe9',
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

export const ReferralQuestConfig = {
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

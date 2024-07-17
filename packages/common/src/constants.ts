import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t5evhj4wyt9ka75uvx93rcu9t3yhpqlhp5ykxhzugad9qx4pj2fktp',
          superAdminBadgeAddress:
            'resource_tdx_2_1t5xr8uvxs3f6eudfwmj0zggfqjrvnyh40j3rc54hf5z33dgnrye7kd',
          heroBadgeAddress:
            'resource_tdx_2_1ntgvtmax3wa4tg3prf4kzxe9pd25kekulafhjnr6rqxnsn6ruek39q',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t5hpcd8zw7avrfzjqqquc3zrmlwk4u9dfjw6rljcn0kpvf5em933zq',
          clamAddress: 'resource_tdx_2_1t5fsaexrgq4kktv3jma8qxflvzzexv8d8s82myd38uuthryx85sw2v',
          radgemAddress: 'resource_tdx_2_1n2t6ja4fyaxh45glcjgureezf84zxlpq4qq75af7dup5ttn9uj0pak',
          morphEnergyCardAddress:
            'resource_tdx_2_1n2lnkvlf04y6j3kzwj3q9gukscu8mgzmfm909c48k2xmy58yxmmxt5',
          radmorphAddress: 'resource_tdx_2_1n2u38cdpzjx33telhmk8pydu9k76h9cha6vkv8a5km5a94qkvhfzs7',
          ottercoinAddress:
            'resource_tdx_2_1tkdpw0hc86jfu4hw9x9swygfrcm4wgetf33y683gcwqng053n8qtfk',
          giftBox: {
            Starter: 'resource_tdx_2_1tkarx7gld6kgfprqlzh7uwspkf7kjjgjc4358smyh5klc3s98w7h95',
            Simple: 'resource_tdx_2_1t59lrhk4mr8qf5fvz7pyfagupfd94lg4epxs289lzhamutdplcudpz',
            Fancy: 'resource_tdx_2_1t5tmjw675l9d583uj63jstnzx6aqkvgm88x5xxa6pq85czup59vrg8',
            Elite: 'resource_tdx_2_1tkremxq3y9k49hxm2wukyfg2eupgz84l4mqzrk598ggnsmwp3yeykd'
          }
        },
        radQuestPackage: 'package_tdx_2_1p58nns2tfm70kxa7dvu9dxzhlhe8mueqdecxs7etxdd3nqzp7x476h',
        clamDexPackage: 'package_tdx_2_1p43p5xg233gvrkz6jdd5yvd52v0dxvy9905cpalztsws398phj5fs4',
        components: {
          heroBadgeForge: 'component_tdx_2_1cqfrzma6zeezxtrs963gp8gzphpthf4y9z34dupm53wwv77g8e0p2w',
          kycOracle: 'component_tdx_2_1cr8mhmkw53yhy0l94wj6mpdjyqmvfw3wtsrgm8jet7relqalgkd3l5',
          questRewards: 'component_tdx_2_1cp6kgk48tshyzrlclkr9dx275g7wl77ds2m4r267grcn5yf0c8xl6j',
          giftBoxOpener: 'component_tdx_2_1cpvzdrdln53xelr5hsaugj4grw0a9wnjfsevdfmq2dttaas76ql89l',
          cardForge: 'component_tdx_2_1cpquf63mrdvsn5aqdpujk2xdjzv587jqaya8lhe36y2703v044l789',
          radgemForge: 'component_tdx_2_1cpf76fm4mzetp2es639e28egxjl9klk5y4yg4ey0rhah4wc7fhkw7k',
          radmorphForge: 'component_tdx_2_1czqs0ngq8njx4tqr7l5nxdy2ej7samy3xevay56dz88pgqv56fm80g',
          imageOracle: 'component_tdx_2_1cpvyxqdjlpscxrwmvl8lvtuvr7keynpdku8ajdwlwm8jfl4kux8933',
          refinery: 'component_tdx_2_1cp93lvk5u7zcl594x5zwghfxzude8j57k3mddehlpc7205rdhe8yx6',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kr8405fhhvhk3266zhwfypmgfwerj68slfr4qs3wx9spne8czt9mkf',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1crcn0nrfvawzahgg4sw9zeuzjnsj5msaaqk642frsydx4ju8l23hvc',
          lettySwap: 'component_tdx_2_1czcps4zyx9cdtztsd69tp480l2h4ek9pu6vnu44jqh37vdw65mgmgs'
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

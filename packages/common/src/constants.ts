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
          elementAddress: 'resource_tdx_2_1th26phxf2k6rwqvk932lx0ql36qd88fjwy02hj8w099ala2vh3pvw4',
          clamAddress: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
          morphEnergyCards:
            'resource_tdx_2_1nfnnzphs3mqfphqr5nlg8pfwxyrt5dw7eukn3ff5q20ckv68wglqtz',
          radgemAddress: 'resource_tdx_2_1ngfyw2t0c8mrrf96a0p9hufx2t3czxx6hgjxfrkmu5yaw9zvfh6jz9',
          radmorphAddress: 'resource_tdx_2_1nghd6pe3njlavrah0f0lhu7trs4r3xjzjs4ze5msfa4r6szppd774m',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          otterCoinAddress: 'resource_tdx_2_1t5pvx3yuwa7rxpa8h8uxnx068ruap9k7nqd7k5qxgay4yjalp9seng'
        },
        package: 'package_tdx_2_1phfvd4kvhdch8a4002vcnf0adra96qfd5xx8hqkh5v6a4vd95vzf2f',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1czsvrwv0gmdf9fkffv0a0n0mx86r0jw9agz0knxde36yeur83ne0sg',
          lettySwap: 'component_tdx_2_1crcfm8dw90rxgva0ph8fwl356jntmc3dpnra9y2kn9eecc2e5cy0v9',
          heroBadgeForge: 'component_tdx_2_1cqqrcrxvrk7e3jadn72je2trnm8qtyype4wzxpu8zngv7snv7keuc2',
          kycOracle: 'component_tdx_2_1cza8f8knd8y8x4wpf7glra8qzznwc354hnm6r9zsldhn2h54q3y5zj',
          questRewards: 'component_tdx_2_1crxdy20yg9prtprpaphzn2nfg5zetpr2c60jhkk74k7nav55n3sve0',
          giftBoxOpener: 'component_tdx_2_1cp4v20s3vh3c27p8n5dxhqgh6w93gdy0dgrs4cr3ya38dydy9x8xrp',
          cardForge: 'component_tdx_2_1crnszfh54y9drgypwul64hmwqpn2vtpsq22mhneq72yutnktnqqlw0',
          radgemForge: 'component_tdx_2_1cq2u7mt3qy94ywww3yx9z4wdm89dvssm3ev3qvuud7fzel5hanq4um',
          radmorphForge: 'component_tdx_2_1cpey94ppaac98exhrzk6thy8sv44d2u2gcytahkxfudammqygcwna2',
          imageOracle: 'component_tdx_2_1cr7pcrany4mftazqtrr7hlmehmg6zm6tvvtnnggskaunq90rtndpqs',
          refinery: 'component_tdx_2_1czmmrd0hlqre4xhachuyd2feh72pqvk79lpg9ju54u3fz994dxfga8',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzdwhz56kyrhr9ggtflvkw2mlsz39eu3ktff57jz0cdtwmynpf5hlr'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          owner: {
            address: 'account_tdx_2_129mydulw6hteg6hwmg02mcml7z2mz25mhzvavxe2rms0xywlvptx2m',
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
  AccountAllowedToForgeHeroBadge: 'AccountAllowedToForgeHeroBadge'
} as const

export type EventId = keyof typeof EventId

export const CookieKeys = {
  Utm: 'rq_ma'
} as const

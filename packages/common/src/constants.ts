import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]
  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tkqxhltmrtxy6tjnp2p4dpt9vfxymv0mrqvlemtq39uva5lv5dlj85',
          superAdminBadgeAddress:
            'resource_tdx_2_1thul90pjpsjxnfk6qxavtq5qf35sca9nhs2lgw7r9f27pznjnkj07s',
          heroBadgeAddress: 'resource_tdx_2_1nghntcd2plr236q64ztfy6xkwf7waqu0wvn36uvj646z63v9tkscfa'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
          clamAddress: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
          morphEnergyCards:
            'resource_tdx_2_1ngwfwe363l7rag3l2n8pcqjh3828nden6tdsrlww640ggnkv0hvn32',
          radgemAddress: 'resource_tdx_2_1ngsqqj66xx6u7athxynr0n95phj3ljuvje2hkzfvd90ua8569csaje',
          radmorphAddress: 'resource_tdx_2_1nghxdspyat6ef69w8rcg5xk0sjeluk664yf485g9csmqzufhkytxlx',
          instapassBadgeAddress:
            'resource_tdx_2_1nffgrg4sxxswkc3vjydt57y6dcstrl8vp2z22al5h2thzzafk3ql8n',
          otterCoinAddress: 'resource_tdx_2_1t5pvx3yuwa7rxpa8h8uxnx068ruap9k7nqd7k5qxgay4yjalp9seng'
        },
        package: 'package_tdx_2_1p4m6su4hc9ek7ruwrnn2fjv74df2ly3yjnms92e0kskrcapfzvswzz',
        clamDexPackage: 'package_tdx_2_1ph96rek5yr7jh79pw5aqst6e6lm5k62l5pv6j9dxve6scyr3eel3mh',
        components: {
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          heroBadgeForge: 'component_tdx_2_1cq2phk34jyya7a5m96qd684wy5sns37cchdmahtspkk2kxe7z2ancr',
          questRewards: 'component_tdx_2_1czwg5pd6wq86emsjwf0vweljkye870n3l8apwy6h8yn7xy4cqylnz6',
          kycOracle: 'component_tdx_2_1cpwg67h5j73twyp4kqgky3yw83jyet2x8k45c24xs0u83pagyeaxy8',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq02ctxth46j8wrj8mqufz8z3rl7ur0a5jy8zxuyvwsperjrqxap0h',
          cardForge: 'component_tdx_2_1czx95anflfkf6ehrr06r0swmjh8ws4022mped29wethd7v9p9fxehs',
          radgemForge: 'component_tdx_2_1cp38dv20s7mw2vnpz9yt2ul09x6eqg3ca0amsfy64053cx7jdkx8fp',
          radmorphForge: 'component_tdx_2_1cz60g5p22xjl3ayu42we9l65kqmth00hd3w2pnusvwf8s58grhuegq',
          imageOracle: 'component_tdx_2_1crexlvhyf7uxkdshg7he0zra5yup9qmw58rdv24k90fhgj0d0nzhxs',
          refinery: 'component_tdx_2_1crryrarpmmgdvf8avunz4kp4u0cqqa7r9dl5gtw0emrewk7skd2q7p',
          jettySwap: 'component_tdx_2_1czsvrwv0gmdf9fkffv0a0n0mx86r0jw9agz0knxde36yeur83ne0sg',
          lettySwap: 'component_tdx_2_1crcfm8dw90rxgva0ph8fwl356jntmc3dpnra9y2kn9eecc2e5cy0v9'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          jetty: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt'
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

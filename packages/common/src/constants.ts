import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress: 'resource_tdx_2_1t4dg783t7wqu74hjmpwgjw9s99wk78jx3w48ujv98ev6j0w0lcng7w',
          superAdminBadgeAddress: 'resource_tdx_2_1t5wz6dxwz7j9hhwjjlmvetvegfr7376r7wdf3t2shqmk4y8ue08322',
          heroBadgeAddress: 'resource_tdx_2_1n2s0zvvj66fe5k8kraznlxz4gscel56yqpnuf5t8hghlcy599qgqv0'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tkec6gy8wg7dx8unjt2h2msqpejm3w5v3f792hz0fyw00xejsnpmlp',
          clamAddress: 'resource_tdx_2_1t5h34gs5t5p7a0v9mfrh9gllrh4tngjx5du4xp8fxy42uq5vqznmnn',
          radgemAddress: 'resource_tdx_2_1ngxr4z49rd88y4w0m0yykpu9dmjym7hnzmtw8x4jjztesnz4ndktap',
          morphEnergyCardAddress: 'resource_tdx_2_1ntgg93qvkr4ddc0f0y4ul2dhwjvsa0auvh0h53kuqsgz60xlqahv9z',
          radmorphAddress: 'resource_tdx_2_1ngdwrn2l9zn00gf894cs9guv70ftkgx7s205mgxq6337gtrc60lmr7',
          ottercoinAddress: 'resource_tdx_2_1t54xnd74hdpn5z2qe0689dxlkxvm8uq9n6fmgktnk5sa0xuwegqnqn',
          giftBox: {
            Starter: 'resource_tdx_2_1t5ymaapakl6mrgu29l5tysqjysuamv4x6ann60nfrggdc6yy242xf3',
            Simple: 'resource_tdx_2_1th48fq9psvpfwz853ph8z2jndkjfk40m26s7gg3vguq88m3mwcp3m9',
            Fancy: 'resource_tdx_2_1tkg9rv6ar23fvxd5c5jzal7xe4c5e0sks00dmeyhvh9zza97aph2jq',
            Elite: 'resource_tdx_2_1th753uxyuezurvrnwnq0dn32uqev2wm3nfp9kync2q4jjehu4ptkyk'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        giftBoxOpenerV2Package: 'package_tdx_2_1phkg5nnkfkexyeh3gy2ecjmqk3qwessumct0dkqx754jc7h9gh6vyz',
        cardForgeV2Package: 'package_tdx_2_1pht0cy6lqua846a4lc9vrnk9esma3sq49pe2ljzgsxsf6knqtrvaem',
        radgemForgeV2Package: 'package_tdx_2_1p4f7t3q72x58x2pp43e9e4tjlppmvvva5puv9gyhl5lrl2kfq6ygl9',
        questRewardsV2Package: 'package_tdx_2_1pk9vllh9344duw98gulpylxlkakmmnwwflwzcsthrhp3u8gsj8x5zd',
        heroBadgeForgeV2Package: 'package_tdx_2_1p4n98z9j0jq06tdl90xvs28aatsg2v3gggnez69ssvdtkrxhh83tx3',
        components: {
          radmorphForge: 'component_tdx_2_1cq06nz2nuqn2at7j4ym72r9038p70dzzm36c8rrm7ut97jj99520dp',
          imageOracle: 'component_tdx_2_1cq5jsc7qfmedtwneq8ma7nxq0hrlvzzf2j4favey5xj8d8xdkh3rut',
          refinery: 'component_tdx_2_1cq75qlkf3xn45jtz5ulwlnsja0xzpvegr6j3gcwhpw5uggugdu5u77',
          giftBoxOpenerV2: 'component_tdx_2_1cq6cm8ks6un8rpslvr9ynztjnedd029apw2zwnjddjl04k76n0dzfj',
          cardForgeV2: 'component_tdx_2_1crkq3kef38d6xzcglangakjp9ex63r0u5wl7dq55ae2z7juv62w9vm',
          heroBadgeForgeV2: 'component_tdx_2_1cqtxjxewezsshcz3wh0nlwawymkjj3z8mfnt50s5wmsmw2p6q0fznv',
          radgemForgeV2: 'component_tdx_2_1cpz0944pgmvfxm4fttxg2erx3fd6qmsqmu4tajl03slz9zcrqff0f0',
          questRewardsV2: 'component_tdx_2_1cr63lynhegr0n0fcm3qun2449r35cvxhn3rqhd6prd7yr40ygaem7j',
          giftBoxOpener: 'component_tdx_2_1crsll3wjqke9detnpr8r0t0ls6m5kd57fu2jr5r20qfauuy575rh5p',
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
            accessController:
              'accesscontroller_tdx_2_1cw49w276vmh8alfm4p5cmacvut5eqtvrdd8ughzz9mtuctmdnvkpsz',
            address: 'account_tdx_2_1c8xa6ldh454mpyejjxh7a2h8h7364m0rl6dlddm0s5rqxjl6cqa5fg'
          },
          payer: {
            accessController:
              'accesscontroller_tdx_2_1cd3yk44vq7zvs88e2pf4ahcnxagv96ef7e93t4ltveqkk92l5888ls',
            address: 'account_tdx_2_1cy6c4jlz6q6ynnz5sadd25m85asgep2se6qdu39q5z0uxmpa3tjj0z'
          },
          system: {
            accessController:
              'accesscontroller_tdx_2_1cdf8we9acqysscdf36hc7ru50edt350gmff0t7gg9nr64dcrx0mt6x',
            address: 'account_tdx_2_1cyymcy9yq9estts935vtwhexpvcck8l4a0zseqd4l207ca7usghfep'
          },
          dAppDefinition: {
            accessController:
              'accesscontroller_tdx_2_1c0hl5pezljxvzpuej58038chka0tmjgwz44c7p2dph6xph0pr5fcz0',
            address: 'account_tdx_2_1cxjxv3qga0xhq4tp5k4v8pd34laq5ny54x60xt7xpm8uxazu9dlyqx'
          },
          jetty: {
            accessController:
              'accesscontroller_tdx_2_1cv2thjxmyy8n7zs3jfcq8sd2x2cgyhcyj820528h5nsv0xcluw2r47',
            address: 'account_tdx_2_1c9ypvf4v950yellpnkteuxk2lf8vj62dcqpgakt3wxeduck8t3ksl3'
          }
        },
        dapps: {
          jettySwap: {
            url: 'https://stokenet.jettyswap.io'
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
  QuestRewardDepositedV2: 'QuestRewardDepositedV2',
  QuestRewardClaimedV2: 'QuestRewardClaimedV2',
  JettySwap: 'JettySwap',
  GiftBoxesOpenedEvent: 'GiftBoxesOpenedEvent',
  DepositedElements: 'DepositedElements',
  RadGemsClaimed: 'RadGemsClaimed',
  RadMorphCreated: 'RadMorphCreated'
} as const

export type EventId = keyof typeof EventId

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
          'This Gift Box from the Full Stack Example will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems.',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/starter_boox.webp',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Boxes',
        description:
          'This simple Gift Box from the Full Stack Example contains a common or rare Morph Energy Card and a handful of Elements.',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/simple_boox.webp',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Boxes',
        description:
          'This fancy Gift Box from the Full Stack Example contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements.',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/fancy_boox.webp',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Boxes',
        description:
          'This truly elite Gift Box from the Full Stack Example, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements.',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/elite_boox.webp',
        tags: ['radquest']
      }
    }
  }
} as const

export const BusinessLogic = {
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

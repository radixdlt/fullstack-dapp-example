import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1t404mw839wth824c03kcs6cuh7x6d3d7fx3ahc8d8ssntwa3s2slqw',
          superAdminBadgeAddress:
            'resource_tdx_2_1t5zrak20s0hqs66gmsw3lr6uhtl2er3uatp9swxpvy5hd3fcs9japn',
          heroBadgeAddress: 'resource_tdx_2_1nfhpzt7hmg0y7n3x4vj06lwlle7n4kpyp7c305ujuppld3tsgquphj'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thrdpqgnevyvgs3z2s9mzyjgcjrhtt8edtr9j8yvdsdmauhq6jy8zq',
          clamAddress: 'resource_tdx_2_1tkazh3ll43eg8d3m38syn658rgsprnwvt0e96atemkh5lfga4qfhk5',
          radgemAddress: 'resource_tdx_2_1n2auuf3p7c2xkjn5zazr3d4uqag3crjd0g0dnrsvjs38xdlrlln0ht',
          morphEnergyCardAddress:
            'resource_tdx_2_1n2fcz3cvcv6h39pnyfmc82whjj9azgtzm3kpcxeyfr4hjhfch2tmty',
          radmorphAddress: 'resource_tdx_2_1ngsdv9wsp746p0rs6uc7d6mm0pay2xy2nm5mjfj2q7knu3ktqxg7eq',
          ottercoinAddress:
            'resource_tdx_2_1tkl79kvrmxjxgqgam76hwsc22djv0rycvr2fz09ymunqz7f80ghtah',
          giftBox: {
            Starter: 'resource_tdx_2_1thp4c095esw2vjldtw2quhfzhtz8935tr0avay3aap2wduj6wnx0ws',
            Simple: 'resource_tdx_2_1tkmaynxm6tc5p2x8makttfzx3zx4l4ulf0prpmpzdna74xq3thcufz',
            Fancy: 'resource_tdx_2_1tka6p3gyy8kudwaea2fce2x32kfu4kwzv2yf20xwke85h8jmwuqynl',
            Elite: 'resource_tdx_2_1t4u56ypnggv504rpy0x08ewejawwdmfvuxwjajlwtng9hu9hyknyuz'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        giftBoxOpenerV2Package:
          'package_tdx_2_1ph7497858nw4xm2asgvtw9x3qh70e30n5x2lv353g6955lsq7dsaat',
        cardForgeV2Package: 'package_tdx_2_1p5k8892gjpcxltfh0r5xke658r5vx5mmkacua5fknkmyk56zknd3zf',
        radgemForgeV2Package:
          'package_tdx_2_1phaqhvec7vt643k4x0zcw0e2sr4jhzet3znd7030m9k4s4syfucl2e',
        questRewardsV2Package:
          'package_tdx_2_1pk7q89nz9v6538428agqse9uwlppfjmh2u49fs64j3vga9vhmv0t03',
        heroBadgeForgeV2Package:
          'package_tdx_2_1p50lyuk5av2k4lmuyhv6j3zwxskjjv7zylxqwh5mclanshuesa2jzu',
        components: {
          radmorphForge: 'component_tdx_2_1czpe8x0wp39h0shlsp69ed3kjlvxa0747pv99g0gshzeachkxrqqvf',
          imageOracle: 'component_tdx_2_1cz0wtjrkxhz7r70hxm2y6js9ds2mv3q577r6p07u2t7vftflad66su',
          refinery: 'component_tdx_2_1crst5n76sgmltp6naeeladsd7xxkws592kx2rvn0pafpzjldcf2rk4',
          giftBoxOpenerV2:
            'component_tdx_2_1czhpzyl6tzqwg7j6v2qw2nuyx8ped4whvghplmtej36rnju4h5cv7z',
          cardForgeV2: 'component_tdx_2_1cps9et7sz0h0h8685x2j90t9ldhxatn0urwt7czh5elgrf7snskkl2',
          heroBadgeForgeV2:
            'component_tdx_2_1cp6hq3yph5huye84szyux3ff8cj0aldav436wj3sl4k04ljygqpkkl',
          radgemForgeV2: 'component_tdx_2_1cztk5tp592fqe49544e2qx3s3cygp8nhuthsfxwjk999c6q4lss3xu',
          questRewardsV2: 'component_tdx_2_1crgwq23j9ckz3yac3wvyqh38j3xyvkyv0mf3r77vjthjrdymjs70n3',
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
              'accesscontroller_tdx_2_1cwthv60dpc0z3px83acgutccglk6p705e8nnd0fjrmh6ywpvkzh43s',
            address: 'account_tdx_2_1c8m0npasy62pw0dqt6wqa6gn23q0kzvd6nrlyeh7ghnhed6w4u2v5c'
          },
          payer: {
            accessController:
              'accesscontroller_tdx_2_1cwdp0aqqp8v2zwe0l57897g7t9hxwy6umdpa36mazhcqr68mdmpm3y',
            address: 'account_tdx_2_1cx26d83yqe3tauyle9zmlddnup6th3zzshetuglha8qv7a85emq3cd'
          },
          system: {
            accessController:
              'accesscontroller_tdx_2_1cvqg029m2gxakdp7h4xdf85pv4p3lpjg0ulnqzlf8nw09s3gvgx03g',
            address: 'account_tdx_2_1cytl2mcsqxje6puzg40ckc8hjjyuwlqhztc790xdy7rxstwy6e974t'
          },
          dAppDefinition: {
            accessController:
              'accesscontroller_tdx_2_1cwczs399k9lgdz4eplkfzqpr2k0ztd6zlr0296xnlldqk485542ys8',
            address: 'account_tdx_2_1c9vra6ezxgldhdsn0h58xxvlwqpextf4zukkdz0r46w3swxvpzp3s2'
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
          'This Gift Box from the Full Stack Example will get you started with a common Morph Energy Card and enough Elements to create a couple of RadGems. Ask Jetty to open it!',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/starter_boox.jpg',
        tags: ['radquest']
      },
      Simple: {
        name: 'Simple Gift Boxes',
        description:
          'This simple Gift Box from the Full Stack Example contains a common or rare Morph Energy Card and a handful of Elements. Ask Jetty to open it!',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/simple_boox.jpg',
        tags: ['radquest']
      },
      Fancy: {
        name: 'Fancy Gift Boxes',
        description:
          'This fancy Gift Box from the Full Stack Example contains a common, rare, or sometimes even ultra-rare Morph Energy Card and a goodly quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/fancy_boox.jpg',
        tags: ['radquest']
      },
      Elite: {
        name: 'Elite Gift Boxes',
        description:
          'This truly elite Gift Box from the Full Stack Example, reserved for only the most committed, contains only a rare or ultra-rare Morph Energy Card and a substantial quantity of Elements. Ask Jetty to open it!',
        iconUrl: 'https://assets.radixdlt.com/icons/full-stack-example/elite_boox.jpg',
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

import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1thvdv7dz56jumkqvqtd25qxc5pkqr83508vknxzjsc7dw4va4skmwa',
          superAdminBadgeAddress:
            'resource_tdx_2_1t4a69652l9dmuyjt3r0v2efzvvqvk5umqnqpt6vnkdx32tywf5ezx8',
          heroBadgeAddress: 'resource_tdx_2_1ngq4aqspjy75l2rptmjjwa95ruhml93dj66xpjnharuwz8ujl0pul0'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1thlny2mzv9hy4wggy08gvewzjkh7awtedue7n24d0uawmz7snyal7h',
          clamAddress: 'resource_tdx_2_1t4a5evk28sq9a4k0p3pzejdk6yrugr7lfu6yz3xd0pxuwplz8lz6g2',
          radgemAddress: 'resource_tdx_2_1n2htjr5xmxcz90x5rpuz07jcjfhv6ngrclz57pyqfth5uxn6d7eql7',
          morphEnergyCardAddress:
            'resource_tdx_2_1n2ucg3rzuaruy54aqygjx7x78u7nlz7mq3sqn097nlnrmn59smhjmt',
          radmorphAddress: 'resource_tdx_2_1nfd2890e3624wg2pkpvyuzw3hwjmyu9ra38kfnza3l6em6zj67uafd',
          ottercoinAddress:
            'resource_tdx_2_1tkfl32n9d2sfhl9k9pupnry7rkel2n39234va69gfqz8a0rwzxr0s9',
          giftBox: {
            Starter: 'resource_tdx_2_1t5f39sn4v2s0xh2fvz2vl94nm8duxszqsf6gs5403jrsvruj09hapg',
            Simple: 'resource_tdx_2_1t5s9wg484xrpx2ujpe886cju4rqam3zwurguyumt7ewgehqgc92fuy',
            Fancy: 'resource_tdx_2_1thpc7k43p7fdqptnexd5pad3g0rvrztms8382fdjl03nn9sm8gvnqa',
            Elite: 'resource_tdx_2_1th2xcdfym3xj38mkkfvreqehfjutpudp0jjlmctykgzkyaylr722m5'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        giftBoxOpenerV2Package:
          'package_tdx_2_1p55xa3s0g5kzdrtc7asqtujxltxvph60u5xfavk80tuxq8r8h6jxjj',
        cardForgeV2Package: 'package_tdx_2_1ph4emge94ffj9euamj2s2zlkkmuuhu3cq3ujz4y6hpjv776jyhxahk',
        radgemForgeV2Package:
          'package_tdx_2_1pkuvvan4z7z2ad8rsphjk4vlvhz6w6c4tquekarzwt0v2unnlxs4nv',
        questRewardsV2Package:
          'package_tdx_2_1phv2w7pqjxmnv6h478z56fx4sgj5azrrxspzzu00k20cak6z39nda4',
        heroBadgeForgeV2Package:
          'package_tdx_2_1p4vm7fcf6rq79uvag54xus5dd6cg084l27ejwtl3dgs9plgzm3yjsm',
        components: {
          radmorphForge: 'component_tdx_2_1cr0svnmcwn08ujfyzl8aymrp83fw256quh7mxv4sp3phfrrk8y9rmq',
          imageOracle: 'component_tdx_2_1cpw8ewkwqzqe7a4n5zxew0dqw2c6mny4xdwnpkguq5uex3223e2tev',
          refinery: 'component_tdx_2_1cquaxl7awe9at6ut8cv2cy6te9vccknkg9869xya2c2dk5769ly7xg',
          giftBoxOpenerV2:
            'component_tdx_2_1crxuesx84ltxja0vwu5kumfr3pumva4jzljq9hn0mvhwffeu427q6q',
          cardForgeV2: 'component_tdx_2_1crjfmra63aydmx3d39v7xl5ga5dd2ppqdkrjvft4cu5y48fpzc9qml',
          heroBadgeForgeV2:
            'component_tdx_2_1cq0akwx26g2xyypntyv9vw2sf7uh5lx7dj345q3qpr090cgr4ufxpd',
          radgemForgeV2: 'component_tdx_2_1cpsswtr7rm0tt0wxr4pg95dgvaz8aw3saxerlmylgj30zzyyxqzag9',
          questRewardsV2: 'component_tdx_2_1cr5w70vaxfhwxm9qujfapf720szvwkgt2322fqrgmqhy9v9ygx3hm6',
          radgemRecordsV2KeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzz7h3mlkca0qqm86am2fcagymng4433xmwhpj20czvhuwgvq9shqp',
          giftBoxOpener: 'component_tdx_2_1crsll3wjqke9detnpr8r0t0ls6m5kd57fu2jr5r20qfauuy575rh5p',
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
            accessController:
              'accesscontroller_tdx_2_1cdnh0jlfgmj55sc4gqeldnpudu6ww0ja6zall4t7wd62heq7q9aehw',
            address: 'account_tdx_2_1cx07fxd2nfwuqk7j7jk3vmnwp36mamsddnaxrlp2l258kuknuz470l'
          },
          payer: {
            accessController:
              'accesscontroller_tdx_2_1cv5kfmxqm0jclkyvc3lrf75g7f9tha67j9er3zs4pj68dd6nnt5awc',
            address: 'account_tdx_2_1cxwe08cskeptehhcmy8rh7k4fjdzcaa5m2u2sfph5mgw5ms6ekdks6'
          },
          system: {
            accessController:
              'accesscontroller_tdx_2_1cvcgdf49wmjayxe7pm3g9w8fvqsx02xmaujxdrqzdkrt40ah94chwc',
            address: 'account_tdx_2_1cxr8fmuwlf7rjt6v3ql8dtncx7p97wlj068ewq4d94aw6uct5t49jk'
          },
          dAppDefinition: {
            accessController:
              'accesscontroller_tdx_2_1cv3dhg0a42pemqcru74gft49gk4ykykxk9s2cqtfp7l5r5dkfjulzx',
            address: 'account_tdx_2_1c9fl06a983404cfyru92mfmdh6t789lkmnmy3rth9q6lmelvd7tyy7'
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

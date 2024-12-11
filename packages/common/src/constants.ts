import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress: 'resource_tdx_2_1tkw3emaltdv0y09lellucpd2yu4t9t339fjdvp3vwc9spzyef4rjvj',
          superAdminBadgeAddress: 'resource_tdx_2_1thvmkcgmpxhfk25vjtjnyra2rrnezgmulwe7j0j3c4t2q5ek45ejts',
          heroBadgeAddress: 'resource_tdx_2_1nt2f6efls57n8rsw3us93gmhfuxc6rmujrx02j69udtazmc2vkse8k',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tkvfmmkktuqfngyrkc2w58jqxrmd0hyzsnyam2tsygfh2epg2dsmfx',
          clamAddress: 'resource_tdx_2_1t44eatxmxe0j8l6lv20qrc9pju8j5khrys76wqylt7qfape3pha9mw',
          radgemAddress: 'resource_tdx_2_1ngscwaw0z8yqmvsewdvddt6vzvdtyp6nvg0tjk364jn2a02k7vty9p',
          morphEnergyCardAddress: 'resource_tdx_2_1nfm64uncdcu98arr3upttu2yrk4pe8atcexvrhtlen3lh6jgenku7r',
          radmorphAddress: 'resource_tdx_2_1ntx6z8ue6rdg6c7cd9358n96rswss93z0zhzh9hdkm8wpch4jm6khc',
          ottercoinAddress: 'resource_tdx_2_1t57d6453gfkf8snleskf7davqfrsjezz9a2f3fjtusctjsl07cqxrh',
          giftBox: {
            Starter: 'resource_tdx_2_1t560e6ns0thylhm486ty0jtxnkwvhk4ru4zzgsuqj70d6qzldtm6cj',
            Simple: 'resource_tdx_2_1t42qxs80tvytd2692ycn8zgast2amkru2k0nfupc504jxjz7h0szfw',
            Fancy: 'resource_tdx_2_1thq4gueenuhqk9yklsql2kr82e6tqzr3utqezhraujpnaquheju3tj',
            Elite: 'resource_tdx_2_1tka03usps22edwkpy5uq0vc7ae4fsslpl2vzgqwl6u3gaw5d6lphnj'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        clamDexPackage: 'package_tdx_2_1pk54w09fwqv9resal68ee43y2gzjm3m0kfw0sjhnhrpw5w8kzxgvc6',
        giftBoxOpenerV2Package: 'package_tdx_2_1p45ltemu9x8uhasextgdmg7dmfau2zqtjnpnhj5dwssrs2d3392yrq',
        cardForgeV2Package: 'package_tdx_2_1p5x8hwamtgjgz2vmygcup8q7q27h7xhyqjjstku9tm56mkn2qp8v5f',
        radgemForgeV2Package: 'package_tdx_2_1p570z22ey2ph7l4xz3t2tmgu84nfznh4mz72zannz6k4474h7p782e',
        questRewardsV2Package: 'package_tdx_2_1pkkm7hma6u9cudrxjezzdlasw3u4suf5c3ta9z84rrcvtu7w538kyx',
        heroBadgeForgeV2Package: 'package_tdx_2_1p4ezswnyfz6z9n8m7ysjm2uqvu5fg2aw680hl7pq27zggjuv0hg5ha',
        ticketMachinePackage:
          'package_tdx_2_1pkmkll2d63ugxrd5uph0ddlm0gjrgvlqmdyctr82aaneft66tehljm',
        components: {
          heroBadgeForge: 'component_tdx_2_1czggp0fz9pcarmhp8uxpy9qr8ysz46qkpr49t3jdrn8zzanujj8fpy',
          ticketMachine: 'component_tdx_2_1cr6mvq384sjshjwxgjrf20l25wcq4hqfhuezujh7l88w5ulf6gy9pf',
          kycOracle: 'component_tdx_2_1cqgu87tk0sx6ldn7x0heev0vgc6jq4uu0tahkfumfpgmw7acxtgqd3',
          questRewards: 'component_tdx_2_1czukjx0y294tgzz2w236je8sv8pr4mrz3p566rm6vlq4nfr2w2punu',
          giftBoxOpener: 'component_tdx_2_1crsll3wjqke9detnpr8r0t0ls6m5kd57fu2jr5r20qfauuy575rh5p',
          cardForge: 'component_tdx_2_1cp2r0wrszxf0qj9hqykm6nv6avzweqazxp2yu43zemp5q0prpl0rfw',
          radgemForge: 'component_tdx_2_1cp64ncg6ghglxup5fmyxlwzasa7hcrhxwuxptwxuuja7cuhg9fyhzq',
          radmorphForge: 'component_tdx_2_1cz0zyteg9h22gfe97addw45ghkw9a6w2n0e695ev8u7n9553r8cc5x',
          imageOracle: 'component_tdx_2_1cpp43udgtjy355m2pr4egysky03k7lty6uass4564ppse56ay060mw',
          refinery: 'component_tdx_2_1cp9wazvzt3sxcun30y72sfhg34k3g826myht4djpm8nl4agvuj7wm8',
          giftBoxOpenerV2: 'component_tdx_2_1cp64ua7jnave0jyax2ww8pvpgyyn3je2xn9n8qz502hdcpjlwy8t3z',
          cardForgeV2: 'component_tdx_2_1cp3j6zldds84r70kd3y98zdc2wznnddw9e2djyf7c80d0vhnykm2d0',
          heroBadgeForgeV2: 'component_tdx_2_1crg7w54k2zvy8shjk6735hvacaplpgeyed44vhv90a8w25nhltkmwm',
          radgemForgeV2: 'component_tdx_2_1czjdmqvtxtsmrmnrnwn24lcqa5trarfvzgwhmcn578trm7tc5z56j4',
          questRewardsV2: 'component_tdx_2_1cz70y26atyyhh9e4c338l9kwwtggjwj3j55zm05mhrnlf7vqlgj3xj',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq4cuyae3uuw9ss06an9cdhd577p7gjnkfqm7mwqvsdyecqe4syxql',
          radgemRecordsKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kqdlru04d9gfvjzzkhmmf2lptxfdenw38kn5kz5nr5rdjh9m0yek70',
          radgemRecordsV2KeyValueStore:
            'internal_keyvaluestore_tdx_2_1kqf8du0f0eujg8qjq78wg76q25w9544v9elmryw8c3wl4ef4etmym8',
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
            address: 'account_tdx_2_1c8xa6ldh454mpyejjxh7a2h8h7364m0rl6dlddm0s5rqxjl6cqa5fg',
            accessController:
              'accesscontroller_tdx_2_1cw49w276vmh8alfm4p5cmacvut5eqtvrdd8ughzz9mtuctmdnvkpsz'
          },
          dAppDefinition: {
            address: 'account_tdx_2_1cxjxv3qga0xhq4tp5k4v8pd34laq5ny54x60xt7xpm8uxazu9dlyqx',
            accessController:
              'accesscontroller_tdx_2_1c0hl5pezljxvzpuej58038chka0tmjgwz44c7p2dph6xph0pr5fcz0'
          },
          payer: {
            address: 'account_tdx_2_1cy6c4jlz6q6ynnz5sadd25m85asgep2se6qdu39q5z0uxmpa3tjj0z',
            accessController:
              'accesscontroller_tdx_2_1cd3yk44vq7zvs88e2pf4ahcnxagv96ef7e93t4ltveqkk92l5888ls'
          },
          system: {
            address: 'account_tdx_2_1cyymcy9yq9estts935vtwhexpvcck8l4a0zseqd4l207ca7usghfep',
            accessController:
              'accesscontroller_tdx_2_1cdf8we9acqysscdf36hc7ru50edt350gmff0t7gg9nr64dcrx0mt6x'
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
  QuestRewardDeposited: 'QuestRewardDeposited',
  QuestRewardDepositedV2: 'QuestRewardDepositedV2',
  QuestRewardClaimed: 'QuestRewardClaimed',
  QuestRewardClaimedV2: 'QuestRewardClaimedV2',
  JettySwap: 'JettySwap',
  GiftBoxesOpenedEvent: 'GiftBoxesOpenedEvent',
  DepositedElements: 'DepositedElements',
  RadGemsClaimed: 'RadGemsClaimed',
  RadMorphCreated: 'RadMorphCreated',
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

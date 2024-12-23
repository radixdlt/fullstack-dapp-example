import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = typeof Addresses

export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress: 'resource_tdx_2_1t57v2v93pm99xdhr2wp5e05gvgej4pkf5juxaczn7wha50kett728m',
          superAdminBadgeAddress: 'resource_tdx_2_1thnahy85l9cdg9k68knrt30ty5gq0yp72aavahv42mddgcucdp3ay5',
          heroBadgeAddress: 'resource_tdx_2_1n2mx2pcmczspq7nt6vvghx07q9ku40gkdwy5snhs4yycjaxel24ssp'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t4jn4as5cdu03dywdgfl3cuqug4zc8j33pv0065fxqpmly7uw5hryl',
          clamAddress: 'resource_tdx_2_1thywg56l46ah4x5n0thf7sclrye4mlvqa4v5824kpyh0uucsa7e5gd',
          radgemAddress: 'resource_tdx_2_1ntpcy27dknv4egj72cg52kacpzum598ndv3rmhphsnnj6ssdvwgd84',
          morphEnergyCardAddress: 'resource_tdx_2_1ngrvdgq949d7ll0aewptrsf2h399rmqnhu8hlkjxyanp0fe3ah9zhh',
          radmorphAddress: 'resource_tdx_2_1n29m5nsz5vafczus8k2l04x6tprag2yl8xhcgmwuu8xe474uapvw8e',
          ottercoinAddress: 'resource_tdx_2_1thj7khegf8g0yfw29r20zmy40r9eq6xwyf0j29csqr2yxxgayq97km',
          giftBox: {
            Starter: 'resource_tdx_2_1tkr3ph7lum0rca937kdkf57a6ew7gwgt070agcvgf6u8fua788ejl4',
            Simple: 'resource_tdx_2_1t4sfhgk42n6n2244qg7lqu7hs8v65xeeanpqd0wfk7c3m3ss43k6sk',
            Fancy: 'resource_tdx_2_1thwx6tny69ezhgl0rv47gqhpze8g3n79gjf2g45nt9v2j2jygmckrc',
            Elite: 'resource_tdx_2_1tklc2ecqtt9xs2q6tx6cqe0vjjzyj29reh93k0jmrfan2g902nvcex'
          }
        },
        radQuestPackage: 'package_tdx_2_1pkwl9w5yseh5dfj7y95drxxd8j60qcd0v27z5w7uhftj436rsqtu9g',
        giftBoxOpenerV2Package: 'package_tdx_2_1pktt6z9znefr4ypfu9ezxawh94qry5cajdjmawexm38yq2jzlxvuv6',
        cardForgeV2Package: 'package_tdx_2_1p44td5s2ukt2njfpnxenuwczmxq2ap68yy0a8sl46z2fv04kwt0jxv',
        radgemForgeV2Package: 'package_tdx_2_1p4x4fgdk0a65h9adwa088xhm5u7rjmtffpqn7j6zp8yl39a0n28ydn',
        questRewardsV2Package: 'package_tdx_2_1p5smuppqk0rew4n7mjw3qsl0gwxljl9x22uj2vqxfl88f828x7ngta',
        heroBadgeForgeV2Package: 'package_tdx_2_1p58u9uvwlzs9wrfrfa8wxm9cf7vmx96dwmgacvy8kse8ct3es0pnx8',
        components: {
          radmorphForge: 'component_tdx_2_1cpww97j64cwugupxd2ktpdgvxw60m4cx9a0vwnp2ke7dchvqmps73y',
          imageOracle: 'component_tdx_2_1cpkwy70kcevrg0qcrcyupghun7qpjyaejeu55yam0jcluzl6ew8ykm',
          refinery: 'component_tdx_2_1cp98swlxgs75mt5cudujwp4tnh8u4aq8xm5lxlpj0ghy06mf2hwwgy',
          giftBoxOpenerV2: 'component_tdx_2_1cqyq2juf9v5xnndtgkq27d4s94r5xwjn78429022kf0rnct2t99ssl',
          cardForgeV2: 'component_tdx_2_1cq6u0kmerdgsn96cradvzeawfhdsurjne4ytp6hp5flge5dkaez6c5',
          heroBadgeForgeV2: 'component_tdx_2_1cpqr458tl7wu4kwahua6jj0yfnch9tlskchnkkvu0dcu2gnagfmku9',
          radgemForgeV2: 'component_tdx_2_1cpur7dt3rh84t6fgpejl2kd88a0v82peln2s7p6rr5du9lpww27md7',
          questRewardsV2: 'component_tdx_2_1cph8wd3r55z2kuks2lualtn77s0u5zzqway2ye8jv7vmjq5qtrfy52',
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

import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'

export type Addresses = ReturnType<typeof Addresses>
export const Addresses = (networkId: number) => {
  const networkConfig = RadixNetworkConfigById[networkId]

  return (
    {
      Stokenet: {
        badges: {
          adminBadgeAddress:
            'resource_tdx_2_1tkewy5e4cgwr6qztyum8zch85fgccfjpujkp3jx45ag9qzwev3ud49',
          superAdminBadgeAddress:
            'resource_tdx_2_1thwucrt37ajfknluwmj9s483qxz7cqcwlvf9xaun9wx5yxn3r8zh7v',
          heroBadgeAddress:
            'resource_tdx_2_1nt72qwswkjkaayfwgyy0d2un8wvpjlq2dg5lq54382wlmf6yly8vz5',
          kycBadgeAddress: 'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan',
          instapassBadgeAddress:
            'resource_tdx_2_1n2gxmr3m95mr2amvdtfn5slgeta5dsz9zwg9w7wc7vvxwtqraq6pan'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
          clamAddress: 'resource_tdx_2_1t5m454mwsa54u8hmlzfxl474vsynf8nm0htzhw6kkh7ksr0xkcxdrc',
          radgemAddress: 'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
          morphEnergyCardAddress:
            'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
          radmorphAddress: 'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
          ottercoinAddress:
            'resource_tdx_2_1t5t6t93ngy442dr2aarqvsrk6vdqxs70m6yeepfudhnfzxpfzxsvsd',
          giftBox: {
            Starter: 'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn',
            Simple: 'resource_tdx_2_1th69mu7mhq5rse8k5p48du3kw5gzf0nwu2tjry3ttqpz240c0sjdf5',
            Fancy: 'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
            Elite: 'resource_tdx_2_1t4esvjqcjr8l4fpuurg0un9lesmfa8mdv85dc34qmxg7xhpwwntcx6'
          }
        },
        radQuestPackage: 'package_tdx_2_1phu0zmcx0s92ha5rgnjruysq58kr48qpf8cqgk3y2rmxhhke7jgtqw',
        clamDexPackage: 'package_tdx_2_1pk54w09fwqv9resal68ee43y2gzjm3m0kfw0sjhnhrpw5w8kzxgvc6',
        giftBoxOpenerV2Package:
          'package_tdx_2_1p55l3syf2lukjyy6srelrq6mpd5vf3u7lqy77wtnp6n2zvku8xf3d6',
        cardForgeV2Package: 'package_tdx_2_1phdyvdpep6vyu4dujpxj6hdpss4rklcqg2xzmtmeyqdxvj5mavqmzu',
        radgemForgeV2Package:
          'package_tdx_2_1p4p33jnqt5hx9p7qp38hev3extfqpnxjxcnuw9q6pz653t8jfzrllf',
        components: {
          heroBadgeForge: 'component_tdx_2_1czggp0fz9pcarmhp8uxpy9qr8ysz46qkpr49t3jdrn8zzanujj8fpy',
          kycOracle: 'component_tdx_2_1cqgu87tk0sx6ldn7x0heev0vgc6jq4uu0tahkfumfpgmw7acxtgqd3',
          questRewards: 'component_tdx_2_1czukjx0y294tgzz2w236je8sv8pr4mrz3p566rm6vlq4nfr2w2punu',
          giftBoxOpener: 'component_tdx_2_1crsll3wjqke9detnpr8r0t0ls6m5kd57fu2jr5r20qfauuy575rh5p',
          cardForge: 'component_tdx_2_1cp2r0wrszxf0qj9hqykm6nv6avzweqazxp2yu43zemp5q0prpl0rfw',
          radgemForge: 'component_tdx_2_1cp64ncg6ghglxup5fmyxlwzasa7hcrhxwuxptwxuuja7cuhg9fyhzq',
          radmorphForge: 'component_tdx_2_1cqtjvvpwhjvdzwc6gp43hz5q5g0v2ulqvmgp52cx0gz2nnrjez2nch',
          imageOracle: 'component_tdx_2_1cqc8z3t3jtn9ryrztfw59klnxwt2lfwmwvfc7r485uq7qulwxq7pkd',
          refinery: 'component_tdx_2_1cp4dw84qxcncwncg5mkkht2cqg2906kpy2wx76xa8720pxy2js0ggh',
          giftBoxOpenerV2:
            'component_tdx_2_1czvfn7wtgensyfwjn729n3mkxl83e8848uw50aar796us6pcd333mw',
          cardForgeV2: 'component_tdx_2_1cqd53j58jzw7jm4wz203hna90hfeu8s5zrdax0pgs6kfyv6lshj0m7',
          radgemForgeV2: 'component_tdx_2_1cr9sd3lfaxw679879lnp0zs08de4leakfqgxdvmjnve8zpcgh9dtlm',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kq4cuyae3uuw9ss06an9cdhd577p7gjnkfqm7mwqvsdyecqe4syxql',
          radgemRecordsKeyValueStore:
            'internal_keyvaluestore_tdx_2_1kqdlru04d9gfvjzzkhmmf2lptxfdenw38kn5kz5nr5rdjh9m0yek70',
          radgemRecordsV2KeyValueStore:
            'internal_keyvaluestore_tdx_2_1kzr894n384n7arfrnc4vejxfdqawu5e83rcuph6cjjqeswlmr80gsu',
          giftBoxRecordsKeyValueStore:
            'internal_keyvaluestore_tdx_2_1krepp99ahmrzxe5qrsyhzy6e7cyvqwhg4dvtqt3pdjq94yd4xwaynq',
          mayaRouter: 'component_tdx_2_mock_maya_router_address',
          jettySwap: 'component_tdx_2_1czu6r9zpgsuylret7jfswwlzfgxp39spvd6wh72waqy30sd55gwz4y',
          jettySwapPriceOracle:
            'component_tdx_2_1cqcsfhgk8k8kuknmk7cmvkfu2whrz0ysd3swxggdu3lreu3lh7hyhq',
          lettySwap: 'component_tdx_2_1crzgytxmmpee8n79ehlhkgvqzza6utcqv0e3jh9fatqwjc4r7kwm4s',
          lettySwapPriceOracle:
            'component_tdx_2_1cqwgc8ppm4ahxpdc4lepm77vz7vwzrp30hz0ukr0mfu5r07w9jydtf'
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
            url: 'https://jettyswap-dev.rdx-works-main.extratools.works'
          },
          lettySwap: {
            url: 'https://lettyswap-dev.rdx-works-main.extratools.works'
          },
          radquest: {
            url: 'https://radquest-dev.rdx-works-main.extratools.works'
          }
        }
      },
      Mainnet: {
        badges: {
          adminBadgeAddress: 'resource_rdx1t5fces2e0g7wywymygxnn3c642efwr35hwcm5gqtlsdmvewjpgd3f9',
          superAdminBadgeAddress:
            'resource_rdx1tkpeanv6tr8pyke0hccz6llrml0f2y7vl4qfr25j6zecmtynns5rec',
          heroBadgeAddress: 'resource_rdx1n2mvky7na57d832lypd9xy5ftxt7lynu3flyn084gfncayshmmdwga',
          kycBadgeAddress: 'resource_rdx1n2ymmpx7xtjl9ttk9ltzx5c642neyknkajcsmxc5sdnm6h300atx5m',
          instapassBadgeAddress:
            'resource_rdx1n2ymmpx7xtjl9ttk9ltzx5c642neyknkajcsmxc5sdnm6h300atx5m'
        },
        resources: {
          elementAddress: 'resource_rdx1t46p7mnc9kg4mq4tk2sdtp5f0gp5mscpjruethv3xxtx9z6xz23u56',
          clamAddress: 'resource_rdx1t5cg8avk6x2qvnmc6e45mw3eadax90cfy862vp7m7qvcv70459lh3s',
          radgemAddress: 'resource_rdx1ntr6s37qnrjw8eu04l2ejxfg6y067qzs87zde6ljfp9u63tj87jmxu',
          morphEnergyCardAddress:
            'resource_rdx1nfe53zgumd2vak2f7gv0jjn6erlnghtahequkt8n69cdymwj38kz90',
          radmorphAddress: 'resource_rdx1nt2q2rks2xgus6etcpeq4c8ysuj0l5pwhs9r3cxw6qtly5kxqddp2e',
          ottercoinAddress: 'resource_rdx1t5mcwtclmntvapyfnw4xcqwxzgtnfcywk55xm9dp6cwh8atzfnyt36',
          giftBox: {
            Starter: 'resource_rdx1tk3ggfq3mysdqcj5cmeuw7p4fhclnkrlaard6nudjkvn373503km2m',
            Simple: 'resource_rdx1t5kgrlsxumc5waamn8sdh8pw77q8mn2f7nlwclgdjmaw6xw39zla8a',
            Fancy: 'resource_rdx1thz0j3dl0yrhf2tv5q9j6aks9hqkz4p77n59zlucul3rughktyj5ml',
            Elite: 'resource_rdx1t4nyqfs9vkf80ctrn3h0rfq6dptjwcm7zygecxn3u9djrurmv25gvf'
          }
        },
        radQuestPackage: 'package_rdx1p4l4fcfctjfgj9avqzrunn42rfk84kfktrtz3wypf3a37jfwlprdxn',
        clamDexPackage: 'package_rdx1p47qnlxgwnrggs38ea7n35y0zkyr2c65ftre6vlafw096u7gygq0y6',
        giftBoxOpenerV2Package: '',
        cardForgeV2Package: '',
        radgemForgeV2Package: 'package_rdx1p4gtpzf4t6jsa56us38mt0uazt8ydu93t3tmhea7whkxf8zqswsnv7',
        components: {
          heroBadgeForge: 'component_rdx1cra2j3w7cv9zkrv4jehjz0qn3xffxdkstucxar4xy9kyu0tpxsvya6',
          kycOracle: 'component_rdx1cr89pe8pz7c3fhuxf4tpw309cmuqtwg6tw2pkjl574hg3slp9v4gt9',
          questRewards: 'component_rdx1czaulwngn258tkk5xpvhgsyrfx5e4f7eu4pafhxe0hpkvafndtmwnk',
          giftBoxOpener: 'component_rdx1cr3vkd0qx0dxqcd0epy3pdxk34ej09ryzfv30e3n5w3wv8r70nn797',
          cardForge: 'component_rdx1cqdh7qd2wj9rpsh3yl2urytdlp7as03uzy4hmr8a4xxwaz7hkwvqxe',
          radgemForge: 'component_rdx1cr9eml30wd28fzx4z3uuh7lhyeq6na59vcltv32j3v03m8acrsc0tp',
          radmorphForge: 'component_rdx1cz36kgpr72804j265rvz0lkgf9en2wneq2gqyk925g6umgv3dt57q7',
          imageOracle: 'component_rdx1cp6z7vhz3sg53qwz8y462kupm89j230hxn35pkpetdfjkhyc6dkhr9',
          refinery: 'component_rdx1crh0h7kc9e9s0607exe864uszpu5cpptjn2a605szneswhzw6nawzd',
          giftBoxOpenerV2: '',
          cardForgeV2: '',
          radgemForgeV2: 'component_rdx1czv5pypn3u44yut3mqt5fxqnwphjec56j9rhn7mp74nl0tj2xytf8y',
          kycOracleKeyValueStore:
            'internal_keyvaluestore_rdx1kry2g9s07tm26js7e9uy8rztpg5htfd3auandaqgu7nvc6psvnasge',
          radgemRecordsKeyValueStore:
            'internal_keyvaluestore_rdx1kqt4uy6tf9pat5zgnta873mwhu8xg3ezhhfvvns7e990qx3e3jvyr8',
          radgemRecordsV2KeyValueStore:
            'internal_keyvaluestore_rdx1krzqx8jyqr4fk6qj9sflr9merf5xsvys9s3mur9ggwsma7pktaemts',
          giftBoxRecordsKeyValueStore:
            'internal_keyvaluestore_rdx1kqxjftv92utms3l3rh9z6crqe7kavj9sdelddd75dsdlxjffqfluzg',
          mayaRouter: '',
          jettySwap: 'component_rdx1cp3he5qrfq92y9j7cpjpfm6uqvurvgyradtgltcn2qaq6pygu4lmp6',
          jettySwapPriceOracle:
            'component_rdx1czdm8csjmrcnv9d4fuhw3g5c2yzhga59xf3464nfy4egmedv2srlnh',
          lettySwap: 'component_rdx1czzpnfsc62dpy7zjw4kxznuepv3ya6u7urpptlgamwrg2w4t993uvg',
          lettySwapPriceOracle:
            'component_rdx1cqdqpvrsrgx84ay0g82ek9jlmkmqkws4k2sdugwg69y6dy3nrg3ku6'
        },
        xrd: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
        accounts: {
          owner: {
            address: 'account_rdx12y0v97zppwn8cx5fks8ap2hk6jshpjjx8mwzwn9tvymg2pyx0mv9nk',
            accessController:
              'accesscontroller_rdx1cwyyg3rlxrdpyzus2adrq9lnfexf8wgs4p6r8ugsgmdnu0g4utjqq4'
          },
          dAppDefinition: {
            address: 'account_rdx12xkqkcxqzkuc0xnsme9etvttmwfz8aqnhpwc0ygv8tnnpdw2v5cfzd',
            accessController:
              'accesscontroller_rdx1c0dpryhtc9s7a5qymj2zrun6pj644r66n8at2r8q6k5ztwkr7s84hm'
          },
          payer: {
            address: 'account_rdx12yvpng9r5u3ggqqfwva0u6vya3hjrd6jantdq72p0jm6qarg8lld2f',
            accessController:
              'accesscontroller_rdx1cdwhkag6gv2m4rfwdm57w44sffa8eufd0wvvu6d3atfcfv64y3t2qn'
          },
          system: {
            address: 'account_rdx1287ttlwdj70l4qhe6hc6gcad5ltxahf0vrydqnhj7dvc8kyqp52x9t',
            accessController:
              'accesscontroller_rdx1c0t7hcmt90htanr37s4vy0g6uqc0wgdvsq80n6mu5pjv2ecqgxmnhx'
          },
          jetty: {
            address: 'account_rdx1cyeaxqkuaqcgj6fnq6eq9av6pxzsud38xhl4ar0hygep74r48mluht',
            accessController:
              'accesscontroller_rdx1cvmgr0rd8xqp28gg9sdx0klu20028gnuzp693yewazucrfy8kwqpkr'
          },
          jettySwapDappDefinition: {
            address: 'account_rdx1c82zl0gkcjscuzneg6nxttpw2qtechdn3zvakn50c5g5gtlvas37rw',
            accessController:
              'accesscontroller_rdx1cwaamc2szup7rz3elqmz0f7hsezr9uhnpvjunxva5q2px09jd4cfmx'
          },
          lettySwapDappDefinition: {
            address: 'account_rdx1cx8gjj0gaa6vge4cxr47gkd2dwp2gyxtnsmp0zssg3dp044qe5zhzn',
            accessController:
              'accesscontroller_rdx1cdtp8nst2lx2jvpkz07kk4dchtt3jfmnpaxdv5h802725kq8u9mmwg'
          }
        },
        dapps: {
          instapass: {
            url: 'https://lite.instapass.io/RadQuest/'
          },
          jettySwap: {
            url: 'https://jettyswap.io'
          },
          lettySwap: {
            url: 'https://lettyswap.io'
          },
          radquest: {
            url: 'https://radquest.io'
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
  referralRewardXrdAmount: 5, // amount of XRD to reward referrer when referee completes basic quests
  maxReferrals: 5
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
  GiftBoxDeposited: 'GiftBoxDeposited',
  GiftBoxesOpenedEvent: 'GiftBoxesOpenedEvent',
  DepositedElements: 'DepositedElements'
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

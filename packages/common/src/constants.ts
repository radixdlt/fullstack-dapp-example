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
          userBadgeAddress: 'resource_tdx_2_1nfqughuxfm6hetnkc7xg0qtnx8a7agl80pz9srxy4dvhz8ckvscs88'
        },
        resources: {
          elementAddress: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
          clamAddress: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
          morphEnergyCards:
            'resource_tdx_2_1ngwfwe363l7rag3l2n8pcqjh3828nden6tdsrlww640ggnkv0hvn32',
          radgemAddress: 'resource_tdx_2_1ngsqqj66xx6u7athxynr0n95phj3ljuvje2hkzfvd90ua8569csaje',
          radmorphAddress: 'resource_tdx_2_1nghxdspyat6ef69w8rcg5xk0sjeluk664yf485g9csmqzufhkytxlx'
        },
        package: 'package_tdx_2_1p4h36jqvued4u0ll76pnpqw8f2hmvjllk408j64wpkl8cj6kr70xxc',
        clamDexPackage: 'package_tdx_2_1phe5l60hvy0raypraluxp622gn3y7dckftyhrjxl68g8hvzegdr7j8',
        components: {
          questRewards: 'component_tdx_2_1crtfv9n6dqj5t65nj075lcj8ap9vegyh0jlfucckkfp9xzpzcllpwd',
          kycOracle: 'component_tdx_2_1cptt60g4zrw2hhmwmfllxzu26wlw366vtdu5rjslpaduqtlu3szunt',
          cardForge: 'component_tdx_2_1cq69jlptu07nncvtryfw5jmzzeklmqkr5u3lx25d5nwry044m7hxrs',
          radgemForge: 'component_tdx_2_1cp92vr8fpgmq3r5rvd4mqpns67z75ulq0h083makfz5tqhm5x34ukd',
          radmorphForge: 'component_tdx_2_1czv8hf2k4m5aka3ar847uqpyqy5w9q9kjnr354zphmzrrqps3lq30d',
          imageOracle: 'component_tdx_2_1cr43qevrkluk75gjcyglklcaek7uy0rp2ymqk0ufyrp6393c53wlfw',
          refinery: 'component_tdx_2_1crth8cjpycqk8xhtcuzcjeh9eud2jdhx0khuh3aunhtxp4xluvnym5',
          jettySwap: 'component_tdx_2_1crn03yqnjzvhrhlw4ea36z8s4vfcgyqtwfgw4yujp9cydvatjsz6xq',
          lettySwap: 'component_tdx_2_1cpy8z5jzy0a9ps39nxnctcfrgc3eurpyrl8w36ecyy4celc5a25ywm'
        },
        xrd: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
        accounts: {
          jetty: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt'
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

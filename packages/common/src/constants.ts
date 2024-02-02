import { networkConfig } from './gateway'

export const Addresses = (
  {
    Stokenet: {
      badges: {
        adminBadgeAddress: 'resource_tdx_2_1t5nfy52latlarrukrdhyl7p9nevvt0z496e9neg3zj7pr39uasfzqu',
        superAdminBadgeAddress:
          'resource_tdx_2_1t4ntu44ndy3w9pw4z6wmlaa8cdu5tccda2twryz4av5w4693z37kyn',
        userBadgeAddress: 'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
      }
    }
  } as const
)[networkConfig.networkName]!

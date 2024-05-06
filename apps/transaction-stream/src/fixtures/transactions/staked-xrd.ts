// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 85721941,
    epoch: 58038,
    round: 471,
    round_timestamp: '2024-05-02T13:17:43.046Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1sjffn2y55hl3xpgmmwu3l0lz5zgwc38f4n8z9enlzhzmdugkxj9sw6ryct',
    intent_hash: 'txid_tdx_2_15j8p89hft0qzhspal4nwqp2c9h3xc904rz9tfez70epghhazjdes6k4tms',
    fee_paid: '0.37226802363',
    confirmed_at: '2024-05-02T13:17:43.046Z',
    receipt: {
      status: 'CommittedSuccess',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqnkhlszlddcx3hnlff00wca6yeuzm5d4vnl52ck7v6rxgxmh70h39'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.491497738562', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
          }
        },
        {
          name: 'WithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqnkhlszlddcx3hnlff00wca6yeuzm5d4vnl52ck7v6rxgxmh70h39'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '1', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'WithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              { value: '1', kind: 'Decimal' }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'MintFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1thydcf5zxpp20us8jka3p02ryzudndm82603j306zry8gr23p2s3mu'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.971638382136307195', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent'
          }
        },
        {
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tz7wkr5y384ju58dh2ltknneppq6shtpwju9nygq9srhv9g3j6f86x'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '1', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'StakeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalValidator',
              entity_address:
                'validator_tdx_2_1s0j35ansmur5q8kxem4edr23j2leutupveqc9g8kuuj29wc7uvmd8z'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '1', kind: 'Decimal', field_name: 'xrd_staked' }],
            kind: 'Tuple',
            type_name: 'StakeEvent'
          }
        },
        {
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tztkzzj7ptts4c5thku4cu4yus9hjj3f6jgsrkkc56pfnjqvlql8w5'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.971638382136307195', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1thydcf5zxpp20us8jka3p02ryzudndm82603j306zry8gr23p2s3mu',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              { value: '0.971638382136307195', kind: 'Decimal' }
            ],
            kind: 'Enum',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'PayFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqnkhlszlddcx3hnlff00wca6yeuzm5d4vnl52ck7v6rxgxmh70h39'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.37226802363', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'PayFeeEvent'
          }
        },
        {
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhc6re2z'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.186134011815', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'BurnFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.186134011815', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ]
    },
    manifest_classes: ['ValidatorStake']
  }
] as CommittedTransactionInfo[]

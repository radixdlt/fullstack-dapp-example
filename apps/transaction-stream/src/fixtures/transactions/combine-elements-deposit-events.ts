// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 46748638,
    epoch: 33173,
    round: 63,
    round_timestamp: '2024-02-06T04:39:45.247Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1tjnmzt8l7e8c432ty5gguhku3gve6k0xqecs4k7cp5aktf5e7t8qutdld9',
    intent_hash: 'txid_tdx_2_1hpq92kpky7tscpwuqagr6at6t3nv8lw34n9j24nfu8hs5236k08qgwc2r4',
    fee_paid: '0.28732201691',
    confirmed_at: '2024-02-06T04:39:45.247Z',
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
                'internal_vault_tdx_2_1tzj4ufm8808n0f4ashst9tpjhjk49r2y7pldua85ya3yk24j05grj6'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'LockFeeEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.7553806608555'
              }
            ]
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
                'internal_vault_tdx_2_1tqufc2glwu4huq2f8fx7vrhn8ulpvwxwhum2v0h0sege67mnm6fydc'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'WithdrawEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '10'
              }
            ]
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
                'account_tdx_2_12x9avn52sl0qkfvaafr7mxu95gtf97zxr8nw46uuu7er6eds6w2wyl'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Enum',
            type_name: 'WithdrawEvent',
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                kind: 'Reference',
                type_name: 'ResourceAddress',
                value: 'resource_tdx_2_1th5y72fe3afxhuh4nkdtvcqw6tvhvdfupl87ua7flynk97mqxlmgsh'
              },
              {
                kind: 'Decimal',
                value: '10'
              }
            ]
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
                'resource_tdx_2_1th5y72fe3afxhuh4nkdtvcqw6tvhvdfupl87ua7flynk97mqxlmgsh'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '10'
              }
            ]
          }
        },
        {
          name: 'ElementsCombineDepositedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cqg5khdgj3hy8raczvsc89lf7mss07zespxk933vnjedef39dfekle'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'ElementsCombineDepositedEvent',
            fields: [
              {
                kind: 'Tuple',
                type_name: 'NonFungibleGlobalId',
                field_name: 'badge_id',
                fields: [
                  {
                    kind: 'Reference',
                    type_name: 'ResourceAddress',
                    field_name: 'resource_address',
                    value: 'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
                  },
                  {
                    kind: 'NonFungibleLocalId',
                    field_name: 'local_id',
                    value: '<a238747c3af247cb87c1f97618c9a73d>'
                  }
                ]
              }
            ]
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
                'internal_vault_tdx_2_1tzj4ufm8808n0f4ashst9tpjhjk49r2y7pldua85ya3yk24j05grj6'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'PayFeeEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.60992660595'
              }
            ]
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
            kind: 'Tuple',
            type_name: 'DepositEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.304963302975'
              }
            ]
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
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.304963302975'
              }
            ]
          }
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

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
                value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
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
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
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
          name: 'CombineElementsDepositedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.refinery
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'CombineElementsDepositedEvent',
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
                    value: 'resource_tdx_2_1nfqughuxfm6hetnkc7xg0qtnx8a7agl80pz9srxy4dvhz8ckvscs88'
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

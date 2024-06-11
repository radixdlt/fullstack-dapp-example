// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 4754964,
    epoch: 2464,
    round: 1372,
    round_timestamp: '2024-05-23T11:52:56.001Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1yqyhzh946855pnu5ehef2p3czn8tzamlnawu4fwp8e2c0fyarqaqw3ctwf',
    intent_hash: 'txid_tdx_2_1cgd7l9n2vsrg26rnxv08rf9x7vrp3ae6vr88485j7kyqcjhkw3dsuk8g6u',
    fee_paid: '0.58249652923',
    confirmed_at: '2024-05-23T11:52:56.001Z',
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
                'internal_vault_tdx_2_1tqqg6m7lvua8p9p9tfzdhag430k662a4n78pmvchqjchmrracp695r'
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
                value: '0.7341158149415'
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
                'internal_vault_tdx_2_1tzaz6k8d58fphgl3z29p23n7jf64q7wnzcev2rl3xhwltcj6e2rndq'
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
                value: '1'
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
                'account_tdx_2_12ys6rt7m4zsut5fpm77melt0wl3kj659vv59xzm4dduqtqse4fv7wa'
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
                value: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5'
              },
              {
                kind: 'Decimal',
                value: '1'
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
                'internal_vault_tdx_2_1tr78e9m7lqnd65jp30wcpzht7rhlqkexptx4c9z8w55qav6pkfcm7j'
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
                value: '1'
              }
            ]
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
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '1'
              }
            ]
          }
        },
        {
          name: 'JettySwapEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.jettySwap
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'JettySwapEvent',
            fields: []
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
                'internal_vault_tdx_2_1tzyp8pjcszrc587fr53z50wgrct9l6fam6jmez73jdnwz2pa2jdd4g'
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
                value: '1'
              }
            ]
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
                'account_tdx_2_12xurxxckyd7zqvwdvgqq53zvhzaezch7treukarxyywmqlqd76eh65'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Enum',
            type_name: 'DepositEvent',
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
                value: '1'
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
                'internal_vault_tdx_2_1tqqg6m7lvua8p9p9tfzdhag430k662a4n78pmvchqjchmrracp695r'
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
                value: '0.59115708559'
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
                value: '0.295578542795'
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
                value: '0.295578542795'
              }
            ]
          }
        }
      ]
    },
    manifest_classes: ['General']
  }
] as CommittedTransactionInfo[]

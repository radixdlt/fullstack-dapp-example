//@ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

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
                'internal_vault_tdx_2_1tz9nfr6fh9c369sxsmh6ag5cdgvepzj8p4yxwfp7ffdh8h6l2h49k4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.7241561751275', kind: 'Decimal', field_name: 'amount' }],
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
                'internal_vault_tdx_2_1tzsz2ksn28wvf0sz7nxs4jjrvhhsr52ehl90m0y5mxkhykuh30t4vt'
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
                value: 'resource_tdx_2_1thhecsamda2fsql9rqrth0rnlee8k6049n6dgswvj7g99rfe9u5nd5',
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
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpgqe8p85my5teky887vw2zk7mkd5x23nq8jjrwqd3n49j0svmn0ft'
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
            fields: [{ value: '1', kind: 'Decimal', field_name: 'amount' }],
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
                'internal_vault_tdx_2_1tpnt84q9vlmlvl69f7496uup2w9lp55acw7lms5auvu4jx7xr9tvvq'
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
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_129gm7z2uacm7y2cr3ank5npe842kkwyhe9j3wjs6h4rxrmq99d0u8n'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              { value: '1', kind: 'Decimal' }
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
                'internal_vault_tdx_2_1tz9nfr6fh9c369sxsmh6ag5cdgvepzj8p4yxwfp7ffdh8h6l2h49k4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [{ value: '0.58249652923', kind: 'Decimal', field_name: 'amount' }],
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
            fields: [{ value: '0.291248264615', kind: 'Decimal', field_name: 'amount' }],
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
            fields: [{ value: '0.291248264615', kind: 'Decimal', field_name: 'amount' }],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ]
    },
    manifest_classes: ['General']
  }
] as CommittedTransactionInfo[]

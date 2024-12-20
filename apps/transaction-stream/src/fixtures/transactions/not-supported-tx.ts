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

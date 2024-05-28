// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 54621606,
    epoch: 41358,
    round: 239,
    round_timestamp: '2024-03-05T14:51:56.842Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1nagmlwa92j7xd6gusr54zgttxzfq7akug0uajuzra77gcr5tepsq7spd20',
    intent_hash: 'txid_tdx_2_1xq90ucr0a7e9f8g2lw2r0eusqy6jxu8jhcma5utsgcrxe4k64wmswj3v3g',
    fee_paid: '0.61438174067',
    confirmed_at: '2024-03-05T14:51:56.842Z',
    receipt: {
      status: 'CommittedSuccess',
      events: [
        {
          name: 'MayaRouterWithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: 'component_tdx_2_mock_maya_router_address'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'MayaRouterWithdrawEvent',
            fields: [
              {
                kind: 'Reference',
                type_name: 'ComponentAddress',
                field_name: 'vault_address',
                value: 'account_tdx_2_12xytewtu5gy8u7zzwc76q0y8ganthvst0hyx97p509fzmva3a3rkyp'
              },
              {
                kind: 'Reference',
                type_name: 'ComponentAddress',
                field_name: 'intended_recipient',
                value: 'account_tdx_2_12xytewtu5gy8u7zzwc76q0y8ganthvst0hyx97p509fzmva3a3rkyp'
              },
              {
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'resource_address',
                value: 'resource_tdx_2_1tkzp4d8px0pes90na5qyhumwtfnrwdff7zs75rpjpvzrrmjmz4ccyr'
              },
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '1'
              },
              {
                kind: 'String',
                field_name: 'memo',
                value: 'abc'
              }
            ]
          }
        }
      ]
    },
    manifest_classes: ['General']
  }
] as CommittedTransactionInfo[]

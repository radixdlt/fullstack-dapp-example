// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586370,
    epoch: 1859,
    round: 752,
    round_timestamp: '2024-05-21T09:26:21.146Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1n6k70emk98js8mzukxhg9utc5zfcacgepmtyepf280km7r4pq5tsc6srqr',
    intent_hash: 'txid_tdx_2_1dh6ljsxeydlnq73v53jc7gz0rmarcqthe8nn50yzq0v4nrduuphsnleaqs',
    fee_paid: '0.56712339503',
    confirmed_at: '2024-05-21T09:26:21.146Z',
    error_message:
      'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.56712339503',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 3586366,
    epoch: 1859,
    round: 749,
    round_timestamp: '2024-05-21T09:26:20.623Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1wfgjn4a2736mnxyt05qu5zd74pm4uklkw0lczql6y0skyekrqedqsrt7dv',
    intent_hash: 'txid_tdx_2_1hysf84cyvfe7px2a85yeu90rlzxam2yyj9q77qp8re4n2d2dle5qykm6nc',
    fee_paid: '1.41098807387',
    confirmed_at: '2024-05-21T09:26:20.623Z',
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
                'internal_vault_tdx_2_1tr5g2qfz4yjr5w9nrwhyqzhsmmu0mntfm9nqyw0elr2233fsru8q2w'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
          }
        },
        {
          name: 'EventPairUpdates',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cr3m7lq00g3vha5zdp5jmf9wpj0d64qz79autgjctuh6pykpwvjfef'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'Tuple',
                elements: [
                  {
                    fields: [
                      {
                        value: 'BTC/USD',
                        kind: 'String'
                      },
                      {
                        fields: [
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_long'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_short'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'cost'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'skew_abs_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'pnl_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_2_rate'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_long_index'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_short_index'
                          },
                          {
                            value: '1716283580',
                            kind: 'I64',
                            type_name: 'Instant',
                            field_name: 'last_update'
                          },
                          {
                            value: '70946.65000000001',
                            kind: 'Decimal',
                            field_name: 'last_price'
                          }
                        ],
                        kind: 'Tuple',
                        type_name: 'PoolPosition'
                      }
                    ],
                    kind: 'Tuple'
                  },
                  {
                    fields: [
                      {
                        value: 'ETH/USD',
                        kind: 'String'
                      },
                      {
                        fields: [
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_long'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_short'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'cost'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'skew_abs_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'pnl_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_2_rate'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_long_index'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_short_index'
                          },
                          {
                            value: '1716283580',
                            kind: 'I64',
                            type_name: 'Instant',
                            field_name: 'last_update'
                          },
                          {
                            value: '3658.70042286',
                            kind: 'Decimal',
                            field_name: 'last_price'
                          }
                        ],
                        kind: 'Tuple',
                        type_name: 'PoolPosition'
                      }
                    ],
                    kind: 'Tuple'
                  },
                  {
                    fields: [
                      {
                        value: 'XRD/USD',
                        kind: 'String'
                      },
                      {
                        fields: [
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_long'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'oi_short'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'cost'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'skew_abs_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'pnl_snap'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_2_rate'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_long_index'
                          },
                          {
                            value: '0',
                            kind: 'Decimal',
                            field_name: 'funding_short_index'
                          },
                          {
                            value: '1716283580',
                            kind: 'I64',
                            type_name: 'Instant',
                            field_name: 'last_update'
                          },
                          {
                            value: '0.045795',
                            kind: 'Decimal',
                            field_name: 'last_price'
                          }
                        ],
                        kind: 'Tuple',
                        type_name: 'PoolPosition'
                      }
                    ],
                    kind: 'Tuple'
                  }
                ],
                kind: 'Array',
                field_name: 'updates'
              }
            ],
            kind: 'Tuple',
            type_name: 'EventPairUpdates'
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
                'resource_tdx_2_1thne97yea6gqhgrgs73lf3xam2cy7l7zs0cdgh6hfhjqjhyff2hdfk'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '3',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
                'internal_vault_tdx_2_1truqghtetw56qfq4rphupgcdg0umu7d8c8caawhhvmukm27pq8rs5l'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '3',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
                'account_tdx_2_12xu8953kujyhngqz2a79t8p2lyc4d4pmcwelzpmsg2l2rna4jgqnsd'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1thne97yea6gqhgrgs73lf3xam2cy7l7zs0cdgh6hfhjqjhyff2hdfk',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '3',
                kind: 'Decimal'
              }
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
                'internal_vault_tdx_2_1tr5g2qfz4yjr5w9nrwhyqzhsmmu0mntfm9nqyw0elr2233fsru8q2w'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.41098807387',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.705494036935',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.705494036935',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ]
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586349,
    epoch: 1859,
    round: 733,
    round_timestamp: '2024-05-21T09:26:17.945Z',
    payload_hash:
      'notarizedtransaction_tdx_2_174mulvnzad5pzpaxlzr996sq64qvfe07fkndl5w7paqfxdzv2sss6hs0qq',
    intent_hash: 'txid_tdx_2_137n9t5n60uth25tve3dwkgtnwwlc539f6r5z5957tuhhj53jt08qzrpg6l',
    fee_paid: '0.56712339503',
    confirmed_at: '2024-05-21T09:26:17.945Z',
    error_message:
      'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.56712339503',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586332,
    epoch: 1859,
    round: 717,
    round_timestamp: '2024-05-21T09:26:15.285Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1hz8760jhthlpjvlf77awlxv3jy9222scw6ltc89h0f0dhf6z37rsxl024l',
    intent_hash: 'txid_tdx_2_1pgagjwq0jr39akn74mapclzgnv9nwax00pa9fe208fe7qq9zjgfqmp8qgx',
    fee_paid: '0.56712339503',
    confirmed_at: '2024-05-21T09:26:15.285Z',
    error_message:
      'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.56712339503',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586315,
    epoch: 1859,
    round: 701,
    round_timestamp: '2024-05-21T09:26:12.631Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1htt3hmnpwdvp49gkp06d6nanwtuy4wjcknweh8htgjwd8csg2trs6xsu9l',
    intent_hash: 'txid_tdx_2_1hz2wl5nc2aexewcar0x8wa9n9zgg935y0e0xph02mnat4nx5gnzqz77yvs',
    fee_paid: '0.56712339503',
    confirmed_at: '2024-05-21T09:26:12.631Z',
    error_message:
      'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.56712339503',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586294,
    epoch: 1859,
    round: 681,
    round_timestamp: '2024-05-21T09:26:09.328Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1zq3mp8nrxwf7dfyt8z5dzkhcwt0pgk68g76uuq7u0hezn6awtnjqw43wlh',
    intent_hash: 'txid_tdx_2_1nsv9ceqxj4d3yaxk30hnwx2dh76w83yc6spnk9c2py0peql4zd5seu4kc2',
    fee_paid: '0.56712339503',
    confirmed_at: '2024-05-21T09:26:09.328Z',
    error_message:
      'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.56712339503',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.283561697515',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("Error updating pool state: \\"Price info is too old\\" @ src/lending_market.rs:1388:18"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 3586274,
    epoch: 1859,
    round: 662,
    round_timestamp: '2024-05-21T09:26:06.142Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1w882mer6djls35v9p7mp5vlpetz7q0vxwjhxsnpgmqrz0pqm3dzssnduyw',
    intent_hash: 'txid_tdx_2_18d2wh3uqvp039kzwzvu8lmycsk7040m97tp29tu8exr34hlnwdjqgcqqnv',
    fee_paid: '0.84099653548',
    confirmed_at: '2024-05-21T09:26:06.142Z',
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
          }
        },
        {
          name: 'LendingPoolUpdatedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1crdm3u3xhsatvpftm9xwf8nwzty65kxj6wryjs8m9rrt527ahl087c'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'pool_res_address'
              },
              {
                variant_id: 4,
                variant_name: 'Price',
                fields: [],
                kind: 'Enum',
                type_name: 'LendingPoolUpdatedEventType',
                field_name: 'event_type'
              },
              {
                value: '0',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LendingPoolUpdatedEvent'
          }
        },
        {
          name: 'LendingPoolUpdatedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1crdm3u3xhsatvpftm9xwf8nwzty65kxj6wryjs8m9rrt527ahl087c'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'pool_res_address'
              },
              {
                variant_id: 3,
                variant_name: 'Interest',
                fields: [],
                kind: 'Enum',
                type_name: 'LendingPoolUpdatedEventType',
                field_name: 'event_type'
              },
              {
                value: '0',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LendingPoolUpdatedEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.84099653548',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.42049826774',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.42049826774',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ]
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586258,
    epoch: 1859,
    round: 647,
    round_timestamp: '2024-05-21T09:26:03.641Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1nce5mrmpuhf03gduaprqclu906wdxlll5qzm9qntx00r6238x9hse4kpa2',
    intent_hash: 'txid_tdx_2_1dxup9u7rfm4shezywr7qfcfq2ccwut2xf53uxm68sq7xc9sket9s3gzkq6',
    fee_paid: '0.51614918725',
    confirmed_at: '2024-05-21T09:26:03.641Z',
    error_message:
      'ApplicationError(PanicMessage("cdp info is too old. @ src/lending_market.rs:931:17"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.51614918725',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.258074593625',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.258074593625',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("cdp info is too old. @ src/lending_market.rs:931:17"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedFailure',
    state_version: 3586240,
    epoch: 1859,
    round: 630,
    round_timestamp: '2024-05-21T09:26:00.814Z',
    payload_hash:
      'notarizedtransaction_tdx_2_12egc3nl9edj7gw32aefcuqr550lv52s2q9tssk2l0d2s898p2hkq0sexsl',
    intent_hash: 'txid_tdx_2_17avlqcj4vq8n9ll6ylqsrdqe2m5k2qp5pznn3cf9wh44cl6qxwzqzx572l',
    fee_paid: '0.91352243129',
    confirmed_at: '2024-05-21T09:26:00.814Z',
    error_message:
      'ApplicationError(PanicMessage("update interest and price: \\"Price info is too old\\" @ src/modules/cdp_health_checker.rs:192:64"))',
    receipt: {
      status: 'CommittedFailure',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tpjch2wketnwlsv2wd3p03atepxaf4sc69ym9a8xas5yk2pcczj2lr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.91352243129',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.456761215645',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.456761215645',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ],
      error_message:
        'ApplicationError(PanicMessage("update interest and price: \\"Price info is too old\\" @ src/modules/cdp_health_checker.rs:192:64"))'
    },
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 3586193,
    epoch: 1859,
    round: 584,
    round_timestamp: '2024-05-21T09:25:53.129Z',
    payload_hash:
      'notarizedtransaction_tdx_2_18sxenxp7949qnl48aaaasygu45628p2puc0ltf09sx3gq5erhjmsgs0t0s',
    intent_hash: 'txid_tdx_2_1mtpspj7cjwmnwfp77wu4tycxtj35rwwtv28eqkpn275lxs9jy7js3dv8s4',
    fee_paid: '0.91531881523',
    confirmed_at: '2024-05-21T09:25:53.129Z',
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '50',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
          }
        },
        {
          name: 'MintNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address: addresses.resources.radgemAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{9ec053c28e793516-5739adba199943aa-cb66507afc68f33e-d13e5cd7c48c2d0a}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintNonFungibleResourceEvent'
          }
        },
        {
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nq8rvdufuhjfe8tzl7ukudy9da2fa75sx6luftq9jt8yhlxw3kr3ts'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{9ec053c28e793516-5739adba199943aa-cb66507afc68f33e-d13e5cd7c48c2d0a}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'CombineElementsMintedRadgemEvent',
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
            fields: [
              {
                fields: [
                  {
                    value: 'resource_tdx_2_1nfqughuxfm6hetnkc7xg0qtnx8a7agl80pz9srxy4dvhz8ckvscs88',
                    kind: 'Reference',
                    type_name: 'ResourceAddress',
                    field_name: 'resource_address'
                  },
                  {
                    value: '<95ad6df9f66b4655ac619cdbb3db4308>',
                    kind: 'NonFungibleLocalId',
                    field_name: 'local_id'
                  }
                ],
                kind: 'Tuple',
                type_name: 'NonFungibleGlobalId',
                field_name: 'badge_id'
              },
              {
                value: '{9ec053c28e793516-5739adba199943aa-cb66507afc68f33e-d13e5cd7c48c2d0a}',
                kind: 'NonFungibleLocalId',
                field_name: 'radgem_local_id'
              },
              {
                fields: [
                  {
                    value: '',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Metallic Sky RadGem',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value: 'Metallic',
                    kind: 'String',
                    field_name: 'material'
                  },
                  {
                    value: 'Sky',
                    kind: 'String',
                    field_name: 'color'
                  },
                  {
                    value: 'Common',
                    kind: 'String',
                    field_name: 'rarity'
                  }
                ],
                kind: 'Tuple',
                type_name: 'RadgemData',
                field_name: 'radgem_data'
              }
            ],
            kind: 'Tuple',
            type_name: 'CombineElementsMintedRadgemEvent'
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.91531881523',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.457659407615',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
            fields: [
              {
                value: '0.457659407615',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        }
      ]
    },
    manifest_classes: ['General']
  }
] as CommittedTransactionInfo[]

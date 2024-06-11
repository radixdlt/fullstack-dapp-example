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
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tr22ckh95nrcvmag4enqdh50ptl634e7nwglt52flz6ld542u394zk'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.7494572232835',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
          }
        },
        {
          name: 'RewardClaimedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cq02l5g0w2rd3rgm6vwg2496pntgdjvrk40ej0jv4hd37dthr3qxxs'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '<aaf4f0f9515640bab87f073eafa58b37>',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: 'FirstTransactionQuest',
                kind: 'String',
                type_name: 'QuestId',
                field_name: 'quest_id'
              },
              {
                element_kind: 'Reference',
                elements: [
                  {
                    value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
                    kind: 'Reference',
                    type_name: 'ResourceAddress'
                  }
                ],
                kind: 'Array',
                field_name: 'rewards'
              }
            ],
            kind: 'Tuple',
            type_name: 'RewardClaimedEvent'
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
                'internal_vault_tdx_2_1tqlckzmk7fu6thnzhu2jerlxzlpfcdtc98gqqxwtku00ev5js8ynt4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '20',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'VaultCreationEvent',
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
            fields: [
              {
                element_kind: 'U8',
                hex: '58210abacae47bd66287ef2d563c2d6824c43f7b4a2e5712b43955fc43eb',
                kind: 'Bytes',
                type_name: 'NodeId',
                field_name: 'vault_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'VaultCreationEvent'
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
                'internal_vault_tdx_2_1tqss4wk2u3aavc58auk4v0pddqjvg0mmfgh9wy45892lcslt3admmf'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '20',
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
                'account_tdx_2_128tm38525smqdt7pu8ve2djnxggl49dq8deu8mg4yqltww92wec9xk'
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
              {
                value: '20',
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
                'internal_vault_tdx_2_1tr22ckh95nrcvmag4enqdh50ptl634e7nwglt52flz6ld542u394zk'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.61438174067',
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
                value: '0.307190870335',
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
                value: '0.307190870335',
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
    transaction_status: 'CommittedSuccess',
    state_version: 54621534,
    epoch: 41358,
    round: 166,
    round_timestamp: '2024-03-05T14:51:33.728Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1tt724d0xvfm52c32l6vahzaluwf7qqrr2t62tu75sg05h3vz6qxqxcv922',
    intent_hash: 'txid_tdx_2_173sjhqlzgt5nycweelrcnduf9qx7zw77kt7hg4yd5hyehfh9m2zs5l8w25',
    fee_paid: '0.57303754411',
    confirmed_at: '2024-03-05T14:51:33.728Z',
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
                'internal_vault_tdx_2_1tzm77uevwrl5l0ntqf5phhuyp96cxhe8tjxnef3v0zsxmz3a3276ja'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '100',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '20',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent'
          }
        },
        {
          name: 'RewardDepositedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cq02l5g0w2rd3rgm6vwg2496pntgdjvrk40ej0jv4hd37dthr3qxxs'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '<aaf4f0f9515640bab87f073eafa58b37>',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: 'FirstTransactionQuest',
                kind: 'String',
                type_name: 'QuestId',
                field_name: 'quest_id'
              },
              {
                element_kind: 'Reference',
                elements: [
                  {
                    value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
                    kind: 'Reference',
                    type_name: 'ResourceAddress'
                  }
                ],
                kind: 'Array',
                field_name: 'rewards'
              }
            ],
            kind: 'Tuple',
            type_name: 'RewardDepositedEvent'
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
                'internal_vault_tdx_2_1tqlckzmk7fu6thnzhu2jerlxzlpfcdtc98gqqxwtku00ev5js8ynt4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '20',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
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
                'internal_vault_tdx_2_1tzm77uevwrl5l0ntqf5phhuyp96cxhe8tjxnef3v0zsxmz3a3276ja'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.57303754411',
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
                value: '0.286518772055',
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
                value: '0.286518772055',
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
    manifest_classes: []
  }
] as CommittedTransactionInfo[]

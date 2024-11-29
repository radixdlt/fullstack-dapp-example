// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32931082,
    epoch: 16936,
    round: 276,
    round_timestamp: '2024-07-12T17:52:04.375Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1vgf8qezv5yes7www2mpr36yltcfl86ge892c56shdum0p7gw0ekq38nhqg',
    intent_hash: 'txid_tdx_2_1w34e6l4872nayh4cat8jxgrxyejtv38sh4d3lln23693yddaxjgsm3kwnj',
    fee_paid: '0.27453476715',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_129wrd3r0g726gvd22akr4n7h6egum904tud04hcgl6pmew7vq2m9cq',
      'component_tdx_2_1cr6mvq384sjshjwxgjrf20l25wcq4hqfhuezujh7l88w5ulf6gy9pf'
    ],
    confirmed_at: '2024-07-12T17:52:04.375Z',
    raw_hex:
      '4d22030221022104210707020a28420000000000000a324200000000000009a56d3cf4220101200720b493c426eeb71958a4548a078b9ec457bf32e2566f4e7b8dca1206ac924980d4010008000020220441038000515c36c46f4795a431aa576c3acfd7d651cd95f55f1afadf08fe83bcbbcc0c086c6f636b5f666565210185e0bd6a1c0b5e21050000000000000000000000000000000041038000515c36c46f4795a431aa576c3acfd7d651cd95f55f1afadf08fe83bcbbcc0c087769746864726177210280005d48267f01d93ecf7fc58f57227c2f73bdfb10c0bf33e8d2393247b229ed850000e8890423c78a00000000000000000000000000000000000280005d48267f01d93ecf7fc58f57227c2f73bdfb10c0bf33e8d2393247b229ed850000e8890423c78a0000000000000000000000000000000041038000515e31e05295506b96cf745fcb11ceb8b65fac7bb02cf9613d951eba27530c147472795f6465706f7369745f6f725f61626f72742102810000000022000020200022000020220101022007209d6336b34c726b420f99efe3e58b0d7e363136032e0f433386feecb87b60d67b2101200740c751cff74f8200e17880ee32d996e1898ee7941280f14eba8aadcd0d8420b7b927bc2c187c683a617a26044283369ff5cd76315d641783f6cd5199038046fe0822010121012007408a2ef7a6dd6196b2dfebd677dedca8dd1c0303cb0ba2e7f5ad28d7728dc183b412f5cae6ea4262f69f1124bf52eea1ef35e320f2bfaa8a3289adaddb37651306',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.11243819997',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.32510195',
        xrd_total_finalization_cost: '0.02625525',
        execution_cost_units_consumed: 6502039,
        finalization_cost_units_consumed: 525105
      },
      costing_parameters: {
        xrd_usd_price: '16.666666666666666666',
        tip_percentage: 0,
        xrd_storage_price: '0.00009536743',
        execution_cost_unit_loan: 4000000,
        execution_cost_unit_limit: 100000000,
        execution_cost_unit_price: '0.00000005',
        xrd_archive_storage_price: '0.00009536743',
        finalization_cost_unit_limit: 50000000,
        finalization_cost_unit_price: '0.00000005'
      },
      fee_destination: {
        to_burn: '0.231897699985',
        to_proposer: '0.1159488499925',
        to_validator_set: '0.1159488499925',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.46379539997',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trs0qn4kh8jnq5f7x4h9z7rvwaccujrtlyejzuc8x7aveyezndkt6q'
            }
          }
        ]
      },
      state_updates: {
        created_substates: [
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  intent_hash: '55cda0a6a0163e677b094a89ddbc979e6b7d44a7025fa975ca5060c6a6503da9',
                  intent_hash_bech32m:
                    'txid_tdx_2_12hx6pf4qzclxw7cff2yam0yhne4h6398qf06jaw22psvdfjs8k5scft6ta'
                },
                value: {
                  status: 'CommittedSuccess'
                },
                is_locked: false,
                substate_type: 'TransactionTrackerCollectionEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalTransactionTracker',
              substate_key: {
                key_hex: '5c20072055cda0a6a0163e677b094a89ddbc979e6b7d44a7025fa975ca5060c6a6503da9',
                key_type: 'Map',
                db_sort_key_hex:
                  'b1c0a154a2ef7b15f7c1b6997f489d516f84d2505c20072055cda0a6a0163e677b094a89ddbc979e6b7d44a7025fa975ca5060c6a6503da9'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 243
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'bd71c021e525c608eaf7291c8c0eb2519993241a8e8d6d58c62e3ae056535592',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxtxtrakxxxxxxxxx000595975309xxxxxxxxxnvwmul'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'bd71c021e525c608eaf7291c8c0eb2519993241a8e8d6d58c62e3ae056535592',
                  local_type_id: {
                    id: 1,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0100000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxtxtrakxxxxxxxxx000595975309xxxxxxxxxnvwmul'
                }
              }
            }
          }
        ],
        deleted_substates: [],
        updated_substates: [
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  rewards_vault: {
                    is_global: false,
                    entity_type: 'InternalFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhc6re2z'
                  },
                  proposer_rewards: [
                    {
                      xrd_amount: '1.340131124025',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.0700423686125',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.22508284732',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.3410316973125',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.6232327621075',
                      validator_index: {
                        index: 6
                      }
                    }
                  ]
                },
                is_locked: false,
                substate_type: 'ConsensusManagerFieldValidatorRewards'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalConsensusManager',
              substate_key: {
                id: 2,
                key_type: 'Field',
                db_sort_key_hex: '02'
              },
              entity_module: 'Main',
              substate_type: 'ConsensusManagerFieldValidatorRewards',
              entity_address:
                'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  rewards_vault: {
                    is_global: false,
                    entity_type: 'InternalFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhc6re2z'
                  },
                  proposer_rewards: [
                    {
                      xrd_amount: '1.340131124025',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.0700423686125',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.22508284732',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.22508284732',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.6232327621075',
                      validator_index: {
                        index: 6
                      }
                    }
                  ]
                },
                is_locked: false,
                substate_type: 'ConsensusManagerFieldValidatorRewards'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'd8510877df1d820f4752b3c033baf656f62e0e612731718865d048b9d16300b3',
                  local_type_id: {
                    id: 9,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0900000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxcnsmgrxxxxxxxxx000746305335xxxxxxxxxqe4rf2'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '611.60617857341'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'FungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1trs0qn4kh8jnq5f7x4h9z7rvwaccujrtlyejzuc8x7aveyezndkt6q',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '662.06997397338'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '462a3fea283117aab2b01c297812bdc0fa9060b29eb5e68b847f361bc1201933',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '950'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'FungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1tqvprpscdpqk2kdeykmj446dhu825nmm2href3qvww024k4ggkryuv',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '900'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '462a3fea283117aab2b01c297812bdc0fa9060b29eb5e68b847f361bc1201933',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '7.199041600607447825'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'FungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhc6re2z',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '6.967143900622447825'
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '462a3fea283117aab2b01c297812bdc0fa9060b29eb5e68b847f361bc1201933',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              }
            }
          }
        ],
        deleted_partitions: [],
        new_global_entities: []
      },
      output: [
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f83eea6bcf50cfd71b3cf830473997ecd5b0b81111bbd4f05d9d8feeb045',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8f44c3e0164cd79fcd829547fa32b9af3871e51d5938783810cfa225e3c',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8f44c3e0164cd79fcd829547fa32b9af3871e51d5938783810cfa225e3c',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        }
      ],
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trs0qn4kh8jnq5f7x4h9z7rvwaccujrtlyejzuc8x7aveyezndkt6q'
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
                value: '0.6068822464785'
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
                'internal_vault_tdx_2_1trs0qn4kh8jnq5f7x4h9z7rvwaccujrtlyejzuc8x7aveyezndkt6q'
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
                value: '50'
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
                'account_tdx_2_12x0ffncxeullexnkl673u8qg32m7rhrjjf2w9nvtg69kmjrprg0v4j'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Enum',
            type_name: 'WithdrawEvent',
            variant_id: '0',
            variant_name: 'Fungible',
            fields: [
              {
                kind: 'Reference',
                type_name: 'ResourceAddress',
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
              },
              {
                kind: 'Decimal',
                value: '50'
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
                'internal_vault_tdx_2_1tqvprpscdpqk2kdeykmj446dhu825nmm2href3qvww024k4ggkryuv'
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
                value: '50'
              }
            ]
          }
        },
        {
          name: 'PurchaseTicketsEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: `${addresses.components.ticketMachine}`
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'PurchaseTicketsEvent',
            fields: [
              {
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id',
                value: 'c74f1b9b0fde447283989be4274343dc'
              },
              {
                kind: 'Decimal',
                field_name: 'ticket_amount',
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
                'internal_vault_tdx_2_1trs0qn4kh8jnq5f7x4h9z7rvwaccujrtlyejzuc8x7aveyezndkt6q'
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
                value: '0.46379539997'
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
                value: '0.231897699985'
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
                value: '0.231897699985'
              }
            ]
          }
        }
      ]
    },
    manifest_classes: ['Transfer', 'General'],
    balance_changes: {
      fungible_fee_balance_changes: [
        {
          type: 'FeePayment',
          entity_address: 'account_tdx_2_129wrd3r0g726gvd22akr4n7h6egum904tud04hcgl6pmew7vq2m9cq',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.27453476715'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.137267383575'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_129wrd3r0g726gvd22akr4n7h6egum904tud04hcgl6pmew7vq2m9cq',
          resource_address:
            'resource_tdx_2_1t4yzvlcpmylv7l793atjylp0ww7lkyxqhue7353exfrmy20dkhga39',
          balance_change: '-10'
        },
        {
          entity_address: 'account_tdx_2_1290rrczjj4gxh9k0w30ukywwhzm9ltrmkqk0jcfaj50t5f6n4xxezt',
          resource_address:
            'resource_tdx_2_1t4yzvlcpmylv7l793atjylp0ww7lkyxqhue7353exfrmy20dkhga39',
          balance_change: '10'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

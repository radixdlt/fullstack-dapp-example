// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32224294,
    epoch: 16550,
    round: 1198,
    round_timestamp: '2024-07-11T09:44:40.272Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1mex84eps60mn6yvyx6z7rkuqfk5pvf5yewjdvrqlmqqk9khzcv9sahhlay',
    intent_hash: 'txid_tdx_2_1xr0xjvew9zv86hr7jsrzeeg2kl3mh6462fuqrnfaexltk6e9aa0sdfphe2',
    fee_paid: '1.01031772109',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0',
      'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
    ],
    confirmed_at: '2024-07-11T09:44:40.272Z',
    raw_hex:
      '4d22030221022104210707020aa6400000000000000aa84000000000000009d653bc11220101200720ab94145445fa2cdfda1bde8f2801324ae1ed90f451f3a2dbcb1325ae1afdc4bf010108000020220541038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d0000000000000000000000000000000041038000c0b9458a0e4602506f5506e2de45913f05b37e3cb85302ada2689684a8860c21636f6d62696e655f656c656d656e74735f6164645f72616467656d5f696d61676521030c2035653736386434393539663334643461623532356330383266326165666234628703f87a84d866be34e36cdd105846bddd37602ed8c859c1feb970c80ec3e963de480c5a68747470733a2f2f73746f6b656e65742d64617368626f6172642e7261646978646c742e636f6d2f5f6170702f696d6d757461626c652f6173736574732f6e66742d706c616365686f6c6465722e32654464796271562e737667202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf2101200740a2f6b3af6393f3d2243b5d603c083109c5d0aee217230ce640ac767003b961154cfdc8b45074cabf4eca2886d32fef4d76bf8db387251545248bec259508b70a01022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b32101200740f47f08feb5add70d290975ca0f4b519979d9ec5a922dbbba8269236121bce3096ebddc50dcbb5b9581e7aaf23f9ec61505f7f44ff4aa2617dc0d2eb6dbfa54002201012101200740fd452cbfa4580ce8be2dd26a7b02d79b396ec9efa6e68e1dcdd3dc33400eeaa7a8336fde24290d986377a4faa6d58dd332bb738ef932721416263d4967246909',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.11091232109',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.84389325',
        xrd_total_finalization_cost: '0.05551215',
        execution_cost_units_consumed: 16877865,
        finalization_cost_units_consumed: 1110243
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
        to_burn: '0.505158860545',
        to_proposer: '0.2525794302725',
        to_validator_set: '0.2525794302725',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.01031772109',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059'
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
                  intent_hash: '30de69332e28987d5c7e94062ce50ab7e3bbeaba527801cd3dc9bebb6b25ef5f',
                  intent_hash_bech32m:
                    'txid_tdx_2_1xr0xjvew9zv86hr7jsrzeeg2kl3mh6462fuqrnfaexltk6e9aa0sdfphe2'
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
                key_hex: '5c20072030de69332e28987d5c7e94062ce50ab7e3bbeaba527801cd3dc9bebb6b25ef5f',
                key_type: 'Map',
                db_sort_key_hex:
                  '27979adbfb64a319f04400533608521be2e455895c20072030de69332e28987d5c7e94062ce50ab7e3bbeaba527801cd3dc9bebb6b25ef5f'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 230
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
                      xrd_amount: '1.3886745576775',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.9163618564525',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.6565286234875',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.2465661639875',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.1820821096575',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.147850881985',
                      validator_index: {
                        index: 5
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
                      xrd_amount: '1.3886745576775',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.66378242618',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.6565286234875',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.2465661639875',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.1820821096575',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.147850881985',
                      validator_index: {
                        index: 5
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
                  amount: '78657.94733551604'
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
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '78658.95765323713'
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
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003f87a84d866be34e36cdd105846bddd37602ed8c859c1feb970c80ec3e963de48',
                    simple_rep:
                      '{f87a84d866be34e3-6cdd105846bddd37-602ed8c859c1feb9-70c80ec3e963de48}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c5a68747470733a2f2f73746f6b656e65742d64617368626f6172642e7261646978646c742e636f6d2f5f6170702f696d6d757461626c652f6173736574732f6e66742d706c616365686f6c6465722e32654464796271562e7376670c1d4d6574616c6c696320436f72616c2052616447656d207b372f3130307d0c615468652052617265204d6574616c6c6963206d6174657269616c206f66207468697320436f72616c2052616447656d206973206772616465642061742061207175616c697479206f662037206f7574206f66206120706f737369626c652032352e0c086d6574616c6c69630c05636f72616c0c0472617265a00000bc93e9fe246100000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc003f87a84d866be34e36cdd105846bddd37602ed8c859c1feb970c80ec3e963de48',
                key_type: 'Map',
                db_sort_key_hex:
                  'c1385333db188a4de989fff0df39a027dbfcabcf5cc003f87a84d866be34e36cdd105846bddd37602ed8c859c1feb970c80ec3e963de48'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
              partition_kind: 'KeyValue',
              partition_number: 65
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003f87a84d866be34e36cdd105846bddd37602ed8c859c1feb970c80ec3e963de48',
                    simple_rep:
                      '{f87a84d866be34e3-6cdd105846bddd37-602ed8c859c1feb9-70c80ec3e963de48}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c000c1d4d6574616c6c696320436f72616c2052616447656d207b372f3130307d0c615468652052617265204d6574616c6c6963206d6174657269616c206f66207468697320436f72616c2052616447656d206973206772616465642061742061207175616c697479206f662037206f7574206f66206120706f737369626c652032352e0c086d6574616c6c69630c05636f72616c0c0472617265a00000bc93e9fe246100000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '13bcc1e1d055e469936948b51d3621e05f8130901231a0847b8ff16eee058759',
                  local_type_id: {
                    id: 194,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c22000107c2',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              },
              value_schema: {
                type: 'ObjectInstance',
                generic_index: 0,
                resolved_full_type_id: {
                  schema_hash: 'eaa350c8c6e2859e8479fc71d5ab55f74a3de98c0096fc1622eaeaa5fb825dfe',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '9.07612838841553717'
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
                  amount: '8.57096952787053717'
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
          hex: '5c90f81f4cdd1a1da68cec80caa7c7f60768b9376cc8248910c5832f9b029317',
          programmatic_json: null
        },
        {
          hex: '5c90f804bbec1f55e5385433d4818d637b85fada006077c5ddbaf0be28b26f15',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f84c67178f48ba65a44fdab42dc2569deb0fdb5b283231457e7e98a47944',
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
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059'
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
          name: 'CombineElementsAddedRadgemImageEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '5e768d4959f34d4ab525c082f2aefb4b',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'CombineElementsAddedRadgemImageEvent'
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
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.01031772109',
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
                value: '0.505158860545',
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
                value: '0.505158860545',
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
    manifest_classes: [],
    balance_changes: {
      fungible_fee_balance_changes: [
        {
          type: 'FeePayment',
          entity_address: 'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.01031772109'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.505158860545'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

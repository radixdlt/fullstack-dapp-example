// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32905219,
    epoch: 16922,
    round: 498,
    round_timestamp: '2024-07-12T16:42:47.68Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1zw3029grn5vgunh6kjw9c4r6wdeu8jtwz8g39ffafupfy5nw0xvqdymkzl',
    intent_hash: 'txid_tdx_2_1qkncjemh8unajgtuhx4tce3n82zxrt408nt3hgnd6q7mkwdat43sz8uukp',
    fee_paid: '1.16296589499',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c',
      'component_tdx_2_1cq46e9fpa58a66us5h8eh2v5wz8ysmt7awgy0mq8nazpmu43dnqq9e',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-12T16:42:47.68Z',
    raw_hex:
      '4d22030221022104210707020a1a420000000000000a1c42000000000000097054219822010120072034009dd9adf244204cdc7d32b6a4eb87a3dff08a9c51db571e678f2666e09d3f010108000020220541038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d46451539dd773f2624c8d60517afdf0895597ca50a2b03aff5ff95f15185000064a7b3b6e00d0000000000000000000000000000000041038000c02bac9521ed0fdd6b90a5cf9ba994708e486d7eeb9047ec079f441df2b10c1c636f6d62696e655f656c656d656e74735f6d696e745f72616467656d21040c2065613930636462383034653434316666386266333063363265343566663939668570c1d174712f58070000000000000000000000000000000085d002db6a2a7d6f070000000000000000000000000000000085b4c1dbe0a275ab0900000000000000000000000000000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf2101200740cfb22f046f9d1269372c3ca5410b79bc536b603d470d259506ac23de20f1f75c5dc8e19f2f2a14af16099b52aff4920f8065a1eaf43bc0bf6d688e0ff9aea90b01022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b32101200740ffb55704ce8dc2f2e06f109b341ddbf477466376b66fd2cf2e7ca52fd221d86dc5bcb6e4bacc740d10b18ed175ed338c047b07bc3e3d37b84d2ad8304ee8d70d22010121012007408f504e1f9517daa486fc5ffe1882d34e3ec307d1944eddf50714dd0f412364943d61f2ed41d6a696929a823572b401a019d0d262db3e5638cccd7f51b032c908',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.18053054499',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.90641885',
        xrd_total_finalization_cost: '0.0760165',
        execution_cost_units_consumed: 18128377,
        finalization_cost_units_consumed: 1520330
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
        to_burn: '0.581482947495',
        to_proposer: '0.2907414737475',
        to_validator_set: '0.2907414737475',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.16296589499',
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
                  intent_hash: '05a78967773f27d9217cb9aabc66333a8461aeaf3cd71ba26dd03dbb39bd5d63',
                  intent_hash_bech32m:
                    'txid_tdx_2_1qkncjemh8unajgtuhx4tce3n82zxrt408nt3hgnd6q7mkwdat43sz8uukp'
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
                key_hex: '5c20072005a78967773f27d9217cb9aabc66333a8461aeaf3cd71ba26dd03dbb39bd5d63',
                key_type: 'Map',
                db_sort_key_hex:
                  '98fabaaa69ada47328b0eba0531a241467e2f3765c20072005a78967773f27d9217cb9aabc66333a8461aeaf3cd71ba26dd03dbb39bd5d63'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 234
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
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf',
                    simple_rep:
                      '{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c000c1f4372797374616c6c696e6520436f72616c2052616447656d207b342f32357d0c6654686520436f6d6d6f6e204372797374616c6c696e65206d6174657269616c206f66207468697320436f72616c2052616447656d206973206772616465642061742061207175616c697479206f662034206f7574206f66206120706f737369626c652032352e0c0b6372797374616c6c696e650c05636f72616c0c06636f6d6d6f6ea00000909dceda823700000000000000000000000000000000',
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
                key_hex: '5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf',
                key_type: 'Map',
                db_sort_key_hex:
                  'af3ad0a481fa8143b833ab9165998c6d7e28639b5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c',
              partition_kind: 'KeyValue',
              partition_number: 65
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
                    'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c0c206561393063646238303465343431666638626633306336326534356666393966',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c22000120c00103f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'GenericKeyValueStoreEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalKeyValueStore',
              substate_key: {
                key_hex: '5c0c206561393063646238303465343431666638626633306336326534356666393966',
                key_type: 'Map',
                db_sort_key_hex:
                  '1c9f2536de5e322aae3cdd13e1dd3bcd8e51f5905c0c206561393063646238303465343431666638626633306336326534356666393966'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kzx6gec3p0vrq483lr38j72vppzadeynt62keseeprg3lmffzqzsm0',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: '8b4b20d818d91d3884f195ccb3b1e65838cca6b654f11f63b40efeea28d8d226',
                local_type_id: {
                  id: 0,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kzx6gec3p0vrq483lr38j72vppzadeynt62keseeprg3lmffzqzsm0'
              },
              value_full_type_id: {
                schema_hash: '8b4b20d818d91d3884f195ccb3b1e65838cca6b654f11f63b40efeea28d8d226',
                local_type_id: {
                  id: 1,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0100000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kzx6gec3p0vrq483lr38j72vppzadeynt62keseeprg3lmffzqzsm0'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf',
                    simple_rep:
                      '{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}'
                  }
                },
                value: {
                  is_present: true
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultContentsIndexEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf',
                key_type: 'Map',
                db_sort_key_hex:
                  'af3ad0a481fa8143b833ab9165998c6d7e28639b5cc003f309b64620a1ea9948a053483f54d60815f86126235bb627ca33a7779408cfcf'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nrcsvkwss79pp0crvfdlej425eqcy22dzxhy6l6htmt5q5tn3heftc',
              partition_kind: 'Index',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectIndexPartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
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
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 7,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0700000000000000',
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
                      xrd_amount: '2.046110199655',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.6277090861',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.8053210390375',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.0686544917875',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.3938060277375',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.147477315255',
                      validator_index: {
                        index: 4
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
                      xrd_amount: '1.7553687259075',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.6277090861',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.8053210390375',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.0686544917875',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.3938060277375',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.147477315255',
                      validator_index: {
                        index: 4
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
                  amount: '81394.79522892908'
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
                  amount: '81395.95819482407'
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
                  total_supply: '4'
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                id: 2,
                key_type: 'Field',
                db_sort_key_hex: '02'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerFieldTotalSupply',
              entity_address:
                'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '3'
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '13bcc1e1d055e469936948b51d3621e05f8130901231a0847b8ff16eee058759',
                  local_type_id: {
                    id: 5,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0500000000000000',
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
                  amount: '4'
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1nrcsvkwss79pp0crvfdlej425eqcy22dzxhy6l6htmt5q5tn3heftc',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '3'
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
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
                  amount: '10.178156322071695882'
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
                  amount: '9.596673374576695882'
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
          hex: '5c90f8c7691cd53477d291b8d29e4cf2cd2d429aabd13491a7582ce0a64500f9',
          programmatic_json: null
        },
        {
          hex: '5c90f8c3b364d028999b1b49f9073ff075611b46763dbe07ea56b9812dfae9ba',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8675d85a3eabffa976635c49a8d539865c32126616607b94444fb7df210',
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
          name: 'MintNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}',
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
                'internal_vault_tdx_2_1nrcsvkwss79pp0crvfdlej425eqcy22dzxhy6l6htmt5q5tn3heftc'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}',
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
                value: 'ea90cdb804e441ff8bf30c62e45ff99f',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}',
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
                    value: 'Crystalline Coral RadGem {4/25}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'The Common Crystalline material of this Coral RadGem is graded at a quality of 4 out of a possible 25.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: 'crystalline',
                    kind: 'String',
                    field_name: 'material'
                  },
                  {
                    value: 'coral',
                    kind: 'String',
                    field_name: 'color'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'rarity'
                  },
                  {
                    value: '4',
                    kind: 'Decimal',
                    field_name: 'quality'
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
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.16296589499',
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
                value: '0.581482947495',
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
                value: '0.581482947495',
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
          balance_change: '-1.16296589499'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.581482947495'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1cq46e9fpa58a66us5h8eh2v5wz8ysmt7awgy0mq8nazpmu43dnqq9e',
          resource_address:
            'resource_tdx_2_1ntwug8aft5zle35lwnap5q8fnak8w7s7jnc7vlh2xh5ltye9epfx7c',
          added: ['{f309b64620a1ea99-48a053483f54d608-15f86126235bb627-ca33a7779408cfcf}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

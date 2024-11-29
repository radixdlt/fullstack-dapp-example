// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 56618888,
    epoch: 28958,
    round: 1501,
    round_timestamp: '2024-08-23T11:45:39.794Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1vdh4yc7lt0t0t6gtr3fa5wg908nh8v88pf55fkun5hxs3648yd6qvhl5e5',
    intent_hash: 'txid_tdx_2_1x7gcf5naz95ukjly08cr5ysswtds0yuslv9h7xx7hw6zdt7g5x0srkewc2',
    fee_paid: '1.30731616603',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-08-23T11:45:39.794Z',
    raw_hex:
      '4d22030221022104210707020a1e710000000000000a2071000000000000099d47602a22010120072027bd7c572db15e308f22dca8c909bbee018b98748e52ff433ecba1b5001c421d010108000020221241038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005db2e25335c21c3d004b27367162e7a2518c2641e4ac18c8d5a7505009d985000064a7b3b6e00d00000000000000000000000000000000410380005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80c046d696e742101850000f4448291634500000000000000000000000000000000410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c087769746864726177210280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c68500009814440dab2108000000000000000000000000000000000280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000b89d0d6955a001000000000000000000000000000000000280005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d885000064a7b3b6e00d00000000000000000000000000000000000280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000b89d0d6955a001000000000000000000000000000000000280005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d885000064a7b3b6e00d00000000000000000000000000000000000280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000b89d0d6955a001000000000000000000000000000000000280005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d885000064a7b3b6e00d00000000000000000000000000000000000280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000b89d0d6955a001000000000000000000000000000000000280005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d885000064a7b3b6e00d00000000000000000000000000000000000280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000b89d0d6955a001000000000000000000000000000000000280005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d885000064a7b3b6e00d00000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005db2e25335c21c3d004b27367162e7a2518c2641e4ac18c8d5a7505009d985000064a7b3b6e00d0000000000000000000000000000000041038000c0869068b42fc4c20e0e91cf443ae9117e208dfa818dd351ccf9e85dc7770c156465706f7369745f75736572735f726577617264732101202105030c2066373739353366396433626234623963626236623264666534336261646263630c0e5472616e73666572546f6b656e732081020000000001000000030c2062323461366565383331303034313230393264353130666163376532383263310c0e5472616e73666572546f6b656e732081020200000003000000030c2038366330616233663835306534646234396365663038346535333430343733330c0e5472616e73666572546f6b656e732081020400000005000000030c2064366531626666333964323934303039613265643464303439346334313666610c0e5472616e73666572546f6b656e732081020600000007000000030c2035313134383532616531376334353266386636633565646433666664646139380c0e5472616e73666572546f6b656e732081020800000009000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf2101200740399ef56a25938898667eee7e37c67558e8740a71e51e9ce055085761f0adf8f17f787628fd90dd378b2e40629ab3b92016c67abaa74fa64ca174d517730b080201022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b321012007405e77c5a86a60df75c57b3ed407723c2c54e0a0a832a707bec7da4c6fc51061ff4c523e82275d400d150905121dd5d5c8aa8831caabb42acb65fb22a4e2d4a4082201012101200740f061d8613ecf92c7683129cc78928f0460e31af2f91bf9758f9746b8bfed9cb55aebbe9585a8bffe3ab7143e66c0d6454b5a92b12c070d5a23177d549f6af509',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.47883986603',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.739695',
        xrd_total_finalization_cost: '0.0887813',
        execution_cost_units_consumed: 14793900,
        finalization_cost_units_consumed: 1775626
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
        to_burn: '0.653658083015',
        to_proposer: '0.3268290415075',
        to_validator_set: '0.3268290415075',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.30731616603',
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
                  intent_hash: '379184d27d1169cb4be479f03a121072db079390fb0b7f18debbb426afc8a19f',
                  intent_hash_bech32m:
                    'txid_tdx_2_1x7gcf5naz95ukjly08cr5ysswtds0yuslv9h7xx7hw6zdt7g5x0srkewc2'
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
                key_hex: '5c200720379184d27d1169cb4be479f03a121072db079390fb0b7f18debbb426afc8a19f',
                key_type: 'Map',
                db_sort_key_hex:
                  '7261934e72686b7fd503cbfedf485e00dab022da5c200720379184d27d1169cb4be479f03a121072db079390fb0b7f18debbb426afc8a19f'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 163
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
                  key_data: {
                    hex: '5c21020c2066373739353366396433626234623963626236623264666534336261646263630c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000b89d0d6955a0010000000000000000000000000000005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80001a0000064a7b3b6e00d00000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                      }
                    ]
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
                key_hex:
                  '5c21020c2066373739353366396433626234623963626236623264666534336261646263630c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  '1ace3a0718d3feeb2472e2e85cf40b3b60c4e32a5c21020c2066373739353366396433626234623963626236623264666534336261646263630c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 24,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              },
              value_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 8,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2064366531626666333964323934303039613265643464303439346334313666610c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000b89d0d6955a0010000000000000000000000000000005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80001a0000064a7b3b6e00d00000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                      }
                    ]
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
                key_hex:
                  '5c21020c2064366531626666333964323934303039613265643464303439346334313666610c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  '3593171794d0db7b1c497ea9d2b86ba08423343f5c21020c2064366531626666333964323934303039613265643464303439346334313666610c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 24,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              },
              value_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 8,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2062323461366565383331303034313230393264353130666163376532383263310c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000b89d0d6955a0010000000000000000000000000000005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80001a0000064a7b3b6e00d00000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                      }
                    ]
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
                key_hex:
                  '5c21020c2062323461366565383331303034313230393264353130666163376532383263310c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  '75515398bf505d9b89c168cde8d33871e456662f5c21020c2062323461366565383331303034313230393264353130666163376532383263310c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 24,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              },
              value_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 8,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2038366330616233663835306534646234396365663038346535333430343733330c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000b89d0d6955a0010000000000000000000000000000005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80001a0000064a7b3b6e00d00000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                      }
                    ]
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
                key_hex:
                  '5c21020c2038366330616233663835306534646234396365663038346535333430343733330c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  'acdcb1446db60220b26111e4881a1d3d616c260f5c21020c2038366330616233663835306534646234396365663038346535333430343733330c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 24,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              },
              value_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 8,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2035313134383532616531376334353266386636633565646433666664646139380c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000b89d0d6955a0010000000000000000000000000000005dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d80001a0000064a7b3b6e00d00000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                      }
                    ]
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
                key_hex:
                  '5c21020c2035313134383532616531376334353266386636633565646433666664646139380c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  'cc821f79774733334bc6cbc83b5ba86b9f8adf2e5c21020c2035313134383532616531376334353266386636633565646433666664646139380c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 24,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
              },
              value_full_type_id: {
                schema_hash: 'bc0f226d48460328aea4aadaf8907c59e2c6ddadfc17e1fa63f5fe83b977dff0',
                local_type_id: {
                  id: 8,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0800000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p4cytmfhgvs0ue2lkd0r4pkamq446wtmvm2u9rxmnw57ls4hzg8vr9'
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
                      xrd_amount: '1.0883290100675',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '22.45624997305',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '3.2435335434175',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.433073886835',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.35309388226',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '5.0765466729575',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.399816475725',
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
                      xrd_amount: '1.0883290100675',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '22.1294209315425',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '3.2435335434175',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.433073886835',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.35309388226',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '5.0765466729575',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.399816475725',
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
                  total_supply: '2218'
                },
                is_locked: false,
                substate_type: 'FungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalFungibleResource',
              substate_key: {
                id: 1,
                key_type: 'Field',
                db_sort_key_hex: '01'
              },
              entity_module: 'Main',
              substate_type: 'FungibleResourceManagerFieldTotalSupply',
              entity_address:
                'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '2213'
                },
                is_locked: false,
                substate_type: 'FungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'ba27cc155884d6e1aa7a41346fd8c11f18cc99775653caef1fd3455d625fd147',
                  local_type_id: {
                    id: 1,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0100000000000000',
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
                  amount: '27495.70302095138'
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
                  amount: '27647.01033711741'
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
                  amount: '780'
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
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '630'
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
                  amount: '26'
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
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '21'
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
                  amount: '68.101286892880173348'
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
                  amount: '67.447628809865173348'
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
          hex: '5c90f80a03c1521a5588f1f6499ee38aa834ffec12c7e037868ba5bd98f250f7',
          programmatic_json: null
        },
        {
          hex: '5c90f88f81edef50c4086dbebf21e703b30e6c0d8356ae0c5274afea21504cc4',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f880fcb52ad7935835a710bbcc99a20c29be2823e4a30ec2abaff61890e1',
          programmatic_json: null
        },
        {
          hex: '5c90f8dcec7d3a990a0cfc923f4de956caa7c41839986d3a5f248fee6fcf0f39',
          programmatic_json: null
        },
        {
          hex: '5c90f803d383dc41ff2fcee0e36fdaa48bc45c4289a74f99586e9d6db7d36b94',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8aa0bf30b71b5f7a02a22cb3ee39049ffb60c49cbb1d9f4204c74caa845',
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
          name: 'MintFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '5',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent'
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
                'internal_vault_tdx_2_1tphqj5tz5cnrlt0sdns4xgx0vfnxytwjcq58ghpf6xteuqn6499059'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '150',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
                'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: '0',
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '150',
                kind: 'Decimal'
              }
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
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '30',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '30',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '30',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '30',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trd0taauaqqre6g42elal3vme3f6y2ywxrze9w093n5yw5y3swwp58'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '30',
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
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpqu7ut5te5tqtt0ct5e07twdjt9a33hdf29hnhuu2chtezu8h2lgj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'RewardDepositedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.questRewardsV2
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
                        value: 'f77953f9d3bb4b9cbb6b2dfe43badbcc',
                        kind: 'String',
                        type_name: 'UserId',
                        field_name: 'user_id'
                      },
                      {
                        value: 'TransferTokens',
                        kind: 'String',
                        type_name: 'QuestId',
                        field_name: 'quest_id'
                      },
                      {
                        element_kind: 'Tuple',
                        elements: [
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '30',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          },
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '1',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          }
                        ],
                        kind: 'Array',
                        field_name: 'rewards'
                      }
                    ],
                    kind: 'Tuple',
                    type_name: 'UserQuestReward'
                  },
                  {
                    fields: [
                      {
                        value: 'b24a6ee83100412092d510fac7e282c1',
                        kind: 'String',
                        type_name: 'UserId',
                        field_name: 'user_id'
                      },
                      {
                        value: 'TransferTokens',
                        kind: 'String',
                        type_name: 'QuestId',
                        field_name: 'quest_id'
                      },
                      {
                        element_kind: 'Tuple',
                        elements: [
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '30',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          },
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '1',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          }
                        ],
                        kind: 'Array',
                        field_name: 'rewards'
                      }
                    ],
                    kind: 'Tuple',
                    type_name: 'UserQuestReward'
                  },
                  {
                    fields: [
                      {
                        value: '86c0ab3f850e4db49cef084e53404733',
                        kind: 'String',
                        type_name: 'UserId',
                        field_name: 'user_id'
                      },
                      {
                        value: 'TransferTokens',
                        kind: 'String',
                        type_name: 'QuestId',
                        field_name: 'quest_id'
                      },
                      {
                        element_kind: 'Tuple',
                        elements: [
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '30',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          },
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '1',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          }
                        ],
                        kind: 'Array',
                        field_name: 'rewards'
                      }
                    ],
                    kind: 'Tuple',
                    type_name: 'UserQuestReward'
                  },
                  {
                    fields: [
                      {
                        value: 'd6e1bff39d294009a2ed4d0494c416fa',
                        kind: 'String',
                        type_name: 'UserId',
                        field_name: 'user_id'
                      },
                      {
                        value: 'TransferTokens',
                        kind: 'String',
                        type_name: 'QuestId',
                        field_name: 'quest_id'
                      },
                      {
                        element_kind: 'Tuple',
                        elements: [
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '30',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          },
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '1',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          }
                        ],
                        kind: 'Array',
                        field_name: 'rewards'
                      }
                    ],
                    kind: 'Tuple',
                    type_name: 'UserQuestReward'
                  },
                  {
                    fields: [
                      {
                        value: '5114852ae17c452f8f6c5edd3ffdda98',
                        kind: 'String',
                        type_name: 'UserId',
                        field_name: 'user_id'
                      },
                      {
                        value: 'TransferTokens',
                        kind: 'String',
                        type_name: 'QuestId',
                        field_name: 'quest_id'
                      },
                      {
                        element_kind: 'Tuple',
                        elements: [
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '30',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          },
                          {
                            fields: [
                              {
                                value:
                                  'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                                kind: 'Reference',
                                type_name: 'ResourceAddress',
                                field_name: 'resource_address'
                              },
                              {
                                variant_id: '0',
                                variant_name: 'FungibleAmount',
                                fields: [
                                  {
                                    value: '1',
                                    kind: 'Decimal'
                                  }
                                ],
                                kind: 'Enum',
                                type_name: 'RewardAmount',
                                field_name: 'reward_amount'
                              }
                            ],
                            kind: 'Tuple',
                            type_name: 'RewardInfo'
                          }
                        ],
                        kind: 'Array',
                        field_name: 'rewards'
                      }
                    ],
                    kind: 'Tuple',
                    type_name: 'UserQuestReward'
                  }
                ],
                kind: 'Array'
              }
            ],
            kind: 'Tuple',
            type_name: 'RewardDepositedEvent'
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
                value: '1.30731616603',
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
                value: '0.653658083015',
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
                value: '0.653658083015',
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
          balance_change: '-1.30731616603'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.653658083015'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-150'
        },
        {
          entity_address: 'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '150'
        },
        {
          entity_address: 'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr',
          resource_address:
            'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
          balance_change: '5'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

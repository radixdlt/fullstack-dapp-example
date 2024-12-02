// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 60034845,
    epoch: 30944,
    round: 1743,
    round_timestamp: '2024-08-30T09:16:16.689Z',
    payload_hash:
      'notarizedtransaction_tdx_2_13xaf2arsnh6cmph9sew5ls8tvn64g9flk5fu8fs9gj6lat565rvsrsvstt',
    intent_hash: 'txid_tdx_2_1e2p3ktzkxugqd2xy8e62a258r0n24np30nalpk5edr64nw69gywq47gsaq',
    fee_paid: '1.67658688336',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
      'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
      'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q'
    ],
    confirmed_at: '2024-08-30T09:16:16.689Z',
    raw_hex:
      '4d22030221022104210707020ae0780000000000000aea780000000000000967ba9c0e220101200720b82602890e47b886497d875bcb63d677622189ec09399a705c7903b58fd99ffe01000800002022074103800051956233afde5c3875675dc290b35bbf234504a75684d617e02735ae8bb90c086c6f636b5f66656521018540e33043dc9e811b000000000000000000000000000000004103800051956233afde5c3875675dc290b35bbf234504a75684d617e02735ae8bb90c1677697468647261775f6e6f6e5f66756e6769626c6573210280009aa48be2a53e02740db9875a76b740b834980f429c11f96dfa1e81113b31208702032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f360336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa020180009aa48be2a53e02740db9875a76b740b834980f429c11f96dfa1e81113b314103800051956233afde5c3875675dc290b35bbf234504a75684d617e02735ae8bb90c1677697468647261775f6e6f6e5f66756e6769626c6573210280009a4d55573bb97e27319af8232bab5a2596911b4177dd21ce86ffe99a136120870103ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3020180009a4d55573bb97e27319af8232bab5a2596911b4177dd21ce86ffe99a136141038000c06ad71ea03627874f08a6ed6bad58021457eac1229c6f68dd3f94f0988a0c0f6372656174655f7261646d6f7270682103810000000081010000000c6368747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f3f73686170653d53303031267368616465723d52454626636f6c6f72313d4c474e26636f6c6f72323d4d474e4103800051956233afde5c3875675dc290b35bbf234504a75684d617e02735ae8bb90c0d6465706f7369745f626174636821018300202000220000202201010220072066fa38634eac20330682929152ea4a08fcf7f3c6c3d53eaf2207290c2feecbf821012007402dd8bb727e518dbfb591b021a304e2b08d6ee4fe8e3b5831ce0388cd5e21b3be76a739ebb1433cfe4d69bc8cdc80125dee4b9ddcbd42e55f78b59e99141749052201012101200740876213875d748070282af44c0d12212ec547b830459ee1d3cc01416e6a5a7d61445b632e10b9fdbf503a1ee59e083d8cd2a44ecc1c140dec2ecd870a59f23708',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.37689208336',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '1.19141015',
        xrd_total_finalization_cost: '0.10828465',
        execution_cost_units_consumed: 23828203,
        finalization_cost_units_consumed: 2165693
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
        to_burn: '0.83829344168',
        to_proposer: '0.41914672084',
        to_validator_set: '0.41914672084',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.67658688336',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpj5q5mglsxwlezulcscqmc36hckhjgxtvmc068qgpn3k73a5r09pg'
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
                  intent_hash: 'ca831b2c56371006a8c43e74aeaa871be6aacc317cfbf0da9968f559bb45411c',
                  intent_hash_bech32m:
                    'txid_tdx_2_1e2p3ktzkxugqd2xy8e62a258r0n24np30nalpk5edr64nw69gywq47gsaq'
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
                key_hex: '5c200720ca831b2c56371006a8c43e74aeaa871be6aacc317cfbf0da9968f559bb45411c',
                key_type: 'Map',
                db_sort_key_hex:
                  '1e81c23938cf437f6f9e2698e416cd3116c19f3e5c200720ca831b2c56371006a8c43e74aeaa871be6aacc317cfbf0da9968f559bb45411c'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 183
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
                  resource_address:
                    'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalNonFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1nq4pwykpquf67tphfv35f907x6vmdsnlc70e42jk2ccjw02cd822rf'
                  }
                },
                is_locked: false,
                substate_type: 'AccountVaultEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                key_hex: '5c809a0cf0ccb94cdcba98ca95866ab414a35d363d0a58cfc24e2eccf05e454d',
                key_type: 'Map',
                db_sort_key_hex:
                  '023de3c0d19bbceba7f657bf6ae6e2a531a6d6cc5c809a0cf0ccb94cdcba98ca95866ab414a35d363d0a58cfc24e2eccf05e454d'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
              partition_kind: 'KeyValue',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a54510264dbd13e03ea7d6e3112d5f3a88c9bddae66b9569d5de381ba9447a8a',
                  local_type_id: {
                    id: 133,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c2200010785',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a54510264dbd13e03ea7d6e3112d5f3a88c9bddae66b9569d5de381ba9447a8a',
                  local_type_id: {
                    id: 3,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0300000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20'
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
                      '5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7',
                    simple_rep:
                      '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21110c6368747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f3f73686170653d53303031267368616465723d52454626636f6c6f72313d4c474e26636f6c6f72323d4d474e0c424261736963204372797374616c6c696e6520476c616369657220616e6420466f7265737420576869726c706f6f6c2053706972616c205261644d6f727068207b367d0ce90141204372797374616c6c696e6520476c61636965722052616447656d20616e64204372797374616c6c696e6520466f726573742052616447656d207765726520667573656420696e207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c20746f2070726f647563652074686973204372797374616c6c696e6520576869726c706f6f6c2053706972616c205261644d6f7270682e20497473206f766572616c6c207175616c69747920697320726174656420617320426173696320e280932036206f7574206f66206120706f737369626c65203130302ea0000058ec35484453000000000000000000000000000000000c0b6372797374616c6c696e650c10776869726c706f6f6c2073706972616c0c06636f6d6d6f6ea0000064a7b3b6e00d0000000000000000000000000000000001000c07676c61636965720c0b6372797374616c6c696e650c06636f6d6d6f6ea00000909dceda8237000000000000000000000000000000000c06666f726573740c0b6372797374616c6c696e650c06636f6d6d6f6ea0000064a7b3b6e00d00000000000000000000000000000000',
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
                key_hex: '5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7',
                key_type: 'Map',
                db_sort_key_hex:
                  '075c81118cea746d68536074827a87c6de6c18bf5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
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
                  schema_hash: '98515d7e692d06dd46358aea0b7e101d833b59b3b2ef0adb8657198413b6557d',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  details: {
                    type: 'Object',
                    global: false,
                    blueprint_info: {
                      features: [],
                      outer_object:
                        'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
                      blueprint_name: 'NonFungibleVault',
                      package_address:
                        'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes',
                      blueprint_version: '1.0.0',
                      generic_substitutions: []
                    },
                    module_versions: []
                  }
                },
                is_locked: false,
                substate_type: 'TypeInfoModuleFieldTypeInfo'
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
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'internal_vault_tdx_2_1nq4pwykpquf67tphfv35f907x6vmdsnlc70e42jk2ccjw02cd822rf',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo'
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '1'
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
                'internal_vault_tdx_2_1nq4pwykpquf67tphfv35f907x6vmdsnlc70e42jk2ccjw02cd822rf',
              partition_kind: 'Field',
              partition_number: 64
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
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7',
                    simple_rep:
                      '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}'
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
                key_hex: '5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7',
                key_type: 'Map',
                db_sort_key_hex:
                  '075c81118cea746d68536074827a87c6de6c18bf5cc0033f712ae39fddf273d3e897d246ff15cdf7d981589f578222f18df3534cf964b7'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nq4pwykpquf67tphfv35f907x6vmdsnlc70e42jk2ccjw02cd822rf',
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
        deleted_substates: [
          {
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36',
                key_type: 'Map',
                db_sort_key_hex:
                  '5a1470b1c59fdd11cecd49e2d9adec36113b358c5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nr9w8gqpn9vvvtmnm9z9zmhjepjkf5yls6lzlkwex2tnrrf7slwlz9',
              partition_kind: 'Index',
              partition_number: 65
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36',
                    simple_rep:
                      '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}'
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
          },
          {
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa',
                key_type: 'Map',
                db_sort_key_hex:
                  '9796af8e03b17b7e1b291bb0ee0922ff0b9380be5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nr9w8gqpn9vvvtmnm9z9zmhjepjkf5yls6lzlkwex2tnrrf7slwlz9',
              partition_kind: 'Index',
              partition_number: 65
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa',
                    simple_rep:
                      '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}'
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
          },
          {
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3',
                key_type: 'Map',
                db_sort_key_hex:
                  'bcc88cecd26b85ceca062da0a88bbc0a431702645cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nrzmp0jxy705t8tg92lfhwvlakphphzvf8qfcrjzvkz707ut5xw30l',
              partition_kind: 'Index',
              partition_number: 65
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3',
                    simple_rep:
                      '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}'
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
                      xrd_amount: '1.851937701505',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.4453582623825',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.1130764835175',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.5316881445',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.3724081245025',
                      validator_index: {
                        index: 3
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
                      xrd_amount: '1.851937701505',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.4453582623825',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.1130764835175',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.11254142366',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.3724081245025',
                      validator_index: {
                        index: 3
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
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36',
                    simple_rep:
                      '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}'
                  }
                },
                value: null,
                is_locked: true,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36',
                key_type: 'Map',
                db_sort_key_hex:
                  '5a1470b1c59fdd11cecd49e2d9adec36113b358c5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
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
                      '5cc0032a165b9683fbadeae692fdba3462233c942edaf38aed2d6b1cb25d32ba676f36',
                    simple_rep:
                      '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c5268747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f72616467656d3f636f6c6f723d4d474e267368616465723d5245460c1e4372797374616c6c696e6520476c61636965722052616447656d207b347d0c6854686520436f6d6d6f6e204372797374616c6c696e65206d6174657269616c206f66207468697320476c61636965722052616447656d206973206772616465642061742061207175616c697479206f662034206f7574206f66206120706f737369626c652032352e0c0b6372797374616c6c696e650c07676c61636965720c06636f6d6d6f6ea00000909dceda823700000000000000000000000000000000',
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
                    'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d'
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
                      '5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa',
                    simple_rep:
                      '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}'
                  }
                },
                value: null,
                is_locked: true,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa',
                key_type: 'Map',
                db_sort_key_hex:
                  '9796af8e03b17b7e1b291bb0ee0922ff0b9380be5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
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
                      '5cc00336cd21ebfbcf3cc32f444d36b462f641842d35a9ca0f4deb79d1174b911823aa',
                    simple_rep:
                      '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c5268747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f72616467656d3f636f6c6f723d4c474e267368616465723d5245460c1d4372797374616c6c696e6520466f726573742052616447656d207b317d0c6754686520436f6d6d6f6e204372797374616c6c696e65206d6174657269616c206f66207468697320466f726573742052616447656d206973206772616465642061742061207175616c697479206f662031206f7574206f66206120706f737369626c652032352e0c0b6372797374616c6c696e650c06666f726573740c06636f6d6d6f6ea0000064a7b3b6e00d00000000000000000000000000000000',
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
                    'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '2227'
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
                'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '2229'
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
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3',
                    simple_rep:
                      '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}'
                  }
                },
                value: null,
                is_locked: true,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3',
                key_type: 'Map',
                db_sort_key_hex:
                  'bcc88cecd26b85ceca062da0a88bbc0a431702645cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
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
                      '5cc003ac7d7478c1520e38f33854e5dd2f46b5754969ef40b055c4c9ff980eb8436ec3',
                    simple_rep:
                      '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21080c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533030310c19576869726c706f6f6c2053706972616c2043617264207b317d0cb7015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e67207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f662031206f7574206f66206120706f737369626c652035302e0c10776869726c706f6f6c2073706972616c0c267468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c0c06636f6d6d6f6ea0000064a7b3b6e00d000000000000000000000000000000000100',
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
                  schema_hash: '77203e64d3c6146381e4100da7b10ffa9afe7cc39fb75c5827d74a9085e3ad2a',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '2274'
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
                'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '2275'
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
                  amount: '45.38057184246'
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
                'internal_vault_tdx_2_1tpj5q5mglsxwlezulcscqmc36hckhjgxtvmc068qgpn3k73a5r09pg',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '47.05715872582'
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
                  amount: '18'
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
                'internal_vault_tdx_2_1nr9w8gqpn9vvvtmnm9z9zmhjepjkf5yls6lzlkwex2tnrrf7slwlz9',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '20'
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
                  amount: '5'
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
                'internal_vault_tdx_2_1nrzmp0jxy705t8tg92lfhwvlakphphzvf8qfcrjzvkz707ut5xw30l',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '6'
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
                  total_supply: '47'
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
                'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '46'
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
                  amount: '10.628937432971125496'
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
                  amount: '9.790643991291125496'
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
          hex: '5c90f89c9db5711af43a7250ab504c3d7ce7df74f965caa2e3a9bb11e007c5d5',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f89530eb76e53ca5acc912bd6eb9ae190e4249aff06786d34e73399f5917',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f810050ffc0004c53f34553568217850b6018158d087d6b6c20887e34f85',
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
                'internal_vault_tdx_2_1tpj5q5mglsxwlezulcscqmc36hckhjgxtvmc068qgpn3k73a5r09pg'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.982039979877',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
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
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nr9w8gqpn9vvvtmnm9z9zmhjepjkf5yls6lzlkwex2tnrrf7slwlz9'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}',
                    kind: 'NonFungibleLocalId'
                  },
                  {
                    value: '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
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
                'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: '1',
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}',
                    kind: 'NonFungibleLocalId'
                  },
                  {
                    value: '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'WithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nrzmp0jxy705t8tg92lfhwvlakphphzvf8qfcrjzvkz707ut5xw30l'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
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
                'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: '1',
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'BurnNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnNonFungibleResourceEvent'
          }
        },
        {
          name: 'BurnNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnNonFungibleResourceEvent'
          }
        },
        {
          name: 'BurnNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnNonFungibleResourceEvent'
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
                'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}',
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
          name: 'RadmorphCreatedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cp4dw84qxcncwncg5mkkht2cqg2906kpy2wx76xa8720pxy2js0ggh'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}',
                kind: 'NonFungibleLocalId',
                field_name: 'radmorph_local_id'
              },
              {
                fields: [
                  {
                    value:
                      'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/?shape=S001&shader=REF&color1=LGN&color2=MGN',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Basic Crystalline Glacier and Forest Whirlpool Spiral RadMorph {6}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'A Crystalline Glacier RadGem and Crystalline Forest RadGem were fused in the sinking gyre of a whirlpool spiral to produce this Crystalline Whirlpool Spiral RadMorph. Its overall quality is rated as Basic – 6 out of a possible 100.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: '6',
                    kind: 'Decimal',
                    field_name: 'quality'
                  },
                  {
                    value: 'crystalline',
                    kind: 'String',
                    field_name: 'material'
                  },
                  {
                    value: 'whirlpool spiral',
                    kind: 'String',
                    field_name: 'card_type'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'card_rarity'
                  },
                  {
                    value: '1',
                    kind: 'Decimal',
                    field_name: 'card_quality'
                  },
                  {
                    value: false,
                    kind: 'Bool',
                    field_name: 'card_limited_edition'
                  },
                  {
                    value: 'glacier',
                    kind: 'String',
                    field_name: 'radgem_1_color'
                  },
                  {
                    value: 'crystalline',
                    kind: 'String',
                    field_name: 'radgem_1_material'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'radgem_1_rarity'
                  },
                  {
                    value: '4',
                    kind: 'Decimal',
                    field_name: 'radgem_1_quality'
                  },
                  {
                    value: 'forest',
                    kind: 'String',
                    field_name: 'radgem_2_color'
                  },
                  {
                    value: 'crystalline',
                    kind: 'String',
                    field_name: 'radgem_2_material'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'radgem_2_rarity'
                  },
                  {
                    value: '1',
                    kind: 'Decimal',
                    field_name: 'radgem_2_quality'
                  }
                ],
                kind: 'Tuple',
                type_name: 'RadmorphData',
                field_name: 'radmorph_data'
              }
            ],
            kind: 'Tuple',
            type_name: 'RadmorphCreatedEvent'
          }
        },
        {
          name: 'VaultCreationEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '982a1712c10713af2c374b234495fe3699b6c27fc79f9aaa565631273d58',
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
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nq4pwykpquf67tphfv35f907x6vmdsnlc70e42jk2ccjw02cd822rf'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}',
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
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: '1',
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array'
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
                'internal_vault_tdx_2_1tpj5q5mglsxwlezulcscqmc36hckhjgxtvmc068qgpn3k73a5r09pg'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.67658688336',
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
                value: '0.83829344168',
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
                value: '0.83829344168',
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
    manifest_classes: ['General'],
    balance_changes: {
      fungible_fee_balance_changes: [
        {
          type: 'FeePayment',
          entity_address: 'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.67658688336'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.83829344168'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
          resource_address:
            'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
          added: [],
          removed: [
            '{2a165b9683fbadea-e692fdba3462233c-942edaf38aed2d6b-1cb25d32ba676f36}',
            '{36cd21ebfbcf3cc3-2f444d36b462f641-842d35a9ca0f4deb-79d1174b911823aa}'
          ]
        },
        {
          entity_address: 'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
          resource_address:
            'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
          added: [],
          removed: ['{ac7d7478c1520e38-f33854e5dd2f46b5-754969ef40b055c4-c9ff980eb8436ec3}']
        },
        {
          entity_address: 'account_tdx_2_12x2kyva0mewrsat8thpfpv6mhu352p9826zdv9lqyu66azaev7z9w0',
          resource_address:
            'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
          added: ['{3f712ae39fddf273-d3e897d246ff15cd-f7d981589f578222-f18df3534cf964b7}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

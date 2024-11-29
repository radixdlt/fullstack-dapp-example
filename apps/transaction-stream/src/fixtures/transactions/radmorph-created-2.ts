// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 65227408,
    epoch: 33923,
    round: 694,
    round_timestamp: '2024-09-09T17:30:37.572Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1y9yezmqe0wky9lu0hjpttjlm0lcayn9z5erpadhtpqwl8kvt056qkkuwd9',
    intent_hash: 'txid_tdx_2_1uegcnk3dnjd65rk38m0rz0mwzkym2f2cee3fjskj3gl0f8v7lvuq8lsvgz',
    fee_paid: '1.67521448934',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
      'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
      'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q'
    ],
    confirmed_at: '2024-09-09T17:30:37.572Z',
    raw_hex:
      '4d22030221022104210707020a83840000000000000a8d840000000000000987aea154220101200720a28c40c1bd933467212fe68e6d03208356290528cfbb4f24a594f65d19253ad90100080000202207410380005133cde9db81fd3fe052dea2d5cce7ce0fffe72a1b5dcc29fae55e1bdecd0c086c6f636b5f66656521018580cc6d9272037c1b00000000000000000000000000000000410380005133cde9db81fd3fe052dea2d5cce7ce0fffe72a1b5dcc29fae55e1bdecd0c1677697468647261775f6e6f6e5f66756e6769626c6573210280009aa48be2a53e02740db9875a76b740b834980f429c11f96dfa1e81113b3120870203461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3020180009aa48be2a53e02740db9875a76b740b834980f429c11f96dfa1e81113b31410380005133cde9db81fd3fe052dea2d5cce7ce0fffe72a1b5dcc29fae55e1bdecd0c1677697468647261775f6e6f6e5f66756e6769626c6573210280009a4d55573bb97e27319af8232bab5a2596911b4177dd21ce86ffe99a136120870103125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d020180009a4d55573bb97e27319af8232bab5a2596911b4177dd21ce86ffe99a136141038000c06ad71ea03627874f08a6ed6bad58021457eac1229c6f68dd3f94f0988a0c0f6372656174655f7261646d6f7270682103810000000081010000000c6368747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f3f73686170653d53303031267368616465723d52454626636f6c6f72313d504e4b26636f6c6f72323d4f524e410380005133cde9db81fd3fe052dea2d5cce7ce0fffe72a1b5dcc29fae55e1bdecd0c0d6465706f7369745f6261746368210183002020002200002022010102200720691d502baf2c056209caba27e24658f9fe068020b8863f7ceab081776f9b37b12101200740bc31db00f94a3b4d904f0edab45658c2b9794b13242844eddaa29fbf3ccf3e53bcc47d0ca65e5821fb23a2defd0b64432369b699cd04fd5eaaa32a9ff37d28062201012101200740bd36d27c32714f472e2c0bc2c039f0a8804137ddc5f2155fa67ebcea8474c3d69477a17c6a6db9bd2f8b9e0289a474aba1fb79e3b4e6b4c27d0f4e14220b1a06',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.37555693934',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '1.19137305',
        xrd_total_finalization_cost: '0.1082845',
        execution_cost_units_consumed: 23827461,
        finalization_cost_units_consumed: 2165690
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
        to_burn: '0.83760724467',
        to_proposer: '0.418803622335',
        to_validator_set: '0.418803622335',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.67521448934',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tp53uyq758ey545gml4x4kw0083ffzw3qckdczzwy36284rjze3rc6'
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
                  intent_hash: 'e65189da2d9c9baa0ed13ede313f6e1589b52558ce629942d28a3ef49d9efb38',
                  intent_hash_bech32m:
                    'txid_tdx_2_1uegcnk3dnjd65rk38m0rz0mwzkym2f2cee3fjskj3gl0f8v7lvuq8lsvgz'
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
                key_hex: '5c200720e65189da2d9c9baa0ed13ede313f6e1589b52558ce629942d28a3ef49d9efb38',
                key_type: 'Map',
                db_sort_key_hex:
                  'ee7920047ebbd5daa193019f16175f938122fb785c200720e65189da2d9c9baa0ed13ede313f6e1589b52558ce629942d28a3ef49d9efb38'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 213
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
                      'internal_vault_tdx_2_1nznsva242rpklzrvlcexwkk6mmalhejs3kljuf3dllqusqr7dw276k'
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
                'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
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
                      '5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8',
                    simple_rep:
                      '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21110c6368747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f3f73686170653d53303031267368616465723d52454626636f6c6f72313d504e4b26636f6c6f72323d4f524e0c404261736963204372797374616c6c696e6520436f72616c20616e6420466c616d6520576869726c706f6f6c2053706972616c205261644d6f727068207b31337d0ce70141204372797374616c6c696e6520436f72616c2052616447656d20616e64204372797374616c6c696e6520466c616d652052616447656d207765726520667573656420696e207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c20746f2070726f647563652074686973204372797374616c6c696e6520576869726c706f6f6c2053706972616c205261644d6f7270682e20497473206f766572616c6c207175616c69747920697320726174656420617320426173696320e28093203133206f7574206f66206120706f737369626c65203130302ea0000014801f4769b4000000000000000000000000000000000c0b6372797374616c6c696e650c10776869726c706f6f6c2073706972616c0c06636f6d6d6f6ea000002cf61a24a2290000000000000000000000000000000001000c05636f72616c0c0b6372797374616c6c696e650c06636f6d6d6f6ea00000f44482916345000000000000000000000000000000000c05666c616d650c0b6372797374616c6c696e650c06636f6d6d6f6ea00000f4448291634500000000000000000000000000000000',
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
                key_hex: '5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8',
                key_type: 'Map',
                db_sort_key_hex:
                  '98ccb77a37bf39a6e0c8c7527baeabfe446e445c5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8'
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
                'internal_vault_tdx_2_1nznsva242rpklzrvlcexwkk6mmalhejs3kljuf3dllqusqr7dw276k',
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
                'internal_vault_tdx_2_1nznsva242rpklzrvlcexwkk6mmalhejs3kljuf3dllqusqr7dw276k',
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
                      '5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8',
                    simple_rep:
                      '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}'
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
                key_hex: '5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8',
                key_type: 'Map',
                db_sort_key_hex:
                  '98ccb77a37bf39a6e0c8c7527baeabfe446e445c5cc00304520df1432e2e8a7b3f1c75eeb773ece7877ad9cfa011ad9964b0bd40ecdfe8'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nznsva242rpklzrvlcexwkk6mmalhejs3kljuf3dllqusqr7dw276k',
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
                key_hex: '5cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3',
                key_type: 'Map',
                db_sort_key_hex:
                  '7df079ba209e14857bdcf6e3d2c04480c3a7f6255cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nqwgudtthe2ymkx4he0uc9f63f5quemn6sn72tklu8mmtak43dtwt9',
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
                      '5cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3',
                    simple_rep:
                      '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}'
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
                key_hex: '5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778',
                key_type: 'Map',
                db_sort_key_hex:
                  'bcfafb4dc59d2f5315a49441130891d344b6493b5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nqwgudtthe2ymkx4he0uc9f63f5quemn6sn72tklu8mmtak43dtwt9',
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
                      '5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778',
                    simple_rep:
                      '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}'
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
                key_hex: '5cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d',
                key_type: 'Map',
                db_sort_key_hex:
                  'cab2adc3b980342e757c74d1dcb91eede39b59585cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nrtlmu4sa32ra8lfv56grvvcylf3fnc3rfpun0zrm5x4zkus0skqlt',
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
                      '5cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d',
                    simple_rep:
                      '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}'
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
                      xrd_amount: '0.196358367255',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.05447361601',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.39378409814',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.5899290741325',
                      validator_index: {
                        index: 0
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
                      xrd_amount: '0.196358367255',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.635669993675',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.39378409814',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.5899290741325',
                      validator_index: {
                        index: 0
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
                      '5cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3',
                    simple_rep:
                      '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}'
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
                key_hex: '5cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3',
                key_type: 'Map',
                db_sort_key_hex:
                  '7df079ba209e14857bdcf6e3d2c04480c3a7f6255cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3'
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
                      '5cc0030f2ed4d774f88b1f3accc82711cdb2a4d398f4c7897d69b824809c1dbc3ae9f3',
                    simple_rep:
                      '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c5268747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f72616467656d3f636f6c6f723d4f524e267368616465723d5245460c1c4372797374616c6c696e6520466c616d652052616447656d207b357d0c6654686520436f6d6d6f6e204372797374616c6c696e65206d6174657269616c206f66207468697320466c616d652052616447656d206973206772616465642061742061207175616c697479206f662035206f7574206f66206120706f737369626c652032352e0c0b6372797374616c6c696e650c05666c616d650c06636f6d6d6f6ea00000f4448291634500000000000000000000000000000000',
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
                      '5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778',
                    simple_rep:
                      '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}'
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
                key_hex: '5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778',
                key_type: 'Map',
                db_sort_key_hex:
                  'bcfafb4dc59d2f5315a49441130891d344b6493b5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778'
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
                      '5cc003461a6b998f610618985252dc1a4ecd6df4979bd3714938833a1b5f247fc8b778',
                    simple_rep:
                      '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c5268747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f72616467656d3f636f6c6f723d504e4b267368616465723d5245460c1c4372797374616c6c696e6520436f72616c2052616447656d207b357d0c6654686520436f6d6d6f6e204372797374616c6c696e65206d6174657269616c206f66207468697320436f72616c2052616447656d206973206772616465642061742061207175616c697479206f662035206f7574206f66206120706f737369626c652032352e0c0b6372797374616c6c696e650c05636f72616c0c06636f6d6d6f6ea00000f4448291634500000000000000000000000000000000',
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
                  total_supply: '2727'
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
                  total_supply: '2729'
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
                      '5cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d',
                    simple_rep:
                      '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}'
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
                key_hex: '5cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d',
                key_type: 'Map',
                db_sort_key_hex:
                  'cab2adc3b980342e757c74d1dcb91eede39b59585cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d'
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
                      '5cc003125b5669d2fb855f7e8896d7d34653f9d745ce74b2291b21b83d401864b71e5d',
                    simple_rep:
                      '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21080c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533030310c19576869726c706f6f6c2053706972616c2043617264207b337d0cb7015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e67207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f662033206f7574206f66206120706f737369626c652035302e0c10776869726c706f6f6c2073706972616c0c267468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c0c06636f6d6d6f6ea000002cf61a24a229000000000000000000000000000000000100',
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
                  total_supply: '2539'
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
                  total_supply: '2540'
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
                  amount: '45.06490369627'
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
                'internal_vault_tdx_2_1tp53uyq758ey545gml4x4kw0083ffzw3qckdczzwy36284rjze3rc6',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '46.74011818561'
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
                'internal_vault_tdx_2_1nqwgudtthe2ymkx4he0uc9f63f5quemn6sn72tklu8mmtak43dtwt9',
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
                  amount: '0'
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
                'internal_vault_tdx_2_1nrtlmu4sa32ra8lfv56grvvcylf3fnc3rfpun0zrm5x4zkus0skqlt',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
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
                  total_supply: '65'
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
                  total_supply: '64'
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
                  amount: '4.469090312152782713'
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
                  amount: '3.631483067482782713'
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
          hex: '5c90f87645112c138e480214b269eeeb5b37fff01ecc4a6ef094bfed6a417447',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8ddcdbf9115dc682de14cf48d4998ff5ca2e37ddcac4edcb89348c72224',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f82a7159b0c5e95c88963620a66d0dc4a671eb6b9b828a67fc117dfd9ff4',
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
                'internal_vault_tdx_2_1tp53uyq758ey545gml4x4kw0083ffzw3qckdczzwy36284rjze3rc6'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.980461726754',
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
                'internal_vault_tdx_2_1nqwgudtthe2ymkx4he0uc9f63f5quemn6sn72tklu8mmtak43dtwt9'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}',
                    kind: 'NonFungibleLocalId'
                  },
                  {
                    value: '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}',
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
                'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h'
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
                    value: '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}',
                    kind: 'NonFungibleLocalId'
                  },
                  {
                    value: '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}',
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
                'internal_vault_tdx_2_1nrtlmu4sa32ra8lfv56grvvcylf3fnc3rfpun0zrm5x4zkus0skqlt'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}',
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
                'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h'
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
                    value: '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}',
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
                    value: '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}',
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
                    value: '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}',
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
                    value: '{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}',
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
                    value: '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}',
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
              entity_address: addresses.resources.radmorphAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}',
                kind: 'NonFungibleLocalId',
                field_name: 'radmorph_local_id'
              },
              {
                fields: [
                  {
                    value:
                      'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/?shape=S001&shader=REF&color1=PNK&color2=ORN',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Basic Crystalline Coral and Flame Whirlpool Spiral RadMorph {13}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'A Crystalline Coral RadGem and Crystalline Flame RadGem were fused in the sinking gyre of a whirlpool spiral to produce this Crystalline Whirlpool Spiral RadMorph. Its overall quality is rated as Basic – 13 out of a possible 100.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: '13',
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
                    value: '3',
                    kind: 'Decimal',
                    field_name: 'card_quality'
                  },
                  {
                    value: false,
                    kind: 'Bool',
                    field_name: 'card_limited_edition'
                  },
                  {
                    value: 'coral',
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
                    value: '5',
                    kind: 'Decimal',
                    field_name: 'radgem_1_quality'
                  },
                  {
                    value: 'flame',
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
                    value: '5',
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
                hex: '98a706755550c36f886cfe32675adadefbfbe6508dbf2e262dffc1c8007e',
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
                'internal_vault_tdx_2_1nznsva242rpklzrvlcexwkk6mmalhejs3kljuf3dllqusqr7dw276k'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}',
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
                'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h'
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
                    value: '{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}',
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
                'internal_vault_tdx_2_1tp53uyq758ey545gml4x4kw0083ffzw3qckdczzwy36284rjze3rc6'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.67521448934',
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
                value: '0.83760724467',
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
                value: '0.83760724467',
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
          entity_address: 'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.67521448934'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.83760724467'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
          resource_address:
            'resource_tdx_2_1n2jghc498cp8grdesad8dd6qhq6fsr6znsgljm06r6q3zwe3vw2s3d',
          added: [],
          removed: [
            '{0f2ed4d774f88b1f-3accc82711cdb2a4-d398f4c7897d69b8-24809c1dbc3ae9f3}',
            '{461a6b998f610618-985252dc1a4ecd6d-f4979bd371493883-3a1b5f247fc8b778}'
          ]
        },
        {
          entity_address: 'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
          resource_address:
            'resource_tdx_2_1nfx424emh9lzwvv6lq3jh266yktfzx6pwlwjrn5xll5e5ympw0f07q',
          added: [],
          removed: ['{125b5669d2fb855f-7e8896d7d34653f9-d745ce74b2291b21-b83d401864b71e5d}']
        },
        {
          entity_address: 'account_tdx_2_12yeum6wms87nlczjm63dtn88ec8llee2rdwuc206u40phhkd0t960h',
          resource_address:
            'resource_tdx_2_1ngx0pn9efnwt4xx2jkrx4dq55dwnv0g2tr8uyn3wenc9u32dpp4mpn',
          added: ['{04520df1432e2e8a-7b3f1c75eeb773ec-e7877ad9cfa011ad-9964b0bd40ecdfe8}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

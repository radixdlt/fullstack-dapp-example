// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 56683529,
    epoch: 28995,
    round: 1215,
    round_timestamp: '2024-08-23T14:49:53.956Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1hfgu09zwenpmzxk4lluvlxhtvzafpeqnrn4mqv8jj4ly3e66aq3qurkje6',
    intent_hash: 'txid_tdx_2_1szkwe5afkgn7lddld056ytlpfqyv363smy4xln27gajwmujkhqnq56k38m',
    fee_paid: '0.61799444919',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr'
    ],
    confirmed_at: '2024-08-23T14:49:53.956Z',
    raw_hex:
      '4d22030221022104210707020a43710000000000000a457100000000000009d1172ef9220101200720e7a139976eeaed5d307361a97bc74d2a9d245207abcaf3ed7a28150c24997376010108000020220541038000518e005cf1b84845a305c2e8be178ddca4e4e351b6abf4d14a77b67c2ca50c086c6f636b5f6665652101850000e8890423c78a0000000000000000000000000000000041038000518e005cf1b84845a305c2e8be178ddca4e4e351b6abf4d14a77b67c2ca50c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009afca03a0eb4adde912e4108f6ab933b98197c0a6a29f052b13a9dfda74420870100203566333639346262353262633430643339376162346530306139613262323131100041038000c0869068b42fc4c20e0e91cf443ae9117e208dfa818dd351ccf9e85dc7770c0c636c61696d5f72657761726421020c0e5472616e73666572546f6b656e73820000000041038000518e005cf1b84845a305c2e8be178ddca4e4e351b6abf4d14a77b67c2ca50c0d6465706f7369745f6261746368210183002020002200002022010102200720e06fdaaa56162750fff8dcfa4f7c20afd6ec2ae22d6e53db24c08ff0cc66ee31210120074017d3eb694ddc2713484aa77985a6f90f777b00607c9b92239bc2b3850b9ddfe35c346e466857c38d7fb9fcff8ec1cfee6c6a2faa4f3a5f9baf1168de5fec490e22010121012007404513f16f8527b903f2c2b08a908934c38d5d693984ee4f326e2db7e6d5c57cb7ec514c38683ef5deba71cf44bfc58e20c168fbc57e89e98e7cceb24dae161501',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.17480849919',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.3809221',
        xrd_total_finalization_cost: '0.06226385',
        execution_cost_units_consumed: 7618442,
        finalization_cost_units_consumed: 1245277
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
        to_burn: '0.308997224595',
        to_proposer: '0.1544986122975',
        to_validator_set: '0.1544986122975',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.61799444919',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqumxs7tjvxxhjuyewnyp7jtl9k2lqmwemzjp68gc845876j5u8zaw'
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
                  intent_hash: '80acecd3a9b227efb5bf6be9a22fe14808c8ea30d92a6fcd5e4764edf256b826',
                  intent_hash_bech32m:
                    'txid_tdx_2_1szkwe5afkgn7lddld056ytlpfqyv363smy4xln27gajwmujkhqnq56k38m'
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
                key_hex: '5c20072080acecd3a9b227efb5bf6be9a22fe14808c8ea30d92a6fcd5e4764edf256b826',
                key_type: 'Map',
                db_sort_key_hex:
                  '74802323d55beda17c56422996c370f9e3c1b0275c20072080acecd3a9b227efb5bf6be9a22fe14808c8ea30d92a6fcd5e4764edf256b826'
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
                  resource_address:
                    'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1tr023vrw4nhsmekjp25mfe4n9ydumgtzy8u3m7q5p7jfwhnskfvks2'
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
                key_hex: '5c805dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d8',
                key_type: 'Map',
                db_sort_key_hex:
                  '48541d0d5e86350ebcbfa07bb328f4d4954dae815c805dbb0c7011fbb32b676ffbaa2be431abb4171aa3cdc9d92ebe5f4f1ca1d8'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x',
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
                value: {
                  details: {
                    type: 'Object',
                    global: false,
                    blueprint_info: {
                      features: [],
                      outer_object:
                        'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                      blueprint_name: 'FungibleVault',
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
              entity_type: 'InternalFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'internal_vault_tdx_2_1tr023vrw4nhsmekjp25mfe4n9ydumgtzy8u3m7q5p7jfwhnskfvks2',
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
                'internal_vault_tdx_2_1tr023vrw4nhsmekjp25mfe4n9ydumgtzy8u3m7q5p7jfwhnskfvks2',
              partition_kind: 'Field',
              partition_number: 64
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
                      xrd_amount: '3.284372080125',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.12124708777',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.1164797180675',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.32987388789',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '2.786250678205',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.345758262185',
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
                      xrd_amount: '3.284372080125',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.12124708777',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.1164797180675',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.32987388789',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '2.6317520659075',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.345758262185',
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
                value: {
                  amount: '10029.11546123366'
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
                'internal_vault_tdx_2_1tqumxs7tjvxxhjuyewnyp7jtl9k2lqmwemzjp68gc845876j5u8zaw',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '9999.73345568285'
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
                  key_data: {
                    hex: '5c21020c2035663336393462623532626334306433393761623465303061396132623231310c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220100',
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
                key_hex:
                  '5c21020c2035663336393462623532626334306433393761623465303061396132623231310c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  'e56be3ca3ea667ec4a000bf41ec123007c08fec15c21020c2035663336393462623532626334306433393761623465303061396132623231310c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1krtpffxhu9pcr6zprqyseyvg4t4aakv3jgyy4tuggpna32gy7085gy',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2035663336393462623532626334306433393761623465303061396132623231310c0e5472616e73666572546f6b656e73',
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
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '82'
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
                  amount: '83'
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
                  amount: '2460'
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
                  amount: '2490'
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
                  amount: '19.967963430152750362'
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
                  amount: '19.658966205557750362'
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
          hex: '5c90f885508c513acf0e3a76dc19515a7ab7686c2d36484ac408a289d649fb92',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c209002f8a4af92a9779cb0613779795756ae705f87f7277d2fb5ddc418c985b91cf85320a7e5bd4177b2c44ce225f98525febfdff93cf4f9f43b217933c414',
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
                'internal_vault_tdx_2_1tqumxs7tjvxxhjuyewnyp7jtl9k2lqmwemzjp68gc845876j5u8zaw'
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
          name: 'RewardClaimedEvent',
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
                value: '5f3694bb52bc40d397ab4e00a9a2b211',
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
                  },
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
            type_name: 'WithdrawEvent'
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
                'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '58dea8b06eacef0de6d20aa9b4e6b3291bcda16221f91df8140fa4975e70',
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
                'internal_vault_tdx_2_1tr023vrw4nhsmekjp25mfe4n9ydumgtzy8u3m7q5p7jfwhnskfvks2'
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
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: '0',
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
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
                'internal_vault_tdx_2_1tqumxs7tjvxxhjuyewnyp7jtl9k2lqmwemzjp68gc845876j5u8zaw'
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
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x'
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
                value: '30',
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
                'internal_vault_tdx_2_1tqumxs7tjvxxhjuyewnyp7jtl9k2lqmwemzjp68gc845876j5u8zaw'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.61799444919',
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
                value: '0.308997224595',
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
                value: '0.308997224595',
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
          entity_address: 'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.61799444919'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.308997224595'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '30'
        },
        {
          entity_address: 'account_tdx_2_12x8qqh83hpyytgc9ct5tu9udmjjwfc63k64lf522w7m8ct99p8wx8x',
          resource_address:
            'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
          balance_change: '1'
        },
        {
          entity_address: 'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr',
          resource_address:
            'resource_tdx_2_1tkascuq3lwejkem0lw4zhep34w6pwx4rehyajt47ta83egwchrw5cj',
          balance_change: '-1'
        },
        {
          entity_address: 'component_tdx_2_1czrfq6959lzvyrswj885gwhfz9lzpr06sxxax5wvl859m3mh9k9rjr',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-30'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

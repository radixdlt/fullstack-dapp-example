// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32894615,
    epoch: 16916,
    round: 1190,
    round_timestamp: '2024-07-12T16:14:50.297Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1x594sermraug3fxeqd7lff7wme8u605wcdrxmjcwd767t6njef4sgezn9r',
    intent_hash: 'txid_tdx_2_1hmx4c9k0zxjav8a8j4ytlcryvuap6tfdflj9t9eg7y49fylw0kyq8u32yq',
    fee_paid: '1.04885200148',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m'
    ],
    confirmed_at: '2024-07-12T16:14:50.297Z',
    raw_hex:
      '4d22030221022104210707020a14420000000000000a164200000000000009d5076edd220101200720b139b24b30f77baa1e5c5ac75d12023c64c13a131ec35ea7b96e0307885838d101010800002022054103800051eff171db85707bf090f9b78bbaddeec67d26e515149ac0dcff4a3a2d610c086c6f636b5f6665652101850000e8890423c78a000000000000000000000000000000004103800051eff171db85707bf090f9b78bbaddeec67d26e515149ac0dcff4a3a2d610c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009a7f1aeee3c47d2aed5ce22973e9a08f802ab2dcaff55e10b3b01a04fee020870100206233306634656536626336353464363739336437303363323931343531336234100041038000c0d248b6640af17ef4a15e469f885eb1199761d34d3372d0425e4cbdece10c0c636c61696d5f72657761726421030c0e5472616e73666572546f6b656e7382000000002200004103800051eff171db85707bf090f9b78bbaddeec67d26e515149ac0dcff4a3a2d610c0d6465706f7369745f626174636821018300202000220000202201010220072059c52f05e03f5d46a7dafa3126cc6f95bb9884c51c5e4f425df8d605cf4280d0210120074007524dd904c5c8e4acb7a80c0b7db4897311740374b9787bac54b4f8668c9ea8d0479f032a366a0a174f3ca693194419f5ee76e3e8196055da8d20960126cc0a220101210120074087717ef799901ce23fc7d53fadbe2ffc419f47f7e0fb5e79e3a7b6457c32736e80614063ebaed32b6102230c3da7314bfb4b50877ac37723e55fdca949099f04',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.17509460148',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.8064912',
        xrd_total_finalization_cost: '0.0672662',
        execution_cost_units_consumed: 16129824,
        finalization_cost_units_consumed: 1345324
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
        to_burn: '0.52442600074',
        to_proposer: '0.26221300037',
        to_validator_set: '0.26221300037',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.04885200148',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpradha8pwm0tjkcvshql8tt27ruhr6k36gl6ypqzwuljzs9065rlg'
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
                  intent_hash: 'becd5c16cf11a5d61fa79548bfe064673a1d2d2d4fe4559728f12a5493ee7d88',
                  intent_hash_bech32m:
                    'txid_tdx_2_1hmx4c9k0zxjav8a8j4ytlcryvuap6tfdflj9t9eg7y49fylw0kyq8u32yq'
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
                key_hex: '5c200720becd5c16cf11a5d61fa79548bfe064673a1d2d2d4fe4559728f12a5493ee7d88',
                key_type: 'Map',
                db_sort_key_hex:
                  '58818d1cf21af261e65da8560478db341a42c2835c200720becd5c16cf11a5d61fa79548bfe064673a1d2d2d4fe4559728f12a5493ee7d88'
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
                  resource_address:
                    'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1trmjlzu6hrqk7zwwx29angrlrwzq34ttynl4yyhc9c57vc40z37gse'
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
                key_hex: '5c805dd42b695478d17bf6e69593f569eb028fd26a16e2522196e9d90b3e746e',
                key_type: 'Map',
                db_sort_key_hex:
                  '1cfe7dd226810d44b8a3dfdcc35c68ed16e0fae45c805dd42b695478d17bf6e69593f569eb028fd26a16e2522196e9d90b3e746e'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8',
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
                        'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
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
                'internal_vault_tdx_2_1trmjlzu6hrqk7zwwx29angrlrwzq34ttynl4yyhc9c57vc40z37gse',
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
                'internal_vault_tdx_2_1trmjlzu6hrqk7zwwx29angrlrwzq34ttynl4yyhc9c57vc40z37gse',
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
                      xrd_amount: '12.126948922455',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '15.333706313135',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '54.42487494376',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '24.914235284635',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '23.0698543937425',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '4.542478642345',
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
                      xrd_amount: '12.126948922455',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '15.071493312765',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '54.42487494376',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '24.914235284635',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '23.0698543937425',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '4.542478642345',
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
                  amount: '10018.67653003137'
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
                'internal_vault_tdx_2_1tpradha8pwm0tjkcvshql8tt27ruhr6k36gl6ypqzwuljzs9065rlg',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '9999.72538203285'
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
                    hex: '5c21020c2062333066346565366263363534643637393364373033633239313435313362340c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000000000000000000000000000000000000000000000005dd42b695478d17bf6e69593f569eb028fd26a16e2522196e9d90b3e746e0001a0000000000000000000000000000000000000000000000000',
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
                          'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn'
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
                  '5c21020c2062333066346565366263363534643637393364373033633239313435313362340c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  '2c88db41363f79b091e54cdba11243b2fd08267a5c21020c2062333066346565366263363534643637393364373033633239313435313362340c0e5472616e73666572546f6b656e73'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kq0hhvdj6c2r6qsn6ss72t4eg7nx06r7czx3shzsv6zlrtm29kw964',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2062333066346565366263363534643637393364373033633239313435313362340c0e5472616e73666572546f6b656e73',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022025da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a00000d01309468e15010000000000000000000000000000005dd42b695478d17bf6e69593f569eb028fd26a16e2522196e9d90b3e746e0001a0000064a7b3b6e00d00000000000000000000000000000000',
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
                          'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn'
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
                schema_hash: '4fedf8c1f81bba7eb4c41b3094d77bfdcc528a483a80da6a5deec90eb8c857a4',
                local_type_id: {
                  id: 0,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kq0hhvdj6c2r6qsn6ss72t4eg7nx06r7czx3shzsv6zlrtm29kw964'
              },
              value_full_type_id: {
                schema_hash: '4fedf8c1f81bba7eb4c41b3094d77bfdcc528a483a80da6a5deec90eb8c857a4',
                local_type_id: {
                  id: 3,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0300000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kq0hhvdj6c2r6qsn6ss72t4eg7nx06r7czx3shzsv6zlrtm29kw964'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '6'
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
                'internal_vault_tdx_2_1tzftgvuxumw3hsv8frc3qq0s4t9pmamjtmwm2ladaqw9ucjagevh65',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '7'
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
                  amount: '120'
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
                'internal_vault_tdx_2_1tpnzt5xuffaa52qrs4l5ctcx3jkn6fn2uk7dyap3cqpv06ptes27p0',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '140'
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
                  amount: '268.82419700089909274'
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
                  amount: '268.29977100015909274'
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
          hex: '5c90f83da92ef87233b00f8d6470abd4f57acc6b36a5178effaf14c702b8cdd9',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c209002f8ad16f5aa3c5d29f02bf6cb3508a14eca7409f5fae6f8c2a53f1443fdb4f85d29a603c5423f19492f5a37efed83de0453d8e060dd504f01833b5a22',
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
                'internal_vault_tdx_2_1tpradha8pwm0tjkcvshql8tt27ruhr6k36gl6ypqzwuljzs9065rlg'
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
              entity_address: addresses.components.questRewards
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'b30f4ee6bc654d6793d703c2914513b4',
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
                        value: addresses.resources.giftBox.Fancy,
                        kind: 'Reference',
                        type_name: 'ResourceAddress',
                        field_name: 'resource_address'
                      },
                      {
                        variant_id: 0,
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
                        variant_id: 0,
                        variant_name: 'FungibleAmount',
                        fields: [
                          {
                            value: '20',
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
                'internal_vault_tdx_2_1tzftgvuxumw3hsv8frc3qq0s4t9pmamjtmwm2ladaqw9ucjagevh65'
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
                'internal_vault_tdx_2_1tpnzt5xuffaa52qrs4l5ctcx3jkn6fn2uk7dyap3cqpv06ptes27p0'
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
                'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '58f72f8b9ab8c16f09ce328bd9a07f1b8408d56b24ff5212f82e29e662af',
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
                'internal_vault_tdx_2_1trmjlzu6hrqk7zwwx29angrlrwzq34ttynl4yyhc9c57vc40z37gse'
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
                'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
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
                'internal_vault_tdx_2_1tpradha8pwm0tjkcvshql8tt27ruhr6k36gl6ypqzwuljzs9065rlg'
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
                'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
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
                'internal_vault_tdx_2_1tpradha8pwm0tjkcvshql8tt27ruhr6k36gl6ypqzwuljzs9065rlg'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.04885200148',
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
                value: '0.52442600074',
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
                value: '0.52442600074',
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
          entity_address: 'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.04885200148'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.52442600074'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '20'
        },
        {
          entity_address: 'account_tdx_2_128hlzuwms4c8huyslxmchwkaamr86fh9z52f4sxula9r5ttpen6hf8',
          resource_address:
            'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
          balance_change: '1'
        },
        {
          entity_address: 'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m',
          resource_address:
            'resource_tdx_2_1th2zk6250rghhahxjkfl260tq28ay6skuffzr9hfmy9nuarwzucpqn',
          balance_change: '-1'
        },
        {
          entity_address: 'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-20'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

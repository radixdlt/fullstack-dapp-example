// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32854713,
    epoch: 16895,
    round: 871,
    round_timestamp: '2024-07-12T14:28:40.759Z',
    payload_hash:
      'notarizedtransaction_tdx_2_19qrprzn78ev3g9nmm34qkndgfn3fshmuqcwv6xcymja9fme3r3tqu635v8',
    intent_hash: 'txid_tdx_2_1uru7lsgp2p33fqjtcqru3t0c7wv28fd45d2375jtqjluysl7842qpsaet7',
    fee_paid: '1.04885025148',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m'
    ],
    confirmed_at: '2024-07-12T14:28:40.759Z',
    raw_hex:
      '4d22030221022104210707020aff410000000000000a0142000000000000092ffcf33222010120072043d7e99aeade8993670519c6d3aa3117c91b09a300d8b9a75489318493f3a87e01010800002022054103800051927cc9b6550179986c50656d524b0b56b2c47ca33c5c54f81ea811e4ea0c086c6f636b5f6665652101850000e8890423c78a000000000000000000000000000000004103800051927cc9b6550179986c50656d524b0b56b2c47ca33c5c54f81ea811e4ea0c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009a7f1aeee3c47d2aed5ce22973e9a08f802ab2dcaff55e10b3b01a04fee020870100206238306262376438356331663432306461666433396637663835363330303033100041038000c0d248b6640af17ef4a15e469f885eb1199761d34d3372d0425e4cbdece10c0c636c61696d5f72657761726421030c0e5472616e73666572546f6b656e7382000000002200004103800051927cc9b6550179986c50656d524b0b56b2c47ca33c5c54f81ea811e4ea0c0d6465706f7369745f62617463682101830020200022000020220101022007205917658b46538b7aa01ad16500c1fc6135bf7b0355e79df0dd27f85c99b4fe0c2101200740da059eee7b924981923fb19186953483efc0cd9903a117c293160b907b5a39e703b5b260e0239103e98fb8fbe566e5b8de01b09ed7322f4c890f64c5f0d7b7092201012101200740088356d27e88e1ad145a8239bdcbfcae2697ce4157a4e0a4090bf5f9cb35fdbe0812201c8b00bbfd892060da51b6aab39f8729af223cdf898877b514a0a7f609',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.17509460148',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.80648945',
        xrd_total_finalization_cost: '0.0672662',
        execution_cost_units_consumed: 16129789,
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
        to_burn: '0.52442512574',
        to_proposer: '0.26221256287',
        to_validator_set: '0.26221256287',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.04885025148',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tplu3p50m75n6vr42cqdw7v8v8hcw95m7w3h6dyvtdae7agv0dg64g'
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
                  intent_hash: 'e0f9efc101506314824bc007c8adf8f398a3a5b5a3551f524b04bfc243fe3d54',
                  intent_hash_bech32m:
                    'txid_tdx_2_1uru7lsgp2p33fqjtcqru3t0c7wv28fd45d2375jtqjluysl7842qpsaet7'
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
                key_hex: '5c200720e0f9efc101506314824bc007c8adf8f398a3a5b5a3551f524b04bfc243fe3d54',
                key_type: 'Map',
                db_sort_key_hex:
                  'a64412b6e01b71b20c48c5a4ee569679b7685ae05c200720e0f9efc101506314824bc007c8adf8f398a3a5b5a3551f524b04bfc243fe3d54'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 233
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
                      'internal_vault_tdx_2_1trh3pjajsrd9n4gh4h2th2wkcyywn2mmmrhgtvghpammn8a29766hq'
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
                'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy',
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
                'internal_vault_tdx_2_1trh3pjajsrd9n4gh4h2th2wkcyywn2mmmrhgtvghpammn8a29766hq',
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
                'internal_vault_tdx_2_1trh3pjajsrd9n4gh4h2th2wkcyywn2mmmrhgtvghpammn8a29766hq',
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
                      xrd_amount: '1.561152365695',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.391540730155',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.77283469317',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '1.349090429965',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.2315513501775',
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
                      xrd_amount: '1.561152365695',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.391540730155',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.77283469317',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '1.086877867095',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.2315513501775',
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
                  amount: '10018.67653178137'
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
                'internal_vault_tdx_2_1tplu3p50m75n6vr42cqdw7v8v8hcw95m7w3h6dyvtdae7agv0dg64g',
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
                    hex: '5c21020c2062383062623764383563316634323064616664333966376638353633303030330c0e5472616e73666572546f6b656e73',
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
                  '5c21020c2062383062623764383563316634323064616664333966376638353633303030330c0e5472616e73666572546f6b656e73',
                key_type: 'Map',
                db_sort_key_hex:
                  'cadd20bba32a7f3474c6e3ee5b51f1bbafb89fdd5c21020c2062383062623764383563316634323064616664333966376638353633303030330c0e5472616e73666572546f6b656e73'
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
                    hex: '5c21020c2062383062623764383563316634323064616664333966376638353633303030330c0e5472616e73666572546f6b656e73',
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
                  amount: '2'
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
                  amount: '3'
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
                  amount: '40'
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
                  amount: '60'
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
                  amount: '8.612339141658467165'
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
                  amount: '8.087914015918467165'
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
          hex: '5c90f8d198ab0db6c7d99a955b8cb4ce0addbaf7cbe3e6fc704310502c720427',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c209002f8b3861964692046dd0a14ef992b4a5410b0970818e66a70b218cccefea9f84daca1d047d070a34380ba2742cfc6e70b942d807e48ac8efab4260ee8',
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
                'internal_vault_tdx_2_1tplu3p50m75n6vr42cqdw7v8v8hcw95m7w3h6dyvtdae7agv0dg64g'
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
              entity_address:
                'component_tdx_2_1crfy3dnyptchaa9pterflzz7kyvewcwnf5eh95zztextmm8pf9wz8m'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'b80bb7d85c1f420dafd39f7f85630003',
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
                hex: '58ef10cbb280da59d517add4bba9d6c108e9ab7bd8ee85b1170f77b99faa',
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
                'internal_vault_tdx_2_1trh3pjajsrd9n4gh4h2th2wkcyywn2mmmrhgtvghpammn8a29766hq'
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
                'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy'
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
                'internal_vault_tdx_2_1tplu3p50m75n6vr42cqdw7v8v8hcw95m7w3h6dyvtdae7agv0dg64g'
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
                'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy'
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
                'internal_vault_tdx_2_1tplu3p50m75n6vr42cqdw7v8v8hcw95m7w3h6dyvtdae7agv0dg64g'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1.04885025148',
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
                value: '0.52442512574',
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
                value: '0.52442512574',
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
          entity_address: 'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.04885025148'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.52442512574'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '20'
        },
        {
          entity_address: 'account_tdx_2_12xf8ejdk25qhnxrv2pjk65jtpdtt93ru5v79c48cr65pre82mdq2xy',
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

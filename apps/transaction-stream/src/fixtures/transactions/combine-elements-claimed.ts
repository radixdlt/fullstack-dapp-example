// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32317246,
    epoch: 16601,
    round: 282,
    round_timestamp: '2024-07-11T13:57:13.413Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1ksjfyegy35xsh9lv2gehjn7lkkmvz2jdnhv9yc3xhnvlccgl5cusj6sv66',
    intent_hash: 'txid_tdx_2_1augxp4pz89jfu5w7jeq08r0dpsudd97djv00j26ax392mn8ul8rqsdhqwd',
    fee_paid: '0.7071559165',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12xena8jgkayrlrv09a5tav0zqamngll90kuexu34jfdc7jjfexhhq7',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg'
    ],
    confirmed_at: '2024-07-11T13:57:13.413Z',
    raw_hex:
      '4d22030221022104210707020ad9400000000000000ae34000000000000009715bed322201012007203fb21e4e2c3fa08b72a2dad79ae93b440076796ad36fbb49b1cd1607ac4a23b101000800002022054103800051b33e9e48b7483f8d8f2f68beb1e20777347fe57db9937235925b8f4a490c086c6f636b5f666565210185001149897ff4d80b000000000000000000000000000000004103800051b33e9e48b7483f8d8f2f68beb1e20777347fe57db9937235925b8f4a490c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009ac42beb0ed47a2886887f6c5f36ccedda8332d13b1fefcff86b658716b620870100206264393332666539643263383436616139353638663531306634626532643533100041038000c0b9458a0e4602506f5506e2de45913f05b37e3cb85302ada2689684a8860c16636f6d62696e655f656c656d656e74735f636c61696d210182000000004103800051b33e9e48b7483f8d8f2f68beb1e20777347fe57db9937235925b8f4a490c0d6465706f7369745f6261746368210183002020002200002022010102200720784e71e219ad04dd93d8dd39bc61c528baaf0f8e397fb331bb9f6cbb93361549210120074009ca909c7793d87cd03ddf0a7c5a1f6b5419366a6d728fd32fd2e6ad5add36a1c0f7dfd9e424b3a02303205fe78eeac37da27973772a44ed394ea215ddadd709220101210120074092705957b354a266dba052ab82ef69b8c2330ffbf3a88a0559b67358b6d016f3ff27c27ed4ff3c41ab033ab54cdc4333ef3db17c4b4cf924d3f73fd6b3924102',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.1478195165',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.50282525',
        xrd_total_finalization_cost: '0.05651115',
        execution_cost_units_consumed: 10056505,
        finalization_cost_units_consumed: 1130223
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
        to_burn: '0.35357795825',
        to_proposer: '0.176788979125',
        to_validator_set: '0.176788979125',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.7071559165',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqvqrmzzwzyenkvczrulnaux5ehzrl7da5puuqad45qts45f5xze7k'
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
                  intent_hash: 'ef1060d42239649e51de9640f38ded0c38d697cd931ef92b5d344aadccfcf9c6',
                  intent_hash_bech32m:
                    'txid_tdx_2_1augxp4pz89jfu5w7jeq08r0dpsudd97djv00j26ax392mn8ul8rqsdhqwd'
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
                key_hex: '5c200720ef1060d42239649e51de9640f38ded0c38d697cd931ef92b5d344aadccfcf9c6',
                key_type: 'Map',
                db_sort_key_hex:
                  '29df37d831d34d02860f7b1a7b8ea8d8677be3d45c200720ef1060d42239649e51de9640f38ded0c38d697cd931ef92b5d344aadccfcf9c6'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 231
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
                    'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalNonFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1nzvnph29xqd7gar8wjmh99gyfvqmg03sev3ak0zgyzvt0tccv3ga47'
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
                key_hex: '5c809a493db6f89256143b212342062afcd1c4a039b5fcd11541d3494514c452',
                key_type: 'Map',
                db_sort_key_hex:
                  'c727830f9100d17a1ff343529a5b4ca29f98306a5c809a493db6f89256143b212342062afcd1c4a039b5fcd11541d3494514c452'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12xena8jgkayrlrv09a5tav0zqamngll90kuexu34jfdc7jjfexhhq7',
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
                        'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
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
                'internal_vault_tdx_2_1nzvnph29xqd7gar8wjmh99gyfvqmg03sev3ak0zgyzvt0tccv3ga47',
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
                'internal_vault_tdx_2_1nzvnph29xqd7gar8wjmh99gyfvqmg03sev3ak0zgyzvt0tccv3ga47',
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
                      '5cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0',
                    simple_rep:
                      '{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}'
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
                key_hex: '5cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0',
                key_type: 'Map',
                db_sort_key_hex:
                  '45519a55ab2c9d44d3fb2c60ec5aee94ca9386925cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nzvnph29xqd7gar8wjmh99gyfvqmg03sev3ak0zgyzvt0tccv3ga47',
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
                key_hex: '5cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0',
                key_type: 'Map',
                db_sort_key_hex:
                  '45519a55ab2c9d44d3fb2c60ec5aee94ca9386925cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1npl742hkf0wz7z63sdtclhl3kemss46t88cnpqgka5angh79tqa00p',
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
                      '5cc003b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0',
                    simple_rep:
                      '{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}'
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
                      xrd_amount: '0.3926967405725',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.2901994555225',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.2525791177725',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.176788979125',
                      validator_index: {
                        index: 2
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
                      xrd_amount: '0.3926967405725',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.2901994555225',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.2525791177725',
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
                  amount: '30.17417069035'
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
                'internal_vault_tdx_2_1tqvqrmzzwzyenkvczrulnaux5ehzrl7da5puuqad45qts45f5xze7k',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '30.88132660685'
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
                    hex: '5c0c206264393332666539643263383436616139353638663531306634626532643533',
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
                key_hex: '5c0c206264393332666539643263383436616139353638663531306634626532643533',
                key_type: 'Map',
                db_sort_key_hex:
                  'e8c374d4b97fc1871a8584e545ca379ddbaf2ea25c0c206264393332666539643263383436616139353638663531306634626532643533'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kq3xxdunjl8phasuj7sjdyrteht37ync9uy2uuaff7lshv6d3u0sak',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c0c206264393332666539643263383436616139353638663531306634626532643533',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c22000120c00103b769730d39baaeab526f7248ed409791b73d31af05ff18aea8160502380c00a0',
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
                  'internal_keyvaluestore_tdx_2_1kq3xxdunjl8phasuj7sjdyrteht37ync9uy2uuaff7lshv6d3u0sak'
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
                  'internal_keyvaluestore_tdx_2_1kq3xxdunjl8phasuj7sjdyrteht37ync9uy2uuaff7lshv6d3u0sak'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '11'
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
                'internal_vault_tdx_2_1npl742hkf0wz7z63sdtclhl3kemss46t88cnpqgka5angh79tqa00p',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '12'
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
                  amount: '2.224528586307606125'
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
                  amount: '1.870950628057606125'
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
          hex: '5c90f82616458180520ebf929126ee707e320e5e28e000d144fe23707195e435',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f85ddbbd7818898a7ec184d0f429e4bbd0a0693048729de0455e5dd5061b',
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
                'internal_vault_tdx_2_1tqvqrmzzwzyenkvczrulnaux5ehzrl7da5puuqad45qts45f5xze7k'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.853700957988',
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
                'internal_vault_tdx_2_1npl742hkf0wz7z63sdtclhl3kemss46t88cnpqgka5angh79tqa00p'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}',
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
          name: 'CombineElementsClaimedEvent',
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
                value: 'bd932fe9d2c846aa9568f510f4be2d53',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'CombineElementsClaimedEvent'
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
                'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '989930dd45301be4746774b77295044b01b43e30cb23db3c482098b7af18',
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
                'internal_vault_tdx_2_1nzvnph29xqd7gar8wjmh99gyfvqmg03sev3ak0zgyzvt0tccv3ga47'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}',
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
                'account_tdx_2_12xena8jgkayrlrv09a5tav0zqamngll90kuexu34jfdc7jjfexhhq7'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}',
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
                'internal_vault_tdx_2_1tqvqrmzzwzyenkvczrulnaux5ehzrl7da5puuqad45qts45f5xze7k'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.7071559165',
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
                value: '0.35357795825',
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
                value: '0.35357795825',
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
          entity_address: 'account_tdx_2_12xena8jgkayrlrv09a5tav0zqamngll90kuexu34jfdc7jjfexhhq7',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.7071559165'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.35357795825'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12xena8jgkayrlrv09a5tav0zqamngll90kuexu34jfdc7jjfexhhq7',
          resource_address:
            'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
          added: ['{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}'],
          removed: []
        },
        {
          entity_address: 'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg',
          resource_address:
            'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
          added: [],
          removed: ['{b769730d39baaeab-526f7248ed409791-b73d31af05ff18ae-a8160502380c00a0}']
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

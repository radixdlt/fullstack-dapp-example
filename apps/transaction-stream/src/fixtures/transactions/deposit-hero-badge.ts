// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 20414991,
    epoch: 10511,
    round: 1083,
    round_timestamp: '2024-06-20T10:29:14.27Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1s3hc9jj234n5sqxfunf2na8n2q4r59urxllcjuvw77pydr7h5ngs9lrxlx',
    intent_hash: 'txid_tdx_2_18kfw8zv95sypxyswx3gasss955h05utc0asv65qqhr7rgqamaheq6y6g3g',
    fee_paid: '0.70296255352',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_12yxpde75024gjtstemmztl2tantmzw9xqc9ajeqa9kzzlxwvan58vq',
      'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'component_tdx_2_1cr0aqcxlna320v2ywzfjatp3nwflrthkwm7m2zmfm0ll9c88y6mcpy'
    ],
    confirmed_at: '2024-06-20T10:29:14.27Z',
    raw_hex:
      '4d22030221022104210707020a0f290000000000000a112900000000000009e7695c7d22010120072052ba430975d43bd39facf9406c5b5b29f16d204b46c151d8e8f4fd96f1ded0f0010108000020220341038000510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc0c086c6f636b5f666565210185000088b116afe3b50200000000000000000000000000000041038000c0dfd060df9f62a7b14470932eac319b93f1aef676fdb50b69dbfff2e0e70c0b636c61696d5f626164676521028000510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc0c20363831643137376566376235343833306164633163356137353731363536333641038000510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc0c0d6465706f7369745f626174636821018300202000220000202201010220072052ba430975d43bd39facf9406c5b5b29f16d204b46c151d8e8f4fd96f1ded0f02101200740575314a5526eb61307aec76f9b1ce6a33bf600ba649197770001a89fb1a7251482fc607fcad5e69542b0145f90c871973a066d860ddfad8136d144057d84160c2201012101200740b6186086aeab43b4f94b94b9303077170f0098604d1e2d0e15cd29e3f3e3854fc64c7869ad67272eeb55d8742b577414110d8a0f1c467f29a3459ed90569ea0a',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.15869140352',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.4927611',
        xrd_total_finalization_cost: '0.05151005',
        execution_cost_units_consumed: 9855222,
        finalization_cost_units_consumed: 1030201
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
        to_burn: '0.35148127676',
        to_proposer: '0.17574063838',
        to_validator_set: '0.17574063838',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.70296255352',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tqvm98ndflx8nqljwjfh06ztwtxglravuz6ukwqaapf9k3t4te4l5r'
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
                  intent_hash: '3d92e38985a40813120e3451d84205a52efa71787f60cd5000b8fc3403bbedf2',
                  intent_hash_bech32m:
                    'txid_tdx_2_18kfw8zv95sypxyswx3gasss955h05utc0asv65qqhr7rgqamaheq6y6g3g'
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
                key_hex: '5c2007203d92e38985a40813120e3451d84205a52efa71787f60cd5000b8fc3403bbedf2',
                key_type: 'Map',
                db_sort_key_hex:
                  'be063850319c6c787bd734ec770c69aabb43d26c5c2007203d92e38985a40813120e3451d84205a52efa71787f60cd5000b8fc3403bbedf2'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 170
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
                    'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalNonFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1nzjcn280lm9a460yns0443lhg0luynyhjkds4xtjt6xp935v4hdm7w'
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
                key_hex: '5c809a2bc38bbe57d55027af003255b49cd99eca1f5ae0a6383b3b8589e938ad',
                key_type: 'Map',
                db_sort_key_hex:
                  'dae500fcac8a00d8b03d4781c45291d0057bdc6d5c809a2bc38bbe57d55027af003255b49cd99eca1f5ae0a6383b3b8589e938ad'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12yxpde75024gjtstemmztl2tantmzw9xqc9ajeqa9kzzlxwvan58vq',
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
                    id_type: 'String',
                    sbor_hex:
                      '5cc000203638316431373765663762353438333061646331633561373537313635363336',
                    simple_rep: '<681d177ef7b54830adc1c5a757165636>'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21030c6668747470733a2f2f6173736574732d676c6f62616c2e776562736974652d66696c65732e636f6d2f3631383936326535663238356662336338373964383263612f3631623866343134643231336664373334396236353462395f69636f6e2d4445582e737667200c000900000000',
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
                key_hex: '5cc000203638316431373765663762353438333061646331633561373537313635363336',
                key_type: 'Map',
                db_sort_key_hex:
                  'a2f8f242ebbfeed7fc47a4db50d6517cd5a85dfa5cc000203638316431373765663762353438333061646331633561373537313635363336'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
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
                  schema_hash: '0765f8d1a0fbf9af6baae2f0e3debc0908edf483d9596be4eb0aac4e09171326',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
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
                        'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
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
                'internal_vault_tdx_2_1nzjcn280lm9a460yns0443lhg0luynyhjkds4xtjt6xp935v4hdm7w',
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
                'internal_vault_tdx_2_1nzjcn280lm9a460yns0443lhg0luynyhjkds4xtjt6xp935v4hdm7w',
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
                    id_type: 'String',
                    sbor_hex:
                      '5cc000203638316431373765663762353438333061646331633561373537313635363336',
                    simple_rep: '<681d177ef7b54830adc1c5a757165636>'
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
                key_hex: '5cc000203638316431373765663762353438333061646331633561373537313635363336',
                key_type: 'Map',
                db_sort_key_hex:
                  'a2f8f242ebbfeed7fc47a4db50d6517cd5a85dfa5cc000203638316431373765663762353438333061646331633561373537313635363336'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nzjcn280lm9a460yns0443lhg0luynyhjkds4xtjt6xp935v4hdm7w',
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
                      xrd_amount: '2.1015802556',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.83833225019',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.81618968595',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.0986094351725',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.0986094351725',
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
                      xrd_amount: '2.1015802556',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.83833225019',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.64044904757',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.0986094351725',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.0986094351725',
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
                  amount: '10009.29703744648'
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
                'internal_vault_tdx_2_1tqvm98ndflx8nqljwjfh06ztwtxglravuz6ukwqaapf9k3t4te4l5r',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '10010'
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
                    hex: '5c80510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc',
                    programmatic_json: null
                  }
                },
                value: null,
                is_locked: false,
                substate_type: 'GenericKeyValueStoreEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalKeyValueStore',
              substate_key: {
                key_hex: '5c80510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc',
                key_type: 'Map',
                db_sort_key_hex:
                  '8eff541fb59ce6462d8e1abcb4992eda7cec74815c80510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kr2yp9qd0v04vt4vlvn5gt68vppflrzt6a0z23kwun9430vmfmapm3',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c80510c16e7d47aaa892e0bcef625fd4becd7b138a6060bd9641d2d842f99cc',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c2100',
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
                schema_hash: '48c0276f495c0c40024dd418eeed7626a004aabd4e1fa639b6a07d1607bb038c',
                local_type_id: {
                  id: 0,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kr2yp9qd0v04vt4vlvn5gt68vppflrzt6a0z23kwun9430vmfmapm3'
              },
              value_full_type_id: {
                schema_hash: '48c0276f495c0c40024dd418eeed7626a004aabd4e1fa639b6a07d1607bb038c',
                local_type_id: {
                  id: 66,
                  kind: 'WellKnown',
                  as_sbor: {
                    hex: '5c2200010742',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kr2yp9qd0v04vt4vlvn5gt68vppflrzt6a0z23kwun9430vmfmapm3'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '19'
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
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '18'
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
                  amount: '7.906642124366820908'
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
                  amount: '7.555160847606820908'
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
          hex: '5c90f8e9145e45b926d0b1fb814ec0bf461cb92ec0cfe4f4e8fd1e862ba29f64',
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
                'internal_vault_tdx_2_1tqvm98ndflx8nqljwjfh06ztwtxglravuz6ukwqaapf9k3t4te4l5r'
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
          name: 'BadgeClaimedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cr0aqcxlna320v2ywzfjatp3nwflrthkwm7m2zmfm0ll9c88y6mcpy'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '681d177ef7b54830adc1c5a757165636',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'BadgeClaimedEvent'
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
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<681d177ef7b54830adc1c5a757165636>',
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
          name: 'VaultCreationEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '98a589a8effecbdae9e49c1f5ac7f743ffc24c97959b0a99725e8c12c68c',
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
                'internal_vault_tdx_2_1nzjcn280lm9a460yns0443lhg0luynyhjkds4xtjt6xp935v4hdm7w'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<681d177ef7b54830adc1c5a757165636>',
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
                'account_tdx_2_12yxpde75024gjtstemmztl2tantmzw9xqc9ajeqa9kzzlxwvan58vq'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: addresses.badges.heroBadgeAddress,
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<681d177ef7b54830adc1c5a757165636>',
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
                'internal_vault_tdx_2_1tqvm98ndflx8nqljwjfh06ztwtxglravuz6ukwqaapf9k3t4te4l5r'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.70296255352',
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
                value: '0.35148127676',
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
                value: '0.35148127676',
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
          entity_address: 'account_tdx_2_12yxpde75024gjtstemmztl2tantmzw9xqc9ajeqa9kzzlxwvan58vq',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.70296255352'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.35148127676'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12yxpde75024gjtstemmztl2tantmzw9xqc9ajeqa9kzzlxwvan58vq',
          resource_address:
            'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
          added: ['<681d177ef7b54830adc1c5a757165636>'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

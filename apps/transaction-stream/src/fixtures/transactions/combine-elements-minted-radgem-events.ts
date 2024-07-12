// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32217822,
    epoch: 16547,
    round: 246,
    round_timestamp: '2024-07-11T09:27:00.908Z',
    payload_hash:
      'notarizedtransaction_tdx_2_16zx4va8cjgun4q7e42whfmq0qtffdcuae3ky0qqennhply33ztvsj053tp',
    intent_hash: 'txid_tdx_2_1y6e4erc68hv2lnyylzvu82kydrjlp3azh2d9a5yrv0gw4yg728qqa290je',
    fee_paid: '1.16124224181',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
      'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-11T09:27:00.908Z',
    raw_hex:
      '4d22030221022104210707020aa3400000000000000aa5400000000000000932f9aa852201012007206c711846e643303cf7be1ddb4ba97fbcec1c0447c3fbe23fa62f7056a651878c010108000020220541038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d0000000000000000000000000000000041038000c0b9458a0e4602506f5506e2de45913f05b37e3cb85302ada2689684a8860c1c636f6d62696e655f656c656d656e74735f6d696e745f72616467656d21040c20646162333236666561643834343736366262643935363962663436303432646585707739a31f375805000000000000000000000000000000008554f652666382fc0a000000000000000000000000000000008570f58f6156a1e60b00000000000000000000000000000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf210120074079662b731ea0b30ab9f5771f3ba06958ba788ba3404c14c53528971207fafe81ca5f5aca017740d7677834801f6d1890705673aa542da398d028150a96918f0801022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b32101200740f41427e8982a06bf91ebdaba621085c2a9804a5f619a6224c403887006c0208fd783daa7f368d66b2cbf71f46276e8b672c47bd7d164d5f568cde8fe584aa401220101210120074098bc439be9d536ccd55b6668ce1c106f0dd4c39f937968c46bcc4d931526b7b3ea1065885d2b25b566a894c189dfe0040e318f2618675194663956283bd08f04',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.17805099181',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.90717505',
        xrd_total_finalization_cost: '0.0760162',
        execution_cost_units_consumed: 18143501,
        finalization_cost_units_consumed: 1520324
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
        to_burn: '0.580621120905',
        to_proposer: '0.2903105604525',
        to_validator_set: '0.2903105604525',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.16124224181',
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
                  intent_hash: '26b35c8f1a3dd8afcc84f899c3aac468e5f0c7a2ba9a5ed08363d0ea911e51c0',
                  intent_hash_bech32m:
                    'txid_tdx_2_1y6e4erc68hv2lnyylzvu82kydrjlp3azh2d9a5yrv0gw4yg728qqa290je'
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
                key_hex: '5c20072026b35c8f1a3dd8afcc84f899c3aac468e5f0c7a2ba9a5ed08363d0ea911e51c0',
                key_type: 'Map',
                db_sort_key_hex:
                  '0b651aa65a9d37698ac7e20ac730392769a644705c20072026b35c8f1a3dd8afcc84f899c3aac468e5f0c7a2ba9a5ed08363d0ea911e51c0'
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
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7',
                    simple_rep:
                      '{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c000c1d4d6574616c6c69632053616e642052616447656d207b31342f3130307d0c615468652052617265204d6574616c6c6963206d6174657269616c206f6620746869732053616e642052616447656d206973206772616465642061742061207175616c697479206f66203134206f7574206f66206120706f737369626c652032352e0c086d6574616c6c69630c0473616e640c0472617265a000007827d3fd49c200000000000000000000000000000000',
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
                key_hex: '5cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7',
                key_type: 'Map',
                db_sort_key_hex:
                  'ac7797969a4fb838eec390fc24a5a0a26ca493d25cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
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
                    'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
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
                    hex: '5c0c206461623332366665616438343437363662626439353639626634363034326465',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c22000120c001032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7',
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
                key_hex: '5c0c206461623332366665616438343437363662626439353639626634363034326465',
                key_type: 'Map',
                db_sort_key_hex:
                  'f9fdeb78243f39066cbea6f49ad5b94bc89fe2cb5c0c206461623332366665616438343437363662626439353639626634363034326465'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kq3xxdunjl8phasuj7sjdyrteht37ync9uy2uuaff7lshv6d3u0sak',
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
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7',
                    simple_rep:
                      '{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}'
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
                key_hex: '5cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7',
                key_type: 'Map',
                db_sort_key_hex:
                  'ac7797969a4fb838eec390fc24a5a0a26ca493d25cc0032e79613d8b3d1007296fdc7de6f37ea011a5ea94270c5df1de73d62ed5bd8ab7'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1npl742hkf0wz7z63sdtclhl3kemss46t88cnpqgka5angh79tqa00p',
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
                      xrd_amount: '0.147477315255',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.1858472879925',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.2609727244425',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1669773209225',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.4800227338675',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.147477315255',
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
                      xrd_amount: '0.147477315255',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.89553672754',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.2609727244425',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1669773209225',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.4800227338675',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.147477315255',
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
                  amount: '78908.58896001091'
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
                  amount: '78909.75020225272'
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
                  total_supply: '9'
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
                'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '8'
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
                  amount: '9'
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
                  amount: '8'
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
                  amount: '4.777549396042662833'
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
                  amount: '4.196928275137662833'
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
          hex: '5c90f863bdebe1ececdb5e2079b10c3223bad6288e0da73dd71892dac2bbd1b9',
          programmatic_json: null
        },
        {
          hex: '5c90f83b8e88c4c25fb58682ee5ad4ac39734598dd8f3e91de7a889720d77af2',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8c1e265489f245d421483da6567bd13eb7f3871513a3b21091595588629',
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
                'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}',
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
                    value: '{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}',
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
                value: 'dab326fead844766bbd9569bf46042de',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}',
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
                    value: 'Metallic Sand RadGem {14/100}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'The Rare Metallic material of this Sand RadGem is graded at a quality of 14 out of a possible 25.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: 'metallic',
                    kind: 'String',
                    field_name: 'material'
                  },
                  {
                    value: 'sand',
                    kind: 'String',
                    field_name: 'color'
                  },
                  {
                    value: 'rare',
                    kind: 'String',
                    field_name: 'rarity'
                  },
                  {
                    value: '14',
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
                value: '1.16124224181',
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
                value: '0.580621120905',
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
                value: '0.580621120905',
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
          balance_change: '-1.16124224181'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.580621120905'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1czu5tzswgcp9qm64qm3du3v38uzmxl3uhpfs9tdzdztgf2yx6evmfg',
          resource_address:
            'resource_tdx_2_1nfynmdhcjftpgwepydpqv2hu68z2qwd4lng32swnf9z3f3zj73u7u0',
          added: ['{2e79613d8b3d1007-296fdc7de6f37ea0-11a5ea94270c5df1-de73d62ed5bd8ab7}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

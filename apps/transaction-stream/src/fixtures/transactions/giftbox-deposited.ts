// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32229437,
    epoch: 16553,
    round: 809,
    round_timestamp: '2024-07-11T09:58:37.331Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1dzdfyfgd457n94gfwkc5esjcswp0fm54aapy8g9krw9a4sv7307qm4663z',
    intent_hash: 'txid_tdx_2_1py5yg3h52xq85ltmcezn8nrve7zssldyw88n4l3va9h64qujj87qmkcxx3',
    fee_paid: '1.36113424203',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz',
      'component_tdx_2_1crjxe0rdx4yzgv28wk2l99t85ks4e5fqhxu29xuj2r2lczdjnumy5g',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-11T09:58:37.331Z',
    raw_hex:
      '4d22030221022104210707020aa9400000000000000aab40000000000000096f73c99a2201012007203d4c091e484a96a59b729afc16f75f0b5af04f1530d62ce5a479adca92cb191c010108000020220a41038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d00000000000000000000000000000000410380005d9f3204bdd075272cafe2e0949849f320407743c9fe2d1e1073bea107c90c046d696e74210185000004cfc542fd3802000000000000000000000000000000000280005d9f3204bdd075272cafe2e0949849f320407743c9fe2d1e1073bea107c985000004cfc542fd380200000000000000000000000000000041038000c045c8b3ca8e440dc58c2c154c046dbb83d93607e768d6d292d54db6cbec0c096d696e745f6361726421090c2066353738313937656362393334633662613966633431636238653437386633630c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533031380c1c4175726f726120426f7265616c69732043617264207b33322f35307d0cbc015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e672074686520657468657265616c20656e657267696573206f6620746865206175726f726120626f7265616c69732120546865207261726520736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f66203332206f7574206f66206120706f737369626c652035302e0c0f6175726f726120626f7265616c69730c2c74686520657468657265616c20656e657267696573206f6620746865206175726f726120626f7265616c69730c047261726585000080ec74d616bc010000000000000000000000000000000100020180009a46430b9e250d28a545d4a430da39ffb85f00b84bffecf4e5643910ea5a410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d0000000000000000000000000000000041038000c0e46cbc6d35482431477595f29567a5a15cd120b9b8a29b9250d5fc09b20c186465706f7369745f676966745f626f785f7265776172647321020c2066353738313937656362393334633662613966633431636238653437386633632081020000000001000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf210120074065f9c96a1678e405bf9dd409399ade4ef4c85f391c8b3e97443289605ac2c2e4f71e67652feff61e144acb8ef32e3c46f0c5ac00e398be61750d64b0191ca10801022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b321012007409c89c9f1277f33b578fab1c8bb1e2e10751d9f1ced479095dc7917724a2ab60319f0e10cd1adb292813af5504d7410536ea4a1692fd443462aa4bf5460b7280d2201012101200740e25190982068bbc7bd63127f0ec7aa0b51bf36e830e68dbadb08e5daa5a149be1b9a95352e4747b3f83c508d65850fdf2e63018a94b8897cd14e241f801ffc0b',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.30717849203',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.9621821',
        xrd_total_finalization_cost: '0.09177365',
        execution_cost_units_consumed: 19243642,
        finalization_cost_units_consumed: 1835473
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
        to_burn: '0.680567121015',
        to_proposer: '0.3402835605075',
        to_validator_set: '0.3402835605075',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.36113424203',
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
                  intent_hash: '09284446f451807a7d7bc64533cc6ccf85087da471cf3afe2ce96faa839291fc',
                  intent_hash_bech32m:
                    'txid_tdx_2_1py5yg3h52xq85ltmcezn8nrve7zssldyw88n4l3va9h64qujj87qmkcxx3'
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
                key_hex: '5c20072009284446f451807a7d7bc64533cc6ccf85087da471cf3afe2ce96faa839291fc',
                key_type: 'Map',
                db_sort_key_hex:
                  'f985309d6c14838f0529a07f3e48e40ba73e4c9b5c20072009284446f451807a7d7bc64533cc6ccf85087da471cf3afe2ce96faa839291fc'
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
                      '5cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d',
                    simple_rep:
                      '{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21080c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533031380c1c4175726f726120426f7265616c69732043617264207b33322f35307d0cbc015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e672074686520657468657265616c20656e657267696573206f6620746865206175726f726120626f7265616c69732120546865207261726520736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f66203332206f7574206f66206120706f737369626c652035302e0c0f6175726f726120626f7265616c69730c2c74686520657468657265616c20656e657267696573206f6620746865206175726f726120626f7265616c69730c0472617265a0000080ec74d616bc010000000000000000000000000000000100',
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
                key_hex: '5cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d',
                key_type: 'Map',
                db_sort_key_hex:
                  'c527851481528bc8f4d21fa042a562d3d96db2b45cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz',
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
                    'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz'
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
                      '5cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d',
                    simple_rep:
                      '{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}'
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
                key_hex: '5cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d',
                key_type: 'Map',
                db_sort_key_hex:
                  'c527851481528bc8f4d21fa042a562d3d96db2b45cc003b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nrnmmxjf3fhl4xnurrwazvw5sxfncmlxwtd3vkv4ahpz3rhckqucap',
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
                      xrd_amount: '1.595293545165',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '2.3555610175475',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.525651712225',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.117764082075',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.799937013945',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.408938052295',
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
                      xrd_amount: '1.595293545165',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '2.3555610175475',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.525651712225',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.117764082075',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.799937013945',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.0686544917875',
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
                  total_supply: '865'
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
                'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '824'
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
                  total_supply: '40'
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
                'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '39'
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
                  amount: '78405.72120530445'
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
                  amount: '78407.08233954648'
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
                    hex: '5c0c206635373831393765636239333463366261396663343163623865343738663363',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c2023018022025d9f3204bdd075272cafe2e0949849f320407743c9fe2d1e1073bea107c90001a0000004cfc542fd38020000000000000000000000000000009a46430b9e250d28a545d4a430da39ffb85f00b84bffecf4e5643910ea5a010120c00103b5f65f5bb0ffc4492688d252c1b2ed891961bb7ef8e84aa541713559c253ff4d',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalNonFungibleResource',
                        entity_address:
                          'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz'
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
                key_hex: '5c0c206635373831393765636239333463366261396663343163623865343738663363',
                key_type: 'Map',
                db_sort_key_hex:
                  '27bddb46c58507804735c86088e45c9c4771fc515c0c206635373831393765636239333463366261396663343163623865343738663363'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kqxtxu0xz82dnht9ddq0mx56sm5lvhzzsv6nn506l4j8qwunc885rx',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c0c206635373831393765636239333463366261396663343163623865343738663363',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c202300',
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
                schema_hash: '1f74aa8644b5ab8bc032b3f87bb24e55baa2514852de9c7cb835afb5dbec37f3',
                local_type_id: {
                  id: 0,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kqxtxu0xz82dnht9ddq0mx56sm5lvhzzsv6nn506l4j8qwunc885rx'
              },
              value_full_type_id: {
                schema_hash: '1f74aa8644b5ab8bc032b3f87bb24e55baa2514852de9c7cb835afb5dbec37f3',
                local_type_id: {
                  id: 1,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0100000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kqxtxu0xz82dnht9ddq0mx56sm5lvhzzsv6nn506l4j8qwunc885rx'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '111'
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
                'internal_vault_tdx_2_1trqlk4unc5xjawpg05n4r3e84qr26sx8q7md3h32nlwgw4eg7u2ypx',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '70'
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
                  amount: '8'
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
                'internal_vault_tdx_2_1nrnmmxjf3fhl4xnurrwazvw5sxfncmlxwtd3vkv4ahpz3rhckqucap',
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
                  amount: '15.606290848813568261'
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
                  amount: '14.925723727798568261'
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
          hex: '5c90f8c860e7321a37e5713c438aff33f11c8f49cb22b43746c47ac15a949dc2',
          programmatic_json: null
        },
        {
          hex: '5c90f88d80a1f6b3306cf843c555a7b00243d9b094e60dee92f32adb1cef6e86',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8768afd83e21f7b1cf354c3710365672c7fceafa84e055acfa11682cb3e',
          programmatic_json: null
        },
        {
          hex: '5c90f8317d239426b025ae1cf3f7dc7acf62462ad25a1ef1997ee1e8c325ca4b',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f85d732cf10257a9eebd78c9f83aaadddadef72f35bb63e6acfeef93239d',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f864a39337df25c641bef4b10a14f8aafe3ddbbfa192bb6bb7cffc1b6121',
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
                'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '41',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent'
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
                'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}',
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
          name: 'MorphCardMintedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1cpzu3v723ezqm3vv9s25cprdhwpajds8ua5dd55j64xmdjlv96cst3'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'f578197ecb934c6ba9fc41cb8e478f3c',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}',
                kind: 'NonFungibleLocalId',
                field_name: 'local_id'
              },
              {
                fields: [
                  {
                    value: 'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/card?shape=S018',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Aurora Borealis Card {32/50}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'Use this Morph Energy Card to fuse 2 RadGems using the ethereal energies of the aurora borealis! The rare shape defined by this card is rated at a quality level of 32 out of a possible 50.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: 'aurora borealis',
                    kind: 'String',
                    field_name: 'energy_type'
                  },
                  {
                    value: 'the ethereal energies of the aurora borealis',
                    kind: 'String',
                    field_name: 'energy_description'
                  },
                  {
                    value: 'rare',
                    kind: 'String',
                    field_name: 'rarity'
                  },
                  {
                    value: '32',
                    kind: 'Decimal',
                    field_name: 'quality'
                  },
                  {
                    value: false,
                    kind: 'Bool',
                    field_name: 'limited_edition'
                  }
                ],
                kind: 'Tuple',
                type_name: 'MorphEnergyCardData',
                field_name: 'morph_card_data'
              }
            ],
            kind: 'Tuple',
            type_name: 'MorphCardMintedEvent'
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
                'internal_vault_tdx_2_1trqlk4unc5xjawpg05n4r3e84qr26sx8q7md3h32nlwgw4eg7u2ypx'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '41',
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
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nrnmmxjf3fhl4xnurrwazvw5sxfncmlxwtd3vkv4ahpz3rhckqucap'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}',
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
          name: 'GiftBoxDepositedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.giftBoxOpener
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'f578197ecb934c6ba9fc41cb8e478f3c',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'GiftBoxDepositedEvent'
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
                value: '1.36113424203',
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
                value: '0.680567121015',
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
                value: '0.680567121015',
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
          balance_change: '-1.36113424203'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.680567121015'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1crjxe0rdx4yzgv28wk2l99t85ks4e5fqhxu29xuj2r2lczdjnumy5g',
          resource_address:
            'resource_tdx_2_1tk0nyp9a6p6jwt90utsffxzf7vsyqa6re8lz68sswwl2zp7fc372pq',
          balance_change: '41'
        }
      ],
      non_fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1crjxe0rdx4yzgv28wk2l99t85ks4e5fqhxu29xuj2r2lczdjnumy5g',
          resource_address:
            'resource_tdx_2_1nfryxzu7y5xj3f296jjrpk3el7u97q9cf0l7ea89vsu3p6j6ua0nzz',
          added: ['{b5f65f5bb0ffc449-2688d252c1b2ed89-1961bb7ef8e84aa5-41713559c253ff4d}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 36763814,
    epoch: 18875,
    round: 1987,
    round_timestamp: '2024-07-19T11:31:16.039Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1hcdm0x26s5n5y04nu5cf83gmtz7gpwr7yegz2r8y5eem9m3plu4qmzfau4',
    intent_hash: 'txid_tdx_2_1wtydrqpdxgxpdvlf2fns52wmp8jcrm2pkka0t8pg2v2tqzpmga7qdzxthg',
    fee_paid: '1.37888030157',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
      'component_tdx_2_1crflnq2jxcelz6fkpp48rw950qlnkezxh68t3qmcxntc09tghgzq3g',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-19T11:31:16.039Z',
    raw_hex:
      '4d22030221022104210707020abb490000000000000abd490000000000000919276bff220101200720ec545b69a40963b3c00947d912ba383875ba79ab1278f33654e9ea14e83b3322010108000020220a41038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005dd23691d8b4aed6096d4f4238b673ff2fd52e53ea65cc0b05915f0c8f2b85000064a7b3b6e00d00000000000000000000000000000000410380005dffc43391ad34daef0608b5714db113d94853813d448eea6f2cf3c0b1050c046d696e74210185000028003f8ed26801000000000000000000000000000000000280005dffc43391ad34daef0608b5714db113d94853813d448eea6f2cf3c0b10585000028003f8ed2680100000000000000000000000000000041038000c0d8e604f1917598a323964d00820e88eae0805027f01f367a285759de960c096d696e745f6361726421090c2035613262373839336531373834643064383133376265653130633935326236380c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533031310c165261696e626f772043757276652043617264207b357d0cb7015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e672074686520707269736d6174696320706f776572206f662061207261696e626f77206375727665212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f662035206f7574206f66206120706f737369626c652035302e0c0d7261696e626f772063757276650c2674686520707269736d6174696320706f776572206f662061207261696e626f772063757276650c06636f6d6d6f6e850000f44482916345000000000000000000000000000000000100020180009a5627961572e1273c612d60393bfcad28e5065a42faaaac6f5367f86ce0410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005dd23691d8b4aed6096d4f4238b673ff2fd52e53ea65cc0b05915f0c8f2b85000064a7b3b6e00d0000000000000000000000000000000041038000c0d3f981523633f16936086a71b8b4783f3b6446be8eb8837834d78795680c186465706f7369745f676966745f626f785f7265776172647321020c2035613262373839336531373834643064383133376265653130633935326236382081020000000001000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf21012007402d7153806a4abb113ab45e819883661faf24e014e8bfbe34f3e19b45936025ea8445a54f9d81e0496aa9a83139d65d1a00b2ac5104b71156a773aaeb0827e60701022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b321012007408870c938148f99a19c6693e6da0ac0ce8e529906ff0f3295f862bb74d595879f82f992bbfb01f894051dd90314dbc8c0a76f3f2b94c9873033781b25108d3f092201012101200740c926dd4f79967470f761432afed00693a43f59c6ed184050aade64d6eaca6334f6a0c1897b638ded8a35d9b0a6fb7291be058bed6eb7307ad2b98c8e43e49e02',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.31461715157',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.9724883',
        xrd_total_finalization_cost: '0.09177485',
        execution_cost_units_consumed: 19449766,
        finalization_cost_units_consumed: 1835497
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
        to_burn: '0.689440150785',
        to_proposer: '0.3447200753925',
        to_validator_set: '0.3447200753925',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.37888030157',
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
                  intent_hash: '72c8d1802d320c16b3e952670a29db09e581ed41b5baf59c285314b0083b477c',
                  intent_hash_bech32m:
                    'txid_tdx_2_1wtydrqpdxgxpdvlf2fns52wmp8jcrm2pkka0t8pg2v2tqzpmga7qdzxthg'
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
                key_hex: '5c20072072c8d1802d320c16b3e952670a29db09e581ed41b5baf59c285314b0083b477c',
                key_type: 'Map',
                db_sort_key_hex:
                  '5b7cbadf5649e988636ce226d5d9289f0c39cbe25c20072072c8d1802d320c16b3e952670a29db09e581ed41b5baf59c285314b0083b477c'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 253
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
                      '5cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd',
                    simple_rep:
                      '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21080c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533031310c165261696e626f772043757276652043617264207b357d0cb7015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e672074686520707269736d6174696320706f776572206f662061207261696e626f77206375727665212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f662035206f7574206f66206120706f737369626c652035302e0c0d7261696e626f772063757276650c2674686520707269736d6174696320706f776572206f662061207261696e626f772063757276650c06636f6d6d6f6ea00000f44482916345000000000000000000000000000000000100',
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
                key_hex: '5cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd',
                key_type: 'Map',
                db_sort_key_hex:
                  'bd2de3ccace5d2c3e4f9fc77f7be2ff61fac67265cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
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
                    'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks'
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
                      '5cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd',
                    simple_rep:
                      '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}'
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
                key_hex: '5cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd',
                key_type: 'Map',
                db_sort_key_hex:
                  'bd2de3ccace5d2c3e4f9fc77f7be2ff61fac67265cc0039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nrlsuxwg9ep6dpd9r8vzzpdx6ptupj76fvx0r3ctjkerufyq0vhkdd',
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
                      xrd_amount: '0.0686544917875',
                      validator_index: {
                        index: 7
                      }
                    },
                    {
                      xrd_amount: '1.46134503882',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '9.4563849497425',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.37675536153',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.8333233044525',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.386755226215',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '1.6138230867175',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.88758705558',
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
                      xrd_amount: '0.0686544917875',
                      validator_index: {
                        index: 7
                      }
                    },
                    {
                      xrd_amount: '1.46134503882',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '9.11166487435',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.37675536153',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.8333233044525',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.386755226215',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '1.6138230867175',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '2.88758705558',
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
                  total_supply: '1758'
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
                'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '1732'
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
                  total_supply: '79'
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
                'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '78'
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
                  amount: '56089.91768145473'
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
                  amount: '56091.2965617563'
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
                    hex: '5c0c203561326237383933653137383464306438313337626565313063393532623638',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c2023018022025dffc43391ad34daef0608b5714db113d94853813d448eea6f2cf3c0b1050001a0000028003f8ed268010000000000000000000000000000009a5627961572e1273c612d60393bfcad28e5065a42faaaac6f5367f86ce0010120c001039dc5c757a4dd254de49b8864435fc37db2e910e490b2ea15285a21f0232699bd',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalNonFungibleResource',
                        entity_address:
                          'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks'
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
                key_hex: '5c0c203561326237383933653137383464306438313337626565313063393532623638',
                key_type: 'Map',
                db_sort_key_hex:
                  '9414f6df3cfd9f6836a569aa70e5a26b192b89845c0c203561326237383933653137383464306438313337626565313063393532623638'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kpessczv5vy5ghyvv5pymup8sqgfwwslmsr5flyy9ydwcqrzytlqdp',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c0c203561326237383933653137383464306438313337626565313063393532623638',
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
                  'internal_keyvaluestore_tdx_2_1kpessczv5vy5ghyvv5pymup8sqgfwwslmsr5flyy9ydwcqrzytlqdp'
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
                  'internal_keyvaluestore_tdx_2_1kpessczv5vy5ghyvv5pymup8sqgfwwslmsr5flyy9ydwcqrzytlqdp'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '36'
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
                'internal_vault_tdx_2_1trctkx6vrf2rvrafqapcrv0ewaw7fv6quahnqkx9d70aws7tv6c8re',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '10'
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
                  amount: '2'
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
                'internal_vault_tdx_2_1nrlsuxwg9ep6dpd9r8vzzpdx6ptupj76fvx0r3ctjkerufyq0vhkdd',
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
                  amount: '36.169257032988096317'
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
                  amount: '35.479816882203096317'
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
          hex: '5c90f830ae9ce5d5ed4779eaaccf6924b7aa858527d04c98d0cad949cdf3f0cf',
          programmatic_json: null
        },
        {
          hex: '5c90f8e50952633508cbd53bdd205a24a4e62567c1be1766314ea3a360a9cfbe',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f83195e60259bec4fa7b253e04a12ce878c3af1b645bbe6b52762b1246a4',
          programmatic_json: null
        },
        {
          hex: '5c90f8fda36e50da5c0080b8abaad5fe6dd6f505290371a7e9586e804ca6b8f3',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8d28b25ee60b624215075777593bdf9830346544253f7de804d8dab7822',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f809249de84aaef78362d997748a17ae011b35bf7c72429ecac5b45a8393',
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
                'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '26',
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
                'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}',
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
              entity_address: addresses.components.cardForge
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '5a2b7893e1784d0d8137bee10c952b68',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}',
                kind: 'NonFungibleLocalId',
                field_name: 'local_id'
              },
              {
                fields: [
                  {
                    value: 'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/card?shape=S011',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Rainbow Curve Card {5}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'Use this Morph Energy Card to fuse 2 RadGems using the prismatic power of a rainbow curve! The common shape defined by this card is rated at a quality level of 5 out of a possible 50.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: 'rainbow curve',
                    kind: 'String',
                    field_name: 'energy_type'
                  },
                  {
                    value: 'the prismatic power of a rainbow curve',
                    kind: 'String',
                    field_name: 'energy_description'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'rarity'
                  },
                  {
                    value: '5',
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
                'internal_vault_tdx_2_1trctkx6vrf2rvrafqapcrv0ewaw7fv6quahnqkx9d70aws7tv6c8re'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '26',
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
                'internal_vault_tdx_2_1nrlsuxwg9ep6dpd9r8vzzpdx6ptupj76fvx0r3ctjkerufyq0vhkdd'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}',
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
                value: '5a2b7893e1784d0d8137bee10c952b68',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                key_kind: 'Reference',
                value_kind: 'Enum',
                key_type_name: 'ResourceAddress',
                value_type_name: 'RewardAmount',
                entries: [
                  {
                    key: {
                      value:
                        'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25',
                      kind: 'Reference',
                      type_name: 'ResourceAddress'
                    },
                    value: {
                      variant_id: 0,
                      variant_name: 'FungibleAmount',
                      fields: [
                        {
                          value: '26',
                          kind: 'Decimal'
                        }
                      ],
                      kind: 'Enum',
                      type_name: 'RewardAmount'
                    }
                  },
                  {
                    key: {
                      value:
                        'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
                      kind: 'Reference',
                      type_name: 'ResourceAddress'
                    },
                    value: {
                      variant_id: 1,
                      variant_name: 'NonFungibleAmount',
                      fields: [
                        {
                          element_kind: 'NonFungibleLocalId',
                          elements: [
                            {
                              value:
                                '{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}',
                              kind: 'NonFungibleLocalId'
                            }
                          ],
                          kind: 'Array'
                        }
                      ],
                      kind: 'Enum',
                      type_name: 'RewardAmount'
                    }
                  }
                ],
                kind: 'Map',
                field_name: 'rewards'
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
                value: '1.37888030157',
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
                value: '0.689440150785',
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
                value: '0.689440150785',
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
          balance_change: '-1.37888030157'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.689440150785'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1crflnq2jxcelz6fkpp48rw950qlnkezxh68t3qmcxntc09tghgzq3g',
          resource_address:
            'resource_tdx_2_1thlugvu3456d4mcxpz6hznd3z0v5s5up84zga6n09neupvg9v7nl25',
          balance_change: '26'
        }
      ],
      non_fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1crflnq2jxcelz6fkpp48rw950qlnkezxh68t3qmcxntc09tghgzq3g',
          resource_address:
            'resource_tdx_2_1nftz09s4wtsjw0rp94srjwlu455w2pj6gta24tr02dnlsm8q6ceuks',
          added: ['{9dc5c757a4dd254d-e49b8864435fc37d-b2e910e490b2ea15-285a21f0232699bd}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

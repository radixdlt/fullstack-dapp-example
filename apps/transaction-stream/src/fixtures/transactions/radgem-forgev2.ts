// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 44136763,
    epoch: 22607,
    round: 1368,
    round_timestamp: '2024-08-01T10:29:43.888Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1w6vwdwah6xsy3f42w38d578ejtl27ql47ez6cjv5sjm0nktexcfscmwzmd',
    intent_hash: 'txid_tdx_2_1mfy20dvs7srdy0yl8prcs0h706txxc2cfdg58z0k4t700s75xuls0nykvv',
    fee_paid: '0.53534608763',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
      'account_tdx_2_12xa72zs3aklqzcv8cwg50mnfq0z6y84kzh65ag59t0p2yvnww4ty82'
    ],
    confirmed_at: '2024-08-01T10:29:43.888Z',
    raw_hex:
      '4d22030221022104210707020a4f580000000000000a595800000000000009d2061ddf22010120072088bb5b53caf348d324e4bc9a925c7217c7e864e0649155947b235208532f6f9f01000800002022064103800051bbe50a11edbe016187c39147ee6903c5a21eb615f54ea2855bc2a2326e0c086c6f636b5f666565210185e09b9edf88f14a09000000000000000000000000000000004103800051bbe50a11edbe016187c39147ee6903c5a21eb615f54ea2855bc2a2326e0c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009afca03a0eb4adde912e4108f6ab933b98197c0a6a29f052b13a9dfda7442087010020373063396436346535633130343931393833666661666630626366653530663410004103800051bbe50a11edbe016187c39147ee6903c5a21eb615f54ea2855bc2a2326e0c087769746864726177210280005d87abf512fe41dd3dba8922caf8bbbdcc19a622031e0fad72aa3ae52beb850000f4448291634500000000000000000000000000000000020180005d87abf512fe41dd3dba8922caf8bbbdcc19a622031e0fad72aa3ae52beb41038000c0f734e93bba6b66b3ba175ad618b9ed771e6ad1dd8adb2768b2a34f753e0c106465706f7369745f656c656d656e747321028200000000810000000020200022000020220101022007206efca02dabc7758b09feb2690fe7d3b4e13ee337fa52de8c35ebed02b4c5e6282101200740a4892218f697e413ea287c164b2384d08b0a94f0063c4d2e222cda884a7c577835e4a3ff0e9bb48cbac1af17264db7fa5d9d02cb8019b83b8f9a23ec60a5d40122010121012007407d5c124ecb9e6e00e271ac5944b71566b14e6be8f4aa3a0a1dec1305bc521e3688b565c8ab188a1ca2d152bb835c622778c8bb4e5bff8f65b11e6f4a155a5603',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.10881423763',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.39527695',
        xrd_total_finalization_cost: '0.0312549',
        execution_cost_units_consumed: 7905539,
        finalization_cost_units_consumed: 625098
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
        to_burn: '0.267673043815',
        to_proposer: '0.1338365219075',
        to_validator_set: '0.1338365219075',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.53534608763',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpsrqfr94t922kc7ukz3sykzg0gh8ngh0n4h9y77ju5rfldze7xtse'
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
                  intent_hash: 'da48a7b590f406d23c9f3847883efe7e966361584b514389f6aafcf7c3d4373f',
                  intent_hash_bech32m:
                    'txid_tdx_2_1mfy20dvs7srdy0yl8prcs0h706txxc2cfdg58z0k4t700s75xuls0nykvv'
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
                key_hex: '5c200720da48a7b590f406d23c9f3847883efe7e966361584b514389f6aafcf7c3d4373f',
                key_type: 'Map',
                db_sort_key_hex:
                  'd5e4afd23d0e43515f0cb4a038a5a7d9615621a55c200720da48a7b590f406d23c9f3847883efe7e966361584b514389f6aafcf7c3d4373f'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 100
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
                      xrd_amount: '0.6923308496325',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.1641728954025',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.7898262792075',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.6245284106425',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '1.0339771526225',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1762766968775',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.490700988735',
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
                      xrd_amount: '0.6923308496325',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.1641728954025',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.7898262792075',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.490691888735',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '1.0339771526225',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1762766968775',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.490700988735',
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
                  total_supply: '8142'
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
                'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '8147'
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
                  amount: '29.51096669891'
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
                'internal_vault_tdx_2_1tpsrqfr94t922kc7ukz3sykzg0gh8ngh0n4h9y77ju5rfldze7xtse',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '30.04631278654'
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
                  amount: '0'
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
                'internal_vault_tdx_2_1tp86why57er8tqlsv7utp3qp6qtte24y0hnnvcwyz6mpr7s3qldz2d',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '5'
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
                  amount: '9.943626550407388221'
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
                  amount: '9.675953506592388221'
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
          hex: '5c90f8e05c3be410b7f31794c3701ff01111c8d145194bf522f1abc24785cd1d',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8102d404f032910b3a2e9173411fdc95e3586fa16f195bf18d5ee6fa9f4',
          programmatic_json: null
        },
        {
          hex: '5c2100',
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
                'internal_vault_tdx_2_1tpsrqfr94t922kc7ukz3sykzg0gh8ngh0n4h9y77ju5rfldze7xtse'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.6696130647875',
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
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tp86why57er8tqlsv7utp3qp6qtte24y0hnnvcwyz6mpr7s3qldz2d'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '5',
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
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12xa72zs3aklqzcv8cwg50mnfq0z6y84kzh65ag59t0p2yvnww4ty82'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '5',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
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
                'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '5',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent'
          }
        },
        {
          name: 'DepositedElementsEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.radgemForgeV2
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '70c9d64e5c10491983ffaff0bcfe50f4',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '5',
                kind: 'Decimal',
                field_name: 'elements_count'
              }
            ],
            kind: 'Tuple',
            type_name: 'DepositedElementsEvent'
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
                'internal_vault_tdx_2_1tpsrqfr94t922kc7ukz3sykzg0gh8ngh0n4h9y77ju5rfldze7xtse'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.53534608763',
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
                value: '0.267673043815',
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
                value: '0.267673043815',
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
          entity_address: 'account_tdx_2_12xa72zs3aklqzcv8cwg50mnfq0z6y84kzh65ag59t0p2yvnww4ty82',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.53534608763'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.267673043815'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12xa72zs3aklqzcv8cwg50mnfq0z6y84kzh65ag59t0p2yvnww4ty82',
          resource_address:
            'resource_tdx_2_1tkr6hagjleqa60d63y3v479mhhxpnf3zqv0qlttj4gaw22ltvfw7rf',
          balance_change: '-5'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

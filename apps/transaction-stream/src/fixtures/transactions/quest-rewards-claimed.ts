// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32229030,
    epoch: 16553,
    round: 416,
    round_timestamp: '2024-07-11T09:57:33.211Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1xt0vpda4vjvswucgjpltfx8h2q9rtcd2x3j9qyhl7zq34qgcmutssd472s',
    intent_hash: 'txid_tdx_2_10xk03002tpnv34yvzj0j567yxvwdpswk72l6f4mggqpjlg7f7clsgf432r',
    fee_paid: '0.90715944043',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_129j5rnt8xjl0n5e6xx9cf6rzc9ulhtcyf65drpj6tu55pn38u93kek',
      'component_tdx_2_1cr9h09w76m5p3ctgkpg7ynxvj2q5gral3uxsr3nl8valhsz8p7w6l0'
    ],
    confirmed_at: '2024-07-11T09:57:33.211Z',
    raw_hex:
      '4d22030221022104210707020aa9400000000000000aab4000000000000009459edcd12201012007209de98288189e3f62e2340021d00f346628a7e51f0693ad285b54cc392edbc956010108000020220541038000516541cd6734bef9d33a318b84e862c179fbaf044ea8d1865a5f2940ce270c086c6f636b5f6665652101850000e8890423c78a0000000000000000000000000000000041038000516541cd6734bef9d33a318b84e862c179fbaf044ea8d1865a5f2940ce270c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009ac42beb0ed47a2886887f6c5f36ccedda8332d13b1fefcff86b658716b620870100203739333533626133383239363432373962313863353830363735376534323833100041038000c0cb7795ded6e818e168b051e24ccc9281440fbf8f0d01c67f3b3bfbc0470c0c636c61696d5f72657761726421030c0d5175657374546f676574686572820000000022000041038000516541cd6734bef9d33a318b84e862c179fbaf044ea8d1865a5f2940ce270c0d6465706f7369745f6261746368210183002020002200002022010102200720b913bb5bd15c8fbda904f3ea9ff70ad32267a8ce23b6a33cd48a42331f9b2bf921012007404ca97abf023a2b28e48d98c903bb2893babefcdce70c504aff878087d1054049f7499f880e9f94233fa6af025c6a20782d2a74fd635dba15b1a7030762e88a042201012101200740bc7dad1f0795366424233034ea11f2127f43b2cfd98e670e9d1383451f133e0a79158a5c4fc840262bf77b84ddbe1efb6047777d30d82839bd6597a084eb190d',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.10499954043',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.7609005',
        xrd_total_finalization_cost: '0.0412594',
        execution_cost_units_consumed: 15218010,
        finalization_cost_units_consumed: 825188
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
        to_burn: '0.453579720215',
        to_proposer: '0.2267898601075',
        to_validator_set: '0.2267898601075',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.90715944043',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tzk2lqt20evyu9lg5cgf5867mpsa7frykvd2vtgzk7jrq3pseak9lt'
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
                  intent_hash: '79acf8bdea5866c8d48c149f2a6bc4331cd0c1d6f2bfa4d76840032fa3c9f63f',
                  intent_hash_bech32m:
                    'txid_tdx_2_10xk03002tpnv34yvzj0j567yxvwdpswk72l6f4mggqpjlg7f7clsgf432r'
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
                key_hex: '5c20072079acf8bdea5866c8d48c149f2a6bc4331cd0c1d6f2bfa4d76840032fa3c9f63f',
                key_type: 'Map',
                db_sort_key_hex:
                  '4b6d4c6722f1acf45273a6d5d9b38a0bb73a2b0c5c20072079acf8bdea5866c8d48c149f2a6bc4331cd0c1d6f2bfa4d76840032fa3c9f63f'
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
                      xrd_amount: '0.90532690608',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.9081934563675',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.16386139678',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.8735032692025',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.58633611908',
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
                      xrd_amount: '0.90532690608',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.9081934563675',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.16386139678',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '1.646713409095',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.58633611908',
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
                  amount: '10049.09284055957'
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
                'internal_vault_tdx_2_1tzk2lqt20evyu9lg5cgf5867mpsa7frykvd2vtgzk7jrq3pseak9lt',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '10000'
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
                    hex: '5c21020c2037393335336261333832393634323739623138633538303637353765343238330c0d5175657374546f676574686572',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022015da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a0000000000000000000000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
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
                  '5c21020c2037393335336261333832393634323739623138633538303637353765343238330c0d5175657374546f676574686572',
                key_type: 'Map',
                db_sort_key_hex:
                  '85da6bf10fb660b0815f05f4dcb2fec4f46f92c15c21020c2037393335336261333832393634323739623138633538303637353765343238330c0d5175657374546f676574686572'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kzepwvrswmgl8mlyw88yl2tcnzvyut6y3tvnfmf9gaet0mlpqpe53f',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                key: {
                  key_data: {
                    hex: '5c21020c2037393335336261333832393634323739623138633538303637353765343238330c0d5175657374546f676574686572',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c220001238022015da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c60001a0000088b116afe3b502000000000000000000000000000000',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
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
                  'internal_keyvaluestore_tdx_2_1kzepwvrswmgl8mlyw88yl2tcnzvyut6y3tvnfmf9gaet0mlpqpe53f'
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
                  'internal_keyvaluestore_tdx_2_1kzepwvrswmgl8mlyw88yl2tcnzvyut6y3tvnfmf9gaet0mlpqpe53f'
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '885'
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
                'internal_vault_tdx_2_1trkh6dn0tct72hrenqyrkjqd6kvwrhncyz6mpcgk778nc99xwkwp6n',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '935'
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
                  amount: '9.011751280903568261'
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
                  amount: '8.558171560688568261'
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
          hex: '5c90f8e85ac012cedb60dfe3a21de045eaecd4d921e75cf466c58237b5766aa7',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c209001f8c251dff46f9d4908581f1fae2aa73684f7a8954691a70da6ffbd61c45e',
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
                'internal_vault_tdx_2_1tzk2lqt20evyu9lg5cgf5867mpsa7frykvd2vtgzk7jrq3pseak9lt'
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
                value: '79353ba382964279b18c5806757e4283',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: 'QuestTogether',
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
                            value: '50',
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
                'internal_vault_tdx_2_1trkh6dn0tct72hrenqyrkjqd6kvwrhncyz6mpcgk778nc99xwkwp6n'
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
            type_name: 'WithdrawEvent'
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
                'internal_vault_tdx_2_1tzk2lqt20evyu9lg5cgf5867mpsa7frykvd2vtgzk7jrq3pseak9lt'
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
                'account_tdx_2_129j5rnt8xjl0n5e6xx9cf6rzc9ulhtcyf65drpj6tu55pn38u93kek'
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
                value: '50',
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
                'internal_vault_tdx_2_1tzk2lqt20evyu9lg5cgf5867mpsa7frykvd2vtgzk7jrq3pseak9lt'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.90715944043',
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
                value: '0.453579720215',
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
                value: '0.453579720215',
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
          entity_address: 'account_tdx_2_129j5rnt8xjl0n5e6xx9cf6rzc9ulhtcyf65drpj6tu55pn38u93kek',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.90715944043'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.453579720215'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_129j5rnt8xjl0n5e6xx9cf6rzc9ulhtcyf65drpj6tu55pn38u93kek',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '50'
        },
        {
          entity_address: 'component_tdx_2_1cr9h09w76m5p3ctgkpg7ynxvj2q5gral3uxsr3nl8valhsz8p7w6l0',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-50'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

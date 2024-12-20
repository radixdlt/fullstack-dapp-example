// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32224873,
    epoch: 16551,
    round: 3,
    round_timestamp: '2024-07-11T09:46:21.589Z',
    payload_hash:
      'notarizedtransaction_tdx_2_139qsy95m2yq2efqq65hy7hlzwy8zan0jvlwkru7s93u7qjgwnz6smeqanc',
    intent_hash: 'txid_tdx_2_1hkwch3w283agkfrgq2vnaty9jvpl97ufzaausgu9u7gcrtv3wdfs479ng4',
    fee_paid: '0.82804085212',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      addresses.components.questRewards,
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-11T09:46:21.589Z',
    raw_hex:
      '4d22030221022104210707020aa6400000000000000aa84000000000000009ce63e4c1220101200720bc0de25a3db93d196a3c0e97972530817500e7ecdd85c20ae611e8476173c119010108000020220841038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d00000000000000000000000000000000410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c087769746864726177210280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c685000088b116afe3b502000000000000000000000000000000020180005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d5be810a955f11815d13b7fb8eb73ec8d8969d3d2183fb077bcb0a0e7a285000064a7b3b6e00d0000000000000000000000000000000041038000c0cb7795ded6e818e168b051e24ccc9281440fbf8f0d01c67f3b3bfbc0470c0e6465706f7369745f72657761726421030c2031613065663663663732643434303564396135373136363832366235643061320c0d5175657374546f67657468657220810100000000202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf2101200740ab1a46ac320518362fd810b8627b19a711b75f0c6af6ce4f08f1a5196b3715d5091621168bd96a5578b4d237fc3dd0789f0cc996d25a3e78755bb5cd97cc9b0d01022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b32101200740c37f3a6efb1fd1b40634b3e1aad78a7a6cf7c9da02faf9eafe39b12d7ea69d0df61cbe1ad293b314ee096017492cd3144c5c040be2f38b364d7cade7eea225062201012101200740a40ee8d25b7292c5e1e18e1658e853cb00b120d1045aa8ce898cb0df2c983dff8edfed66f3474a8742aeeda57240660c54572890eb15fd9ff2a5b922afdade00',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.16059875212',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.61618215',
        xrd_total_finalization_cost: '0.05125995',
        execution_cost_units_consumed: 12323643,
        finalization_cost_units_consumed: 1025199
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
        to_burn: '0.41402042606',
        to_proposer: '0.20701021303',
        to_validator_set: '0.20701021303',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.82804085212',
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
                  intent_hash: 'bd9d8bc5ca3c7a8b246802993eac859303f2fb89177bc82385e79181ad917353',
                  intent_hash_bech32m:
                    'txid_tdx_2_1hkwch3w283agkfrgq2vnaty9jvpl97ufzaausgu9u7gcrtv3wdfs479ng4'
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
                key_hex: '5c200720bd9d8bc5ca3c7a8b246802993eac859303f2fb89177bc82385e79181ad917353',
                key_type: 'Map',
                db_sort_key_hex:
                  '6f9a9e72c951b2d504c88c64d6bf1e5fcf47b8205c200720bd9d8bc5ca3c7a8b246802993eac859303f2fb89177bc82385e79181ad917353'
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
                  key_data: {
                    hex: '5c21020c2031613065663663663732643434303564396135373136363832366235643061320c0d5175657374546f676574686572',
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
            substate_id: {
              entity_type: 'InternalKeyValueStore',
              substate_key: {
                key_hex:
                  '5c21020c2031613065663663663732643434303564396135373136363832366235643061320c0d5175657374546f676574686572',
                key_type: 'Map',
                db_sort_key_hex:
                  '2ada15c0ed5f3c2b1a7cd33f7c914ad3ffe068a95c21020c2031613065663663663732643434303564396135373136363832366235643061320c0d5175657374546f676574686572'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kzepwvrswmgl8mlyw88yl2tcnzvyut6y3tvnfmf9gaet0mlpqpe53f',
              partition_kind: 'KeyValue',
              partition_number: 64
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
                      xrd_amount: '0.33046733452',
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
                      xrd_amount: '0.12345712149',
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
                  amount: '78564.08621554046'
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
                  amount: '78614.91425639258'
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
                  amount: '890'
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
                  amount: '840'
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
                  amount: '0.660934670177147658'
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
                  amount: '0.246914244117147658'
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
          hex: '5c90f8045d5b279d8efef39d42f5c074a58d56c227df10bbf9bde9a891ed0370',
          programmatic_json: null
        },
        {
          hex: '5c90f8a6c533e6a5384b9a0b77a4705fce8e179c36149cfbb95f0cd6e9527366',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8b86d486ec35568fe5ff964fbd2a3e5e44377c92f266370ae5d2e10e5fa',
          programmatic_json: null
        },
        {
          hex: '5c90f8fe4ec05e48b46dc669ef7e3ee4ed7e4eb43342146dac1e7e8a2017ff07',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f84956be91909ffc848cf0f1210da5d4224bab16026e4e13727a1869d6f8',
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
          name: 'WithdrawEvent',
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
                'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
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
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'RewardDepositedEvent',
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
                value: '1a0ef6cf72d4405d9a57166826b5d0a2',
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
            type_name: 'RewardDepositedEvent'
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
                value: '0.82804085212',
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
                value: '0.41402042606',
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
                value: '0.41402042606',
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
          balance_change: '-0.82804085212'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.41402042606'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-50'
        },
        {
          entity_address: addresses.components.questRewards,
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '50'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

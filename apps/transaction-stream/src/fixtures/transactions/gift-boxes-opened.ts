// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32229051,
    epoch: 16553,
    round: 436,
    round_timestamp: '2024-07-11T09:57:36.703Z',
    payload_hash:
      'notarizedtransaction_tdx_2_165a0f7ndaqpukq5lpnrznzld3y5mkjwl0vqjps7ljr0wz4pl72rqnwms04',
    intent_hash: 'txid_tdx_2_1c0ahy6774796pqpcwnf3jjkphf63a39m3f4ldwvcmq8vunkgyqeq3hv8ht',
    fee_paid: '0.66281275595',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
      'account_tdx_2_12xdqnkw0u3z7xzrvtyj8kzv66vzt9ynt2ase7xcxgmzdy3248mplj3'
    ],
    confirmed_at: '2024-07-11T09:57:36.703Z',
    raw_hex:
      '4d22030221022104210707020aa9400000000000000aab400000000000000906c9cc1e220101200720ed860872ea740043bcb80354892528bc523bbb5c1a5fc179de51e1be43d1ade1010108000020220641038000519a09d9cfe445e3086c59247b099ad304b2926b57619f1b0646c4d245550c086c6f636b5f666565210185000088b116afe3b50200000000000000000000000000000041038000519a09d9cfe445e3086c59247b099ad304b2926b57619f1b0646c4d245550c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009ac42beb0ed47a2886887f6c5f36ccedda8332d13b1fefcff86b658716b620870100206635373831393765636239333463366261396663343163623865343738663363100041038000519a09d9cfe445e3086c59247b099ad304b2926b57619f1b0646c4d245550c087769746864726177210280005d27070aab615f81ebd7a6267b85da50990a3f857c1570748092dd1814d185000064a7b3b6e00d00000000000000000000000000000000020180005d27070aab615f81ebd7a6267b85da50990a3f857c1570748092dd1814d141038000c0e46cbc6d35482431477595f29567a5a15cd120b9b8a29b9250d5fc09b20c0d6f70656e5f676966745f626f782102820000000081000000002020002200002022010102200720ee5495f9e85d1775dbbfa6eff1956658b331e7e2dfeffa0ac6f3e254ccae023b210120074058703199b29b0c584237493c148241794fed8113443b815004b63f5ebdaafb77fc20841bd16e8e2496b1aebb4c0dff8642a76f1c1696cbe8a9f1b4dc609fc50f2201012101200740de0df16afc691d2a2f5c1ef8819f53ca61a9cf9f08e7163b82cdfb1db8e01d85f6a73f10226c8d7463028e259be4500ad172d7fa851899251d081396d6305d0b',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.12865066307',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.4111632',
        xrd_total_finalization_cost: '0.04125915',
        execution_cost_units_consumed: 8223264,
        finalization_cost_units_consumed: 825183
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
        to_burn: '0.290536506535',
        to_proposer: '0.1452682532675',
        to_validator_set: '0.1452682532675',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.58107301307',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1trxxyvyunef42h7pytezjptqvmvljuzzt9dzjjfptm4fr4pnpee283'
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
                  intent_hash: '101ae01a6cfbd39800e2bf710f48c14987a2880a5c1742c19473087f22f1c94d',
                  intent_hash_bech32m:
                    'txid_tdx_2_1zqdwqxnvl0fesq8zhacs7jxpfxr69zq2tst59sv5wvy87gh3e9xsxee8rq'
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
                key_hex: '5c200720101ae01a6cfbd39800e2bf710f48c14987a2880a5c1742c19473087f22f1c94d',
                key_type: 'Map',
                db_sort_key_hex:
                  '0ba5739f79aaa5482fe8054cfa690755204f15175c200720101ae01a6cfbd39800e2bf710f48c14987a2880a5c1742c19473087f22f1c94d'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 120
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
                    hex: '5c0c203231363834303838303965303464663238333164663137306538343265623334',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c2104a0000064a7b3b6e00d00000000000000000000000000000000a0000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000',
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
                key_hex: '5c0c203231363834303838303965303464663238333164663137306538343265623334',
                key_type: 'Map',
                db_sort_key_hex:
                  '4711be878310738b4e7008fa53634e56367dfc4b5c0c203231363834303838303965303464663238333164663137306538343265623334'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kzfcx8nu6j7w5ysfrw5trfyjue2rl9etc8305prqvdn38hns5x9uwx',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: '09f1596187afce8aebb95dd0580749ee7b7c07973bbaecdd444212119204a3a0',
                local_type_id: {
                  id: 9,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0900000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p55l3syf2lukjyy6srelrq6mpd5vf3u7lqy77wtnp6n2zvku8xf3d6'
              },
              value_full_type_id: {
                schema_hash: '09f1596187afce8aebb95dd0580749ee7b7c07973bbaecdd444212119204a3a0',
                local_type_id: {
                  id: 16,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a1000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'package_tdx_2_1p55l3syf2lukjyy6srelrq6mpd5vf3u7lqy77wtnp6n2zvku8xf3d6'
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
                      xrd_amount: '0.2623119929325',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.2762233966225',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '0.8648282425025',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '12.244858676665',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.4957030903925',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.3169589003925',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.2414807861825',
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
                      xrd_amount: '0.2623119929325',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.2762233966225',
                      validator_index: {
                        index: 6
                      }
                    },
                    {
                      xrd_amount: '0.8648282425025',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '12.244858676665',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.4957030903925',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.3169589003925',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.096212532915',
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
                  total_supply: '1237'
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
                'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '1238'
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
                  amount: '6.25503611438'
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
                'internal_vault_tdx_2_1trxxyvyunef42h7pytezjptqvmvljuzzt9dzjjfptm4fr4pnpee283',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '6.83610912745'
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
                  amount: '4'
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
                'internal_vault_tdx_2_1tq5hd7nceq8ehhp55y75mqeg480fnqht3kqk7hxp5jh95smu8g9lcd',
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
                  amount: '29.404730172253188558'
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
                  amount: '29.114193665718188558'
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
          hex: '5c90f83a37a50835b57f50f0207c7c76bdc67a721fcbd9f80b03e9701857cf55',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8e42e1b40ddec63042f4ba784e5942094cb680bde9ebdd605bfb399b0d2',
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
                'internal_vault_tdx_2_1trxxyvyunef42h7pytezjptqvmvljuzzt9dzjjfptm4fr4pnpee283'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'LockFeeEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.7221990290435'
              }
            ]
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
                'internal_vault_tdx_2_1tq5hd7nceq8ehhp55y75mqeg480fnqht3kqk7hxp5jh95smu8g9lcd'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'WithdrawEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '1'
              }
            ]
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
                'account_tdx_2_12yul0dswac56efewp48yw0y85fx32pfdauflkzcsty3exzhmre9lcf'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Enum',
            type_name: 'WithdrawEvent',
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                kind: 'Reference',
                type_name: 'ResourceAddress',
                value: 'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn'
              },
              {
                kind: 'Decimal',
                value: '1'
              }
            ]
          }
        },
        {
          name: 'GiftBoxesOpenedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: `${addresses.components.giftBoxOpenerV2}`
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'GiftBoxesOpenedEvent',
            fields: [
              {
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id',
                value: '2168408809e04df2831df170e842eb34'
              },
              {
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'resource_address',
                value: 'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn'
              },
              {
                kind: 'Decimal',
                field_name: 'quantity',
                value: '1'
              }
            ]
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
                'resource_tdx_2_1t568knmvq09c366vgqxx2v8wu0nfag2q8m4smrtmza0etnys90p9qn'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '1'
              }
            ]
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
                'internal_vault_tdx_2_1trxxyvyunef42h7pytezjptqvmvljuzzt9dzjjfptm4fr4pnpee283'
            },
            object_module_id: 'Main'
          },
          data: {
            kind: 'Tuple',
            type_name: 'PayFeeEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.58107301307'
              }
            ]
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
            kind: 'Tuple',
            type_name: 'DepositEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.290536506535'
              }
            ]
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
            kind: 'Tuple',
            type_name: 'BurnFungibleResourceEvent',
            fields: [
              {
                kind: 'Decimal',
                field_name: 'amount',
                value: '0.290536506535'
              }
            ]
          }
        }
      ]
    },
    manifest_classes: ['General'],
    balance_changes: {
      fungible_fee_balance_changes: [
        {
          type: 'FeePayment',
          entity_address: 'account_tdx_2_12xdqnkw0u3z7xzrvtyj8kzv66vzt9ynt2ase7xcxgmzdy3248mplj3',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.66281275595'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.331406377975'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12xdqnkw0u3z7xzrvtyj8kzv66vzt9ynt2ase7xcxgmzdy3248mplj3',
          resource_address:
            'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
          balance_change: '-1'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

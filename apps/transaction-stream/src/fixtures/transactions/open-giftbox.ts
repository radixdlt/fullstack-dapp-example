// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

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
        xrd_total_storage_cost: '0.11110305595',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.5154523',
        xrd_total_finalization_cost: '0.0362574',
        execution_cost_units_consumed: 10309046,
        finalization_cost_units_consumed: 725148
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
        to_burn: '0.331406377975',
        to_proposer: '0.1657031889875',
        to_validator_set: '0.1657031889875',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.66281275595',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tryfzsghlrwj5tge358s4gya3rfhakkdft27letlxuthqv2da0kerf'
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
                  intent_hash: 'c3fb726bdeaf8ba0803874d3194ac1ba751ec4bb8a6bf6b998d80ece4ec82032',
                  intent_hash_bech32m:
                    'txid_tdx_2_1c0ahy6774796pqpcwnf3jjkphf63a39m3f4ldwvcmq8vunkgyqeq3hv8ht'
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
                key_hex: '5c200720c3fb726bdeaf8ba0803874d3194ac1ba751ec4bb8a6bf6b998d80ece4ec82032',
                key_type: 'Map',
                db_sort_key_hex:
                  'eff9426779ab7b575836e6638776ed22f3d148cf5c200720c3fb726bdeaf8ba0803874d3194ac1ba751ec4bb8a6bf6b998d80ece4ec82032'
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
                      xrd_amount: '1.073896645355',
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
                  total_supply: '23'
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
                'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '24'
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
                  amount: '9999.33718724405'
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
                'internal_vault_tdx_2_1tryfzsghlrwj5tge358s4gya3rfhakkdft27letlxuthqv2da0kerf',
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
                'internal_vault_tdx_2_1tpjsd3e658hwa5z25c4cvusy685aym5fgkch9qp0azd7g450zwcecx',
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
                  amount: '9.343157658878568261'
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
                  amount: '9.011751280903568261'
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
          hex: '5c90f836c400e6faf1a77bc8ea1217d0622988454af646c42d23ed7930452ae0',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8a0308ec748e635af99e5190c40270710504ede7da473d14012d4123a78',
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
                'internal_vault_tdx_2_1tryfzsghlrwj5tge358s4gya3rfhakkdft27letlxuthqv2da0kerf'
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
                'internal_vault_tdx_2_1tpjsd3e658hwa5z25c4cvusy685aym5fgkch9qp0azd7g450zwcecx'
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
              is_global: true,
              entity_type: 'GlobalVirtualEd25519Account',
              entity_address:
                'account_tdx_2_12xdqnkw0u3z7xzrvtyj8kzv66vzt9ynt2ase7xcxgmzdy3248mplj3'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'GiftBoxOpenedEvent',
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
              },
              {
                value: 'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5',
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'resource_address'
              },
              {
                value: '1',
                kind: 'Decimal',
                field_name: 'quantity'
              }
            ],
            kind: 'Tuple',
            type_name: 'GiftBoxOpenedEvent'
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
                'resource_tdx_2_1t5nswz4tv90cr67h5cn8hpw62zvs50u90s2hqayqjtw3s9x3t584k5'
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
            type_name: 'BurnFungibleResourceEvent'
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
                'internal_vault_tdx_2_1tryfzsghlrwj5tge358s4gya3rfhakkdft27letlxuthqv2da0kerf'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.66281275595',
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
                value: '0.331406377975',
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
                value: '0.331406377975',
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

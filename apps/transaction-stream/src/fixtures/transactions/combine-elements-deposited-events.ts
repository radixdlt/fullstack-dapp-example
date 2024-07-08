// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 28511304,
    epoch: 14637,
    round: 504,
    round_timestamp: '2024-07-04T18:17:34.909Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1njm494fn0k62kldkttaev9f4a5ww4wynu8fqektzk03fyvtxt9hsfsan0t',
    intent_hash: 'txid_tdx_2_16g6zvk50hmejzz6l2jy7g0wqpq5vz58mdzr4m4apw3plqqsm3n3s5zc4x5',
    fee_paid: '0.64961881333',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      addresses.resources.radgemAddress,
      'account_tdx_2_129kjd8vfcn29emc0attwtxm4272duqmc595du57pgp5wk875z8hljj'
    ],
    confirmed_at: '2024-07-04T18:17:34.909Z',
    raw_hex:
      '4d22030221022104210707020a2d390000000000000a2f3900000000000009f3ecf0e7220101200720fa746ee55fba98e0ddb5bf5305053569d651e935478acc8b81cce4c9218ef2fd010108000020220641038000516d269d89c4d45cef0fead6e59b755794de0378a168de53c14068eb1fd40c086c6f636b5f6665652101850000e8890423c78a0000000000000000000000000000000041038000516d269d89c4d45cef0fead6e59b755794de0378a168de53c14068eb1fd40c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009a2bc38bbe57d55027af003255b49cd99eca1f5ae0a6383b3b8589e938ad20870100203161396161376139383865383439623839306230383936626136663635393032100041038000516d269d89c4d45cef0fead6e59b755794de0378a168de53c14068eb1fd40c087769746864726177210280005d4ae0977bf3e6276afb32e0711eabb79a7629b8be56785c2853595910a0850000e8890423c78a00000000000000000000000000000000020180005d4ae0977bf3e6276afb32e0711eabb79a7629b8be56785c2853595910a041038000c03fa729fe80ff3ccb412aa60889532ae618fd7342befdd5e0fdd321fb830c18636f6d62696e655f656c656d656e74735f6465706f7369742102820000000081000000002020002200002022010102200720fa746ee55fba98e0ddb5bf5305053569d651e935478acc8b81cce4c9218ef2fd210120074066bcfffc81d6de0f03749fb46df3f401f2c2bbbb42307ae478f6f80a71b643da8fb0a6bf1458386c270113c143ead7e16f5124a62fdcd969be0738e0fd1af5012201012101200740f2193e90998652006f28d46405ac8a256d05329d49910254696115328d0e4bb8f3455421db8e40fd3a894ec2d76f1425d76ea98483084e98f81e4bba4e280500',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.10786056333',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.51050365',
        xrd_total_finalization_cost: '0.0312546',
        execution_cost_units_consumed: 10210073,
        finalization_cost_units_consumed: 625092
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
        to_burn: '0.324809406665',
        to_proposer: '0.1624047033325',
        to_validator_set: '0.1624047033325',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.64961881333',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpsaxzy83d25pwj0vmsw84q2twgsj9m3nl30gkkla08mc6c76as4xu'
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
                  intent_hash: 'd234265a8fbef3210b5f5489e43dc00828c150fb68875dd7a17443f0021b8ce3',
                  intent_hash_bech32m:
                    'txid_tdx_2_16g6zvk50hmejzz6l2jy7g0wqpq5vz58mdzr4m4apw3plqqsm3n3s5zc4x5'
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
                key_hex: '5c200720d234265a8fbef3210b5f5489e43dc00828c150fb68875dd7a17443f0021b8ce3',
                key_type: 'Map',
                db_sort_key_hex:
                  'f51c1fec4c5e691698ac04d85609c66e383413925c200720d234265a8fbef3210b5f5489e43dc00828c150fb68875dd7a17443f0021b8ce3'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 211
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
                      xrd_amount: '0.2289139562925',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.26252530866',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.887476841065',
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
                      xrd_amount: '0.2289139562925',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.26252530866',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.7250721377325',
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
                  total_supply: '10303'
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
              entity_address: addresses.resources.radgemAddress,
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '10313'
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
                  amount: '9999.35038118667'
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
                'internal_vault_tdx_2_1tpsaxzy83d25pwj0vmsw84q2twgsj9m3nl30gkkla08mc6c76as4xu',
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
                'internal_vault_tdx_2_1tr5md8c30pe0vs7nq2e89wv9e9sjwx2pzm4789xw87v8z88vfwstph',
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
                  amount: '2.757832215000956618'
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
                  amount: '2.433022808335956618'
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
          hex: '5c90f8a4dd5d71767717f30a54c73617b03f0666fb0fd16d55ed7a65ebeb71f6',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8b3d8a896006e9f0e5d866d84e78a3dc961a45b1392adfa8025a55338f7',
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
                'internal_vault_tdx_2_1tpsaxzy83d25pwj0vmsw84q2twgsj9m3nl30gkkla08mc6c76as4xu'
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
          name: 'WithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tr5md8c30pe0vs7nq2e89wv9e9sjwx2pzm4789xw87v8z88vfwstph'
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
                'account_tdx_2_129kjd8vfcn29emc0attwtxm4272duqmc595du57pgp5wk875z8hljj'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: addresses.resources.radgemAddress,
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '10',
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
              entity_address: addresses.resources.radgemAddress
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
            type_name: 'BurnFungibleResourceEvent'
          }
        },
        {
          name: 'CombineElementsDepositedEvent',
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
                value: '1a9aa7a988e849b890b0896ba6f65902',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'CombineElementsDepositedEvent'
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
                'internal_vault_tdx_2_1tpsaxzy83d25pwj0vmsw84q2twgsj9m3nl30gkkla08mc6c76as4xu'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.64961881333',
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
                value: '0.324809406665',
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
                value: '0.324809406665',
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
          entity_address: 'account_tdx_2_129kjd8vfcn29emc0attwtxm4272duqmc595du57pgp5wk875z8hljj',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.64961881333'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.324809406665'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_129kjd8vfcn29emc0attwtxm4272duqmc595du57pgp5wk875z8hljj',
          resource_address: addresses.resources.radgemAddress,
          balance_change: '-10'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

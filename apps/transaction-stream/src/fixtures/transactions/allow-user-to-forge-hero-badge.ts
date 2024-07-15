// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 32909788,
    epoch: 16924,
    round: 1296,
    round_timestamp: '2024-07-12T16:54:49.75Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1hnqleg5c5x33q9qythw0jezf6pjlenuae8hghkejs3hjcsacu62src5q6j',
    intent_hash: 'txid_tdx_2_19z3g30s26j47rt85mspkygxyk2gtrm207sskf8zq0lccynv9ne9srfntk3',
    fee_paid: '0.67420151893',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      addresses.components.heroBadgeForge,
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_12yytw8a6z570f43fecznvayhvfdmh5ctvpkft8pzsnjdqzdjt5azt0'
    ],
    confirmed_at: '2024-07-12T16:54:49.75Z',
    raw_hex:
      '4d22030221022104210707020a1c420000000000000a1e420000000000000910a90d3b22010120072059049a586bdfc2cd90b3092521bbf23c4880c2310800ac75d0b2baff29044bc4010108000020220541038000c368ae579fe9e8a06b5455172534c4735178dcff865fc086d522c0b3b0720c0c6372656174655f70726f6f66210041038000c377326b749620301ddd949be31d8fb3cd5d54db300fbaac1dcbc45260df0c0c6372656174655f70726f6f662100410380005108b71fba153cf4d629ce05367497625bbbd30b606c959c2284e4d009b20c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005117ad8600c385dcc1865d3a3ffe12078e67065db7c027673ec33a7266540c166372656174655f70726f6f665f6f665f616d6f756e74210280005d46451539dd773f2624c8d60517afdf0895597ca50a2b03aff5ff95f15185000064a7b3b6e00d0000000000000000000000000000000041038000c05430d4505c78ba71ca0e0fecb1e7f1de7ae293ad67d9e4c6897878dd1c0c106164645f757365725f6163636f756e742102800051ebafefad708156986950e033d2a6292e75baa0f1cc9c07f80ed4259bb20c203536633263366565643039333433383562656166633631623833363862666138202000220000202202010220072080d28c8cb4f51c479def1dbc5b64bff55e6b8fb4b14cacb3dce59a6dc92e3fcf2101200740257607ca2440614e70e7609e4108274b3656776afc6a22052650e15d158ca807b808cf577d24a443751df9ac9c8fcc84784e6d49956ac77cb390ca9adc27380801022007200ba8ab972cb010f24646e44ede724feabbb559476d0018ef5564ad9be7dd48b32101200740909fd5289b0431ec13b997fbb9467c770ad90ef72b0cab477898e4a01076536e8a01f812f12b7e8bc6bd8aa597b4d0cb8c0acfc57b284d68c3db7290cc3c12052201012101200740ff2f7e7661884652f1b963bd5f98e84b534c49efde325fed7562af2de81c6e46b431615348c34c51175fc770d48a59afdd7afbcc22df33758161e73901a26304',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.10023116893',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.5334657',
        xrd_total_finalization_cost: '0.04050465',
        execution_cost_units_consumed: 10669314,
        finalization_cost_units_consumed: 810093
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
        to_burn: '0.337100759465',
        to_proposer: '0.1685503797325',
        to_validator_set: '0.1685503797325',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.67420151893',
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
                  intent_hash: '28a288be0ad4abe1acf4dc036220c4b290b1ed4ff421649c407ff1824d859e4b',
                  intent_hash_bech32m:
                    'txid_tdx_2_19z3g30s26j47rt85mspkygxyk2gtrm207sskf8zq0lccynv9ne9srfntk3'
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
                key_hex: '5c20072028a288be0ad4abe1acf4dc036220c4b290b1ed4ff421649c407ff1824d859e4b',
                key_type: 'Map',
                db_sort_key_hex:
                  'f6e06d902acd0d7ddcfdd071acc207c6733486435c20072028a288be0ad4abe1acf4dc036220c4b290b1ed4ff421649c407ff1824d859e4b'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 234
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
                    hex: '5c8051ebafefad708156986950e033d2a6292e75baa0f1cc9c07f80ed4259bb2',
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
            substate_id: {
              entity_type: 'InternalKeyValueStore',
              substate_key: {
                key_hex: '5c8051ebafefad708156986950e033d2a6292e75baa0f1cc9c07f80ed4259bb2',
                key_type: 'Map',
                db_sort_key_hex:
                  '932581d196e6e087dd6769da5eb471ee9fd4a2045c8051ebafefad708156986950e033d2a6292e75baa0f1cc9c07f80ed4259bb2'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kr7ps5xavj6uaykj9728rd2fylp87lplvr6epwpdrqhkr9h5899pqd',
              partition_kind: 'KeyValue',
              partition_number: 64
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
                  'internal_keyvaluestore_tdx_2_1kr7ps5xavj6uaykj9728rd2fylp87lplvr6epwpdrqhkr9h5899pqd'
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
                  'internal_keyvaluestore_tdx_2_1kr7ps5xavj6uaykj9728rd2fylp87lplvr6epwpdrqhkr9h5899pqd'
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
                      xrd_amount: '1.2357904772975',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.3938060277375',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.297365058205',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.456676209615',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1312686759125',
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
                      xrd_amount: '1.067240097565',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.3938060277375',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '1.297365058205',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.456676209615',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.1312686759125',
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
                  amount: '81321.97100889172'
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
                  amount: '81322.64521041065'
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
                  amount: '7.029812900407448762'
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
                  amount: '6.692712140942448762'
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
          hex: '5c90f8d20abc661ac6c024173e8145b77d7225d97510e5a842176d46b446fc85',
          programmatic_json: null
        },
        {
          hex: '5c90f8232bebd7bddfc0fde7527e4f7dafa43c1686f93c4bbdac3fd14984f52f',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8b5c0386c3cbeb27c85a3504c6a6fe9d3d5537cbc90462ca3f4a77ef144',
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
          name: 'AccountAddedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.heroBadgeForge
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'account_tdx_2_12846lmadwzq4dxrf2rsr854x9yh8tw4q78xfcplcpm2ztxajsn4yhd',
                kind: 'Reference',
                type_name: 'GlobalAccount',
                field_name: 'account'
              },
              {
                value: '56c2c6eed0934385beafc61b8368bfa8',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'AccountAddedEvent'
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
                value: '0.67420151893',
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
                value: '0.337100759465',
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
                value: '0.337100759465',
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
          balance_change: '-0.67420151893'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.337100759465'
        }
      ],
      fungible_balance_changes: [],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

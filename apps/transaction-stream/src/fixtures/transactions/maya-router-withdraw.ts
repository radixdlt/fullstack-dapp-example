// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 123613079,
    epoch: 128321,
    round: 642,
    round_timestamp: '2024-08-27T05:47:14.871Z',
    payload_hash:
      'notarizedtransaction_rdx17f7smagrs8fddwaryhqklc2qar7ucdlw50j7j2hcvt3mfmn54t7sf44fka',
    intent_hash: 'txid_rdx1r47myeekct87uffe5rwc8ttc5eylgapj6hqw4jwceqff4kt4jl2qlr32ax',
    fee_paid: '0.63478182745',
    affected_global_entities: [
      'transactiontracker_rdx1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxtxtrak',
      'consensusmanager_rdx1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxcnsmgr',
      'component_rdx1cp7hrk7k0pjavnpt5h6dsel096kzlj96r8ukw2ywqgdc5tlvpvn0as',
      'account_rdx129vh7tezwwr473q5f36nk46lcl6axlafakzfvuaa39mksh2waljx96'
    ],
    confirmed_at: '2024-08-27T05:47:14.871Z',
    raw_hex:
      '4d22030221022104210707010a41f50100000000000a43f5010000000000092eb77200220001200721039add51b1cfa88a6f71af84e2043a6fdfbd909b1c75c2a80fd4629caddf6a0b53010108000020220441038000c07d71dbd67865d64c2ba5f4d867ef2eac2fc8ba19f967288e021b8a2fec0c086c6f636b5f66656521028000d12b26439a97d9f19741bb9ae88ebd44ce1234c5d0d3a8f2c7434cb31df58500006e67435a15680000000000000000000000000000000041038000c07d71dbd67865d64c2ba5f4d867ef2eac2fc8ba19f967288e021b8a2fec0c08776974686472617721068000d12b26439a97d9f19741bb9ae88ebd44ce1234c5d0d3a8f2c7434cb31df580005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6800051597f2f2273875f44144c753b575fc7f5d37fa9ed849673bd8977685d4e2200008500bcb455a6a44e65080000000000000000000000000000000c444f55543a46344632313944433744344546463645364345334633333043443735423130393238323531374639333238374635333243443532464136364444324442374439020180005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c641038000c07d71dbd67865d64c2ba5f4d867ef2eac2fc8ba19f967288e021b8a2fec0c087472616e736665722102800051597f2f2273875f44144c753b575fc7f5d37fa9ed849673bd8977685d4e810000000020200022010121020c002200010c0020220022000121012007410102da9ef52631bfec13da77fe2d58efeb1931d0fedb86d9fb1bbccd0a5498291823552c187cbdaec23365b4cf6a170aa3a3f30f226b19d00599e47f6d6ab199a5',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.11587142745',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.4926534',
        xrd_total_finalization_cost: '0.026257',
        execution_cost_units_consumed: 9853068,
        finalization_cost_units_consumed: 525140
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
        to_burn: '0.317390913725',
        to_proposer: '0.1586954568625',
        to_validator_set: '0.1586954568625',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.63478182745',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_rdx1tr6s46dcqpsasz345rpxpugen6yrhnjfzxgte8ydldgczklvh63rf0'
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
                  intent_hash: '1d7db26736c2cfee2539a0dd83ad78a649f47432d5c0eac9d8c8129ad97597d4',
                  intent_hash_bech32m:
                    'txid_rdx1r47myeekct87uffe5rwc8ttc5eylgapj6hqw4jwceqff4kt4jl2qlr32ax'
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
                key_hex: '5c2007201d7db26736c2cfee2539a0dd83ad78a649f47432d5c0eac9d8c8129ad97597d4',
                key_type: 'Map',
                db_sort_key_hex:
                  'f9f31d74bee92271f804c1160e66d8daca59537f5c2007201d7db26736c2cfee2539a0dd83ad78a649f47432d5c0eac9d8c8129ad97597d4'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_rdx1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxtxtrak',
              partition_kind: 'KeyValue',
              partition_number: 66
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
                    'package_rdx1pkgxxxxxxxxxtxtrakxxxxxxxxx000595975309xxxxxxxxxtxtrak'
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
                    'package_rdx1pkgxxxxxxxxxtxtrakxxxxxxxxx000595975309xxxxxxxxxtxtrak'
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
                      'internal_vault_rdx1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhzcw3fr'
                  },
                  proposer_rewards: [
                    {
                      xrd_amount: '0.2234533814775',
                      validator_index: {
                        index: 59
                      }
                    },
                    {
                      xrd_amount: '0.187698060805',
                      validator_index: {
                        index: 36
                      }
                    },
                    {
                      xrd_amount: '0.1318155037375',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.152891271495',
                      validator_index: {
                        index: 23
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 37
                      }
                    },
                    {
                      xrd_amount: '0.1318155037375',
                      validator_index: {
                        index: 57
                      }
                    },
                    {
                      xrd_amount: '0.1938756015125',
                      validator_index: {
                        index: 93
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 63
                      }
                    },
                    {
                      xrd_amount: '0.1586954568625',
                      validator_index: {
                        index: 25
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
                'consensusmanager_rdx1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxcnsmgr',
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
                      'internal_vault_rdx1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhzcw3fr'
                  },
                  proposer_rewards: [
                    {
                      xrd_amount: '0.2234533814775',
                      validator_index: {
                        index: 59
                      }
                    },
                    {
                      xrd_amount: '0.187698060805',
                      validator_index: {
                        index: 36
                      }
                    },
                    {
                      xrd_amount: '0.1318155037375',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.152891271495',
                      validator_index: {
                        index: 23
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 37
                      }
                    },
                    {
                      xrd_amount: '0.1318155037375',
                      validator_index: {
                        index: 57
                      }
                    },
                    {
                      xrd_amount: '0.1938756015125',
                      validator_index: {
                        index: 93
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.1622876466825',
                      validator_index: {
                        index: 63
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
                    'package_rdx1pkgxxxxxxxxxcnsmgrxxxxxxxxx000746305335xxxxxxxxxcnsmgr'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '1820.62004972295'
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
                'internal_vault_rdx1tr6s46dcqpsasz345rpxpugen6yrhnjfzxgte8ydldgczklvh63rf0',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '1976.1287372204'
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
                    'package_rdx1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxresrce'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '224.610630278191390827'
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
                'internal_vault_rdx1tpcut4rcef7sv93mhznmavs08elh7u9ddqndedu2ghdmjlf9numy2a',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '69.736724608191390827'
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
                    'package_rdx1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxresrce'
                }
              }
            }
          },
          {
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '3.326395783194464592'
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
                'internal_vault_rdx1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhzcw3fr',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '3.009004869469464592'
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
                    'package_rdx1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxresrce'
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
          hex: '5c90f83e21448efc7c0d2a8ef4a8cb9d86ae999d4222fafdf77ff9739d9f548e',
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
                'internal_vault_rdx1tr6s46dcqpsasz345rpxpugen6yrhnjfzxgte8ydldgczklvh63rf0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '7.5',
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
                'internal_vault_rdx1tr6s46dcqpsasz345rpxpugen6yrhnjfzxgte8ydldgczklvh63rf0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '154.87390567',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'MayaRouterWithdrawEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address: addresses.components.mayaRouter
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'account_rdx16y4jvsu6jlvlr96phwdw3r4agn8pydx96rf63uk8gdxtx8044ld3u9',
                kind: 'Reference',
                type_name: 'ComponentAddress',
                field_name: 'vault_address'
              },
              {
                value: 'account_rdx129vh7tezwwr473q5f36nk46lcl6axlafakzfvuaa39mksh2waljx96',
                kind: 'Reference',
                type_name: 'ComponentAddress',
                field_name: 'intended_recipient'
              },
              {
                value: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
                kind: 'Reference',
                type_name: 'ResourceAddress',
                field_name: 'resource_address'
              },
              {
                value: '154.87390567',
                kind: 'Decimal',
                field_name: 'amount'
              },
              {
                value: 'OUT:F4F219DC7D4EFF6E6CE3F330CD75B109282517F93287F532CD52FA66DD2DB7D9',
                kind: 'String',
                field_name: 'memo'
              },
              {
                variant_id: 0,
                variant_name: 'None',
                fields: [],
                kind: 'Enum',
                type_name: 'Option',
                field_name: 'aggregator'
              }
            ],
            kind: 'Tuple',
            type_name: 'MayaRouterWithdrawEvent'
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
                'internal_vault_rdx1tpcut4rcef7sv93mhznmavs08elh7u9ddqndedu2ghdmjlf9numy2a'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '154.87390567',
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
              entity_address: 'account_rdx129vh7tezwwr473q5f36nk46lcl6axlafakzfvuaa39mksh2waljx96'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '154.87390567',
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
                'internal_vault_rdx1tr6s46dcqpsasz345rpxpugen6yrhnjfzxgte8ydldgczklvh63rf0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.63478182745',
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
                'internal_vault_rdx1tpsesv77qvw782kknjks9g3x2msg8cc8ldshk28pkf6m6lkhzcw3fr'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.317390913725',
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
              entity_address: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.317390913725',
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
    message: {
      type: 'Plaintext',
      content: {
        type: 'String',
        value: ''
      },
      mime_type: ''
    },
    balance_changes: {
      fungible_fee_balance_changes: [
        {
          type: 'FeePayment',
          entity_address: 'component_rdx1cp7hrk7k0pjavnpt5h6dsel096kzlj96r8ukw2ywqgdc5tlvpvn0as',
          resource_address: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
          balance_change: '-0.63478182745'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_rdx1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxcnsmgr',
          resource_address: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
          balance_change: '0.317390913725'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'component_rdx1cp7hrk7k0pjavnpt5h6dsel096kzlj96r8ukw2ywqgdc5tlvpvn0as',
          resource_address: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
          balance_change: '-154.87390567'
        },
        {
          entity_address: 'account_rdx129vh7tezwwr473q5f36nk46lcl6axlafakzfvuaa39mksh2waljx96',
          resource_address: 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd',
          balance_change: '154.87390567'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

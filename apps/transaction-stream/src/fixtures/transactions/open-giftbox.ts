// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 31106413,
    epoch: 15972,
    round: 1600,
    round_timestamp: '2024-07-09T09:35:14.286Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1lfmgdsrm7n7jewmad5crw350s376hldwrtyvtw5e0kulskg9v92qfu9nwg',
    intent_hash: 'txid_tdx_2_1qzmv4yszvum4dza0m648az5h6873ac7gpv9xq3ssjcfgwfjqmw6q7x34he',
    fee_paid: '0.66169215595',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5',
      'account_tdx_2_12xgmcupnz8lsrjwkramyeq6zjjgkertzu2x40dnmvm7nf6yvyn9rrf'
    ],
    confirmed_at: '2024-07-09T09:35:14.286Z',
    raw_hex:
      '4d22030221022104210707020a643e0000000000000a663e00000000000009725a9c63220101200720f839e43c7c9355a7adda1c7d15821249e370704100b6beca17bc0fbd512e272c0101080000202206410380005191bc703311ff01c9d61f764c834294916c8d62e28d57b67b66fd34e88c0c086c6f636b5f666565210185000088b116afe3b502000000000000000000000000000000410380005191bc703311ff01c9d61f764c834294916c8d62e28d57b67b66fd34e88c0c1d6372656174655f70726f6f665f6f665f6e6f6e5f66756e6769626c6573210280009a7ac7d11a5cf8cbac371697e1b0ee0c319b9ef7aed14ef1bac3ca5d36dc208701002061376165353461373933316334663138626262623731316462623263373063631000410380005191bc703311ff01c9d61f764c834294916c8d62e28d57b67b66fd34e88c0c087769746864726177210280005d372221440cea6c104aaa4d9f81b81ac2cc7510ea4eedbe1faecda7801e85000064a7b3b6e00d00000000000000000000000000000000020180005d372221440cea6c104aaa4d9f81b81ac2cc7510ea4eedbe1faecda7801e41038000c0584821347ed679acf8996d11363069cd03d454aab15ff577623c0288860c0d6f70656e5f676966745f626f782102820000000081000000002020002200002022010102200720a0a31067a1c031f95580efa6228cca04c842cb39b2382ce0e7ce5a0647e4dca0210120074076858937a65dcba61293d3a54a19e380a8ecb387007ad01c3d4b4f579d1bef49b64fe430221e190bdd168f219176a5945e99b5698d1e51ee16a4d87d29d464012201012101200740280f09b0012bfa643588f71d72d52b4334d42aefaa086b4bd3b689a7b5ddb57a72581e63edc4f51ed5574118655df104de2a056c9f67639a8babc9ced620630b',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.11110305595',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.5143317',
        xrd_total_finalization_cost: '0.0362574',
        execution_cost_units_consumed: 10286634,
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
        to_burn: '0.330846077975',
        to_proposer: '0.1654230389875',
        to_validator_set: '0.1654230389875',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.66169215595',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tzn2psnh838yhesj4gl3qk8ugym5rrktck9qjs9j04x35776sfrrh0'
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
                  intent_hash: '00b6ca92026737568bafdeaa7e8a97d1fd1ee3c80b0a6046109612872640dbb4',
                  intent_hash_bech32m:
                    'txid_tdx_2_1qzmv4yszvum4dza0m648az5h6873ac7gpv9xq3ssjcfgwfjqmw6q7x34he'
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
                key_hex: '5c20072000b6ca92026737568bafdeaa7e8a97d1fd1ee3c80b0a6046109612872640dbb4',
                key_type: 'Map',
                db_sort_key_hex:
                  '16d36ce10206fd723be7eefa81e3f3a1961955055c20072000b6ca92026737568bafdeaa7e8a97d1fd1ee3c80b0a6046109612872640dbb4'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 224
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
                      xrd_amount: '0.78168105563',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.065865905185',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.73782739623',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.538269493135',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.11190481116',
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
                      xrd_amount: '0.78168105563',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '1.065865905185',
                      validator_index: {
                        index: 1
                      }
                    },
                    {
                      xrd_amount: '0.73782739623',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '1.3728464541475',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.11190481116',
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
                  total_supply: '10'
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
                'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '11'
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
                  amount: '9999.33830784405'
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
                'internal_vault_tdx_2_1tzn2psnh838yhesj4gl3qk8ugym5rrktck9qjs9j04x35776sfrrh0',
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
                'internal_vault_tdx_2_1trtpu0868wyuv5a8zryysyxvmuzwrpl3yap25fhhpqgcp88luhqj9j',
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
                  amount: '8.471097325419184182'
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
                  amount: '8.140251247444184182'
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
          hex: '5c90f8ecf2355d32a02de8d253e57faf811f3c8a58f38c6a9fd076690e0a3306',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8a5a8a707abdd0cd0b2ee7a02d5ffede9315f5b9d3805ddcf9d7dca91df',
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
                'internal_vault_tdx_2_1tzn2psnh838yhesj4gl3qk8ugym5rrktck9qjs9j04x35776sfrrh0'
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
                'internal_vault_tdx_2_1trtpu0868wyuv5a8zryysyxvmuzwrpl3yap25fhhpqgcp88luhqj9j'
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
                'account_tdx_2_12xgmcupnz8lsrjwkramyeq6zjjgkertzu2x40dnmvm7nf6yvyn9rrf'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5',
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
                value: 'a7ae54a7931c4f18bbbb711dbb2c70cc',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: addresses.resources.giftBox.starter,
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
                'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5'
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
                'internal_vault_tdx_2_1tzn2psnh838yhesj4gl3qk8ugym5rrktck9qjs9j04x35776sfrrh0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.66169215595',
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
                value: '0.330846077975',
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
                value: '0.330846077975',
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
          entity_address: 'account_tdx_2_12xgmcupnz8lsrjwkramyeq6zjjgkertzu2x40dnmvm7nf6yvyn9rrf',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.66169215595'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.330846077975'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_12xgmcupnz8lsrjwkramyeq6zjjgkertzu2x40dnmvm7nf6yvyn9rrf',
          resource_address:
            'resource_tdx_2_1t5mjyg2ypn4xcyz24fxelqdcrtpvcagsaf8wm0sl4mx60qq72xl3j5',
          balance_change: '-1'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

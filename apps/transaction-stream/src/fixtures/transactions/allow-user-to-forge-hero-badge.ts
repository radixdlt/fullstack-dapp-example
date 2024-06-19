// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 19791587,
    epoch: 10179,
    round: 812,
    round_timestamp: '2024-06-19T06:48:34.515Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1f9ukfxsgpslx3trva5klvunpdn472edneut94e028ynt3ax0rx8q5cc6ld',
    intent_hash: 'txid_tdx_2_16dh9rcnp20lnxmsm5l3vx0kcgj8ve26qe0wp3anastddw6vwaaasp4nyy6',
    fee_paid: '0.82035670528',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
      'component_tdx_2_1crk4rw6myf3g43cqpfq5nvzfcgt9vayklcvw4zhcqddpgjmyfamrhe',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t'
    ],
    confirmed_at: '2024-06-19T06:48:34.515Z',
    raw_hex:
      '4d22030221022104210707020ac3270000000000000ac5270000000000000973412a45220101200720461a2f88ac3c9dfde58610848fe9f7adab8cb3d92098fc953bdc0850b0820f7c01010800002022054103800051787173ed493bf48e73272c0478618ce1c62a1e3d1dce3d43659cf145e50c086c6f636b5f666565210185000088b116afe3b5020000000000000000000000000000004103800051e0a84f25141716879d584249f19f74d6c8406fbd2798f922e6d388e9530c166372656174655f70726f6f665f6f665f616d6f756e74210280005d806bfd7b1acc4d2e530a83568565624c4db1fb1819fced608978ced3ec85000064a7b3b6e00d0000000000000000000000000000000041038000c0ed51bb5b22628ac7000a4149b049c216567496fe18ea8af8035a144b640c106164645f757365725f6163636f756e742101800051f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff4103800051787173ed493bf48e73272c0478618ce1c62a1e3d1dce3d43659cf145e50c087769746864726177210280005da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6850000e8890423c78a000000000000000000000000000000004103800051f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff0c1a7472795f6465706f7369745f62617463685f6f725f61626f7274210283002200002020002200002022020102200720461a2f88ac3c9dfde58610848fe9f7adab8cb3d92098fc953bdc0850b0820f7c21012007408cab2f06f37cfc2b0e158e7b584feaffa744bd400f9ac7a604453fa10b54e01519d9c3d69ab9600780a8fa3e9381c4ea64bd28830ec6200107cadff283b481080102200720c63becd87e6f813d71e9a180b6bbff0b4763ef7ade51a69e0b250ad7cd16f7ee2101200740669e050dd25fef8230249d800c97c15893c98e851a46ae5015061f12530f1aee21292f8a5c9b66f3f4ae746c510933ff8ec646e26f91f8e73ec6e15ecd5b890722010121012007408d188c6433d5dce7d12b15a85c1c2b6deacece9274b9f596e59e55b231a5227f1b90b74a29b50b5aada65ef6f1f54f12827fe88f05d46e298d83d41557714500',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.23803710528',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.5155562',
        xrd_total_finalization_cost: '0.0667634',
        execution_cost_units_consumed: 10311124,
        finalization_cost_units_consumed: 1335268
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
        to_burn: '0.41017835264',
        to_proposer: '0.20508917632',
        to_validator_set: '0.20508917632',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.82035670528',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
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
                  intent_hash: 'd36e51e26153ff336e1ba7e2c33ed8448eccab40cbdc18f67d82dad7698eef7b',
                  intent_hash_bech32m:
                    'txid_tdx_2_16dh9rcnp20lnxmsm5l3vx0kcgj8ve26qe0wp3anastddw6vwaaasp4nyy6'
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
                key_hex: '5c200720d36e51e26153ff336e1ba7e2c33ed8448eccab40cbdc18f67d82dad7698eef7b',
                key_type: 'Map',
                db_sort_key_hex:
                  'c6179d23fc5cc111e2ab701546135fbcc39666a55c200720d36e51e26153ff336e1ba7e2c33ed8448eccab40cbdc18f67d82dad7698eef7b'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 166
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
                  name: 'owner_badge'
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c220b01c0021e51f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: true,
                substate_type: 'MetadataModuleEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                key_hex: '5c0c0b6f776e65725f6261646765',
                key_type: 'Map',
                db_sort_key_hex:
                  '7dc9a37ba09e088d1718351679bf215b8988e8b85c0c0b6f776e65725f6261646765'
              },
              entity_module: 'Metadata',
              substate_type: 'MetadataModuleEntry',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'KeyValue',
              partition_number: 2
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '07bfe5891cd05394fa30c6a67fab9208642f39665ca903f9405aff6b6fefb36a',
                  local_type_id: {
                    id: 12,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c220001070c',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxmtdataxxxxxxxxx005246577269xxxxxxxxxrpg925'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '07bfe5891cd05394fa30c6a67fab9208642f39665ca903f9405aff6b6fefb36a',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxmtdataxxxxxxxxx005246577269xxxxxxxxxrpg925'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  name: 'owner_keys'
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c228f01202201010120071df0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'MetadataModuleEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                key_hex: '5c0c0a6f776e65725f6b657973',
                key_type: 'Map',
                db_sort_key_hex:
                  'd7ce0cb39809d891545b74e1019672bc2de6a1a05c0c0a6f776e65725f6b657973'
              },
              entity_module: 'Metadata',
              substate_type: 'MetadataModuleEntry',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'KeyValue',
              partition_number: 2
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '07bfe5891cd05394fa30c6a67fab9208642f39665ca903f9405aff6b6fefb36a',
                  local_type_id: {
                    id: 12,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c220001070c',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxmtdataxxxxxxxxx005246577269xxxxxxxxxrpg925'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '07bfe5891cd05394fa30c6a67fab9208642f39665ca903f9405aff6b6fefb36a',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxmtdataxxxxxxxxx005246577269xxxxxxxxxrpg925'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  owner_role: {
                    rule: {
                      type: 'Protected',
                      access_rule: {
                        type: 'ProofRule',
                        proof_rule: {
                          type: 'Require',
                          requirement: {
                            type: 'NonFungible',
                            non_fungible: {
                              local_id: {
                                id_type: 'Bytes',
                                sbor_hex:
                                  '5cc0021df0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
                                simple_rep:
                                  '[f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff]'
                              },
                              resource_address:
                                'resource_tdx_2_1nfxxxxxxxxxxed25sgxxxxxxxxx002236757237xxxxxxxxx3e2cpa'
                            }
                          }
                        }
                      }
                    },
                    updater: 'Object'
                  }
                },
                is_locked: false,
                substate_type: 'RoleAssignmentModuleFieldOwnerRole'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'RoleAssignment',
              substate_type: 'RoleAssignmentModuleFieldOwnerRole',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'Field',
              partition_number: 5
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a06c16caa26e2fbc01ba2b9fe564a3f02d8f426c4580fcafebdff5464fefbde8',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxarulesxxxxxxxxx002304462983xxxxxxxxx9fe8ce'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  role_key: 'securify',
                  object_module_id: 'Main'
                },
                value: {
                  access_rule: {
                    type: 'Protected',
                    access_rule: {
                      type: 'ProofRule',
                      proof_rule: {
                        type: 'Require',
                        requirement: {
                          type: 'NonFungible',
                          non_fungible: {
                            local_id: {
                              id_type: 'Bytes',
                              sbor_hex:
                                '5cc0021df0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
                              simple_rep:
                                '[f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff]'
                            },
                            resource_address:
                              'resource_tdx_2_1nfxxxxxxxxxxed25sgxxxxxxxxx002236757237xxxxxxxxx3e2cpa'
                          }
                        }
                      }
                    }
                  }
                },
                is_locked: false,
                substate_type: 'RoleAssignmentModuleRuleEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                key_hex: '5c21022200000c087365637572696679',
                key_type: 'Map',
                db_sort_key_hex:
                  'daa6cc98f72dca9f6751a89a57083c0131e59c4a5c21022200000c087365637572696679'
              },
              entity_module: 'RoleAssignment',
              substate_type: 'RoleAssignmentModuleRuleEntry',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'KeyValue',
              partition_number: 6
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a06c16caa26e2fbc01ba2b9fe564a3f02d8f426c4580fcafebdff5464fefbde8',
                  local_type_id: {
                    id: 3,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0300000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxarulesxxxxxxxxx002304462983xxxxxxxxx9fe8ce'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a06c16caa26e2fbc01ba2b9fe564a3f02d8f426c4580fcafebdff5464fefbde8',
                  local_type_id: {
                    id: 4,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0400000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxarulesxxxxxxxxx002304462983xxxxxxxxx9fe8ce'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  default_deposit_rule: 'Accept'
                },
                is_locked: false,
                substate_type: 'AccountFieldState'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'AccountFieldState',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'Field',
              partition_number: 64
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a54510264dbd13e03ea7d6e3112d5f3a88c9bddae66b9569d5de381ba9447a8a',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20'
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  details: {
                    type: 'Object',
                    global: true,
                    blueprint_info: {
                      features: [],
                      outer_object: null,
                      blueprint_name: 'Account',
                      package_address:
                        'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20',
                      blueprint_version: '1.0.0',
                      generic_substitutions: []
                    },
                    module_versions: [
                      {
                        module: 'RoleAssignment',
                        version: '1.0.0'
                      },
                      {
                        module: 'Metadata',
                        version: '1.0.0'
                      }
                    ]
                  }
                },
                is_locked: false,
                substate_type: 'TypeInfoModuleFieldTypeInfo'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo'
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  resource_address:
                    'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc'
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1tzgzu673k6ys9d0890mvnmezpnvjt6sp0n6r2fhngxg4lqm7ddusj8'
                  }
                },
                is_locked: false,
                substate_type: 'AccountVaultEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalVirtualEd25519Account',
              substate_key: {
                key_hex: '5c805da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6',
                key_type: 'Map',
                db_sort_key_hex:
                  '9d045d474364851145b0eae5a1584d59c517aca25c805da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
              partition_kind: 'KeyValue',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a54510264dbd13e03ea7d6e3112d5f3a88c9bddae66b9569d5de381ba9447a8a',
                  local_type_id: {
                    id: 133,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c2200010785',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'a54510264dbd13e03ea7d6e3112d5f3a88c9bddae66b9569d5de381ba9447a8a',
                  local_type_id: {
                    id: 3,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0300000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxaccntxxxxxxxxxx000929625493xxxxxxxxx9jat20'
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
                    hex: '5c8051f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
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
                key_hex: '5c8051f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff',
                key_type: 'Map',
                db_sort_key_hex:
                  '23ddb5fb6c4004bb46192b185611f29cf1171eef5c8051f0997a66186e10b5c3e13c34704a822d58854ab49b19b3dd7b6875f1ff'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kzmkgrgy4fufmyuasn0lz2rd5dta9jhtd9hm5v7t4k7hjf33dc9thg',
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
                  'internal_keyvaluestore_tdx_2_1kzmkgrgy4fufmyuasn0lz2rd5dta9jhtd9hm5v7t4k7hjf33dc9thg'
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
                  'internal_keyvaluestore_tdx_2_1kzmkgrgy4fufmyuasn0lz2rd5dta9jhtd9hm5v7t4k7hjf33dc9thg'
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  details: {
                    type: 'Object',
                    global: false,
                    blueprint_info: {
                      features: [],
                      outer_object:
                        'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                      blueprint_name: 'FungibleVault',
                      package_address:
                        'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes',
                      blueprint_version: '1.0.0',
                      generic_substitutions: []
                    },
                    module_versions: []
                  }
                },
                is_locked: false,
                substate_type: 'TypeInfoModuleFieldTypeInfo'
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
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'internal_vault_tdx_2_1tzgzu673k6ys9d0890mvnmezpnvjt6sp0n6r2fhngxg4lqm7ddusj8',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo'
            }
          },
          {
            value: {
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
                'internal_vault_tdx_2_1tzgzu673k6ys9d0890mvnmezpnvjt6sp0n6r2fhngxg4lqm7ddusj8',
              partition_kind: 'Field',
              partition_number: 64
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
                      xrd_amount: '1.329285733565',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.71639255107',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.7137677813375',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.3042091664825',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.1593268264875',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.21214057019',
                      validator_index: {
                        index: 1
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
                      xrd_amount: '1.329285733565',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.51130337475',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.7137677813375',
                      validator_index: {
                        index: 4
                      }
                    },
                    {
                      xrd_amount: '0.3042091664825',
                      validator_index: {
                        index: 5
                      }
                    },
                    {
                      xrd_amount: '0.1593268264875',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.21214057019',
                      validator_index: {
                        index: 1
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
                  amount: '3984.61660190677'
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '3995.43695861205'
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
                  amount: '6.870245258818098058'
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
                  amount: '6.460066906178098058'
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
        new_global_entities: [
          {
            is_global: true,
            entity_type: 'GlobalVirtualEd25519Account',
            entity_address: 'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg'
          }
        ]
      },
      output: [
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f835035b5d4ca39319cacb45d605050c96ed80d0c70de909dd29ba746143',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f83d3324758ac2e2de654cb6c34acadba4075d0b4dc5b71434d5092ea1b7',
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
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
                value: 'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
                kind: 'Reference',
                type_name: 'GlobalAccount',
                field_name: 'account'
              }
            ],
            kind: 'Tuple',
            type_name: 'AccountAddedEvent'
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
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
                'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t'
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
                value: '10',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
          }
        },
        {
          name: 'VaultCreationEvent',
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
                element_kind: 'U8',
                hex: '58902e6bd1b68902b5e72bf6c9ef220cd925ea017cf43526f341915f837e',
                kind: 'Bytes',
                type_name: 'NodeId',
                field_name: 'vault_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'VaultCreationEvent'
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
                'internal_vault_tdx_2_1tzgzu673k6ys9d0890mvnmezpnvjt6sp0n6r2fhngxg4lqm7ddusj8'
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
                'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg'
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
                value: '10',
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.82035670528',
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
                value: '0.41017835264',
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
                value: '0.41017835264',
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
          entity_address: 'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-0.82035670528'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.41017835264'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-10'
        },
        {
          entity_address: 'account_tdx_2_128cfj7nxrphppdwruy7rguz2sgk43p22kjd3nv7a0d58tu0lnpr0dg',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '10'
        }
      ],
      non_fungible_balance_changes: []
    }
  }
] as CommittedTransactionInfo[]

// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 852936,
    epoch: 441,
    round: 1908,
    round_timestamp: '2024-05-16T11:18:41.001Z',
    payload_hash:
      'notarizedtransaction_tdx_2_17gzg5e035e0cfj9r3xsqe0nx3nka3ufmfmgszrgvsza8p88xk98sjpnvlv',
    intent_hash: 'txid_tdx_2_14gkxaw9k5f7uwa28842vhu76qf34g76uv9q4k6qvqk4drncp3zzq8hmdzl',
    fee_paid: '0.99459903015',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      addresses.badges.instapassBadgeAddress,
      'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
      'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'account_tdx_2_1290pnew5ap87akpzzvttcen0997wpppny4aagh9qrrveg0jeajq34f'
    ],
    confirmed_at: '2024-05-16T11:18:41.001Z',
    raw_hex:
      '4d22030221022104210707020ab9010000000000000ac3010000000000000999c64b6b2201012007200b3a032d13001401615a6f4f08471d3f26cc50f5e20880fbf9125c99fc3b2450010108000020220641038000c30d334d7f7c3a80aff66d8c20d31b837f907707018c2644b8f989f41c890c0c6372656174655f70726f6f66210041038000515e19e5d4e84feed8221316bc666f297ce08433257bd45ca018d9943e590c086c6f636b5f6665652101850000e8890423c78a00000000000000000000000000000000410380009a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba90c096d696e745f7275696421012021010121050c3368747470733a2f2f6170702e696e737461706173732e696f2f69636f6e732f6e66745f6b65795f6b79635f6c6974652e706e670c084b5943204c6974650ce0014c697465204b594320696e636c7564657320626173696320636865636b73207468617420766572696679206d696e696d616c2062757420657373656e7469616c20696e666f726d6174696f6e2061626f7574206120757365722e20497420646f6573206e6f7420726571756972652064657461696c656420646f63756d656e746174696f6e20616e642069732064657369676e656420666f722075736572732077686f206e6565642061636365737320746f206c696d69746564207365727669636573206f72206c6f776572207472616e73616374696f6e206c696d6974732e0c086b79632d6c6974650100410380005122f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb30c1a7472795f6465706f7369745f62617463685f6f725f61626f727421028300220000410380009a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba90c096d696e745f7275696421012021010121050c3968747470733a2f2f6170702e696e737461706173732e696f2f69636f6e732f6e66745f6b65795f6b79635f6c6974655f76616c69642e706e670c084b5943204c6974650ce0014c697465204b594320696e636c7564657320626173696320636865636b73207468617420766572696679206d696e696d616c2062757420657373656e7469616c20696e666f726d6174696f6e2061626f7574206120757365722e20497420646f6573206e6f7420726571756972652064657461696c656420646f63756d656e746174696f6e20616e642069732064657369676e656420666f722075736572732077686f206e6565642061636365737320746f206c696d69746564207365727669636573206f72206c6f776572207472616e73616374696f6e206c696d6974732e0c086b79632d6c6974650101410380005107310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a50c1a7472795f6465706f7369745f62617463685f6f725f61626f7274210283002200002020002200002022010102200720ba4d8fd96be807f2e0c6fc4ead70e68d8062e33bddcf609a7aafd029d67fe8f72101200740b77bfdd54a6e19f89c737566491a2d4c4e71ff2ad88a54a459530b0c56b1c24554a40d4e6c579da5e579b4c93fd036943fb9cec50bd82384cd1ea926dd8ec20e2201012101200740899b2d6e5b3d6049355d6e8cfd093309c78d37a8c68365c7b6b4fa016db44933444612e4dbedbdc3b9d039635d3cbeb90ef6b2d9bb5973e87e19936a283d1e01',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.48685073015',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.37046835',
        xrd_total_finalization_cost: '0.13727995',
        execution_cost_units_consumed: 7409367,
        finalization_cost_units_consumed: 2745599
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
        to_burn: '0.497299515075',
        to_proposer: '0.2486497575375',
        to_validator_set: '0.2486497575375',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '0.99459903015',
            vault_entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tpu32tv4vkpf30pk868pk6jmhydxzhddxzn2kuzkgjjt42zhqp6qd8'
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
                  intent_hash: 'aa2c6eb8b6a27dc775473d54cbf3da0263547b5c61415b680c05aad1cf018884',
                  intent_hash_bech32m:
                    'txid_tdx_2_14gkxaw9k5f7uwa28842vhu76qf34g76uv9q4k6qvqk4drncp3zzq8hmdzl'
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
                key_hex: '5c200720aa2c6eb8b6a27dc775473d54cbf3da0263547b5c61415b680c05aad1cf018884',
                key_type: 'Map',
                db_sort_key_hex:
                  'a0e8fc46c4da6736e2f94c28815fa247f5688e3f5c200720aa2c6eb8b6a27dc775473d54cbf3da0263547b5c61415b680c05aad1cf018884'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 69
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
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c',
                    simple_rep:
                      '{c250477a72a92540-f1fb558c703556b3-acb6beb2abcdc087-648362dee36cd42c}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21050c3968747470733a2f2f6170702e696e737461706173732e696f2f69636f6e732f6e66745f6b65795f6b79635f6c6974655f76616c69642e706e670c084b5943204c6974650ce0014c697465204b594320696e636c7564657320626173696320636865636b73207468617420766572696679206d696e696d616c2062757420657373656e7469616c20696e666f726d6174696f6e2061626f7574206120757365722e20497420646f6573206e6f7420726571756972652064657461696c656420646f63756d656e746174696f6e20616e642069732064657369676e656420666f722075736572732077686f206e6565642061636365737320746f206c696d69746564207365727669636573206f72206c6f776572207472616e73616374696f6e206c696d6974732e0c086b79632d6c6974650101',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c',
                key_type: 'Map',
                db_sort_key_hex:
                  '0675795b3f52e49653077a2014f915e09f3a64e15cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address: addresses.badges.instapassBadgeAddress,
              partition_kind: 'KeyValue',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '13bcc1e1d055e469936948b51d3621e05f8130901231a0847b8ff16eee058759',
                  local_type_id: {
                    id: 194,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c22000107c2',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              },
              value_schema: {
                type: 'ObjectInstance',
                generic_index: 0,
                resolved_full_type_id: {
                  schema_hash: '825e715806b75307f3b57cef5b6b517675195b3b545655b0c50d41a72680660b',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address: addresses.badges.instapassBadgeAddress
                }
              }
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435',
                    simple_rep:
                      '{8d80116b7705ec59-d17d96db00ef503b-3f568c040ab51139-78470fc1ed243435}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21050c3368747470733a2f2f6170702e696e737461706173732e696f2f69636f6e732f6e66745f6b65795f6b79635f6c6974652e706e670c084b5943204c6974650ce0014c697465204b594320696e636c7564657320626173696320636865636b73207468617420766572696679206d696e696d616c2062757420657373656e7469616c20696e666f726d6174696f6e2061626f7574206120757365722e20497420646f6573206e6f7420726571756972652064657461696c656420646f63756d656e746174696f6e20616e642069732064657369676e656420666f722075736572732077686f206e6565642061636365737320746f206c696d69746564207365727669636573206f72206c6f776572207472616e73616374696f6e206c696d6974732e0c086b79632d6c6974650100',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: []
                  }
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerDataEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                key_hex: '5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435',
                key_type: 'Map',
                db_sort_key_hex:
                  '8349df8eb82a6c95d47a949ca9c69f966c6011aa5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address: addresses.badges.instapassBadgeAddress,
              partition_kind: 'KeyValue',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectKeyValuePartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '13bcc1e1d055e469936948b51d3621e05f8130901231a0847b8ff16eee058759',
                  local_type_id: {
                    id: 194,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c22000107c2',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              },
              value_schema: {
                type: 'ObjectInstance',
                generic_index: 0,
                resolved_full_type_id: {
                  schema_hash: '825e715806b75307f3b57cef5b6b517675195b3b545655b0c50d41a72680660b',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address: addresses.badges.instapassBadgeAddress
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
                      hex: '5c220b01c0021e5122f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3',
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                      hex: '5c228f01202201010120071d22f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3',
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                                  '5cc0021d22f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3',
                                simple_rep:
                                  '[22f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3]'
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                                '5cc0021d22f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3',
                              simple_rep:
                                '[22f0f99681c3bc29f7ad60715a265c93d32991acf9f3b2c99847178bb3]'
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo',
              boot_loader_type: null
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  resource_address: addresses.badges.instapassBadgeAddress
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalNonFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a'
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
                key_hex: '5c809a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba9',
                key_type: 'Map',
                db_sort_key_hex:
                  'a164fc4550895919b75525bd61d5112448db34255c809a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba9'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4',
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
                value: {
                  details: {
                    type: 'Object',
                    global: false,
                    blueprint_info: {
                      features: [],
                      outer_object: addresses.badges.instapassBadgeAddress,
                      blueprint_name: 'NonFungibleVault',
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
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo',
              boot_loader_type: null
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '1'
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a',
              partition_kind: 'Field',
              partition_number: 64
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
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
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  frozen_status: {
                    is_burn_frozen: false,
                    is_deposit_frozen: false,
                    is_withdraw_frozen: false
                  }
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldFrozenStatus'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 2,
                key_type: 'Field',
                db_sort_key_hex: '02'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultFieldFrozenStatus',
              entity_address:
                'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a',
              partition_kind: 'Field',
              partition_number: 64
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 5,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0500000000000000',
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
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435',
                    simple_rep:
                      '{8d80116b7705ec59-d17d96db00ef503b-3f568c040ab51139-78470fc1ed243435}'
                  }
                },
                value: {
                  is_present: true
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultContentsIndexEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435',
                key_type: 'Map',
                db_sort_key_hex:
                  '8349df8eb82a6c95d47a949ca9c69f966c6011aa5cc0038d80116b7705ec59d17d96db00ef503b3f568c040ab5113978470fc1ed243435'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a',
              partition_kind: 'Index',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectIndexPartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 194,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c22000107c2',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 7,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0700000000000000',
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
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  name: 'owner_badge'
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c220b01c0021e5107310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5',
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                      hex: '5c228f01202201010120071d07310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5',
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                                  '5cc0021d07310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5',
                                simple_rep:
                                  '[07310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5]'
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                                '5cc0021d07310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5',
                              simple_rep:
                                '[07310ad3d6fd50a502cc50b0c0d181994b2683056d11f128f8018133a5]'
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo',
              boot_loader_type: null
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  resource_address: addresses.badges.instapassBadgeAddress
                },
                value: {
                  vault: {
                    is_global: false,
                    entity_type: 'InternalNonFungibleVault',
                    entity_address:
                      'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn'
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
                key_hex: '5c809a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba9',
                key_type: 'Map',
                db_sort_key_hex:
                  'a164fc4550895919b75525bd61d5112448db34255c809a5281a2b031a0eb622c911aba789a6e20b1fcec0a84a577f4ba97710ba9'
              },
              entity_module: 'Main',
              substate_type: 'AccountVaultEntry',
              entity_address:
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds',
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
                value: {
                  details: {
                    type: 'Object',
                    global: false,
                    blueprint_info: {
                      features: [],
                      outer_object: addresses.badges.instapassBadgeAddress,
                      blueprint_name: 'NonFungibleVault',
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
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'TypeInfo',
              substate_type: 'TypeInfoModuleFieldTypeInfo',
              entity_address:
                'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn',
              partition_kind: 'Field',
              partition_number: 0
            },
            system_structure: {
              type: 'SystemField',
              field_kind: 'TypeInfo',
              boot_loader_type: null
            }
          },
          {
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '1'
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultFieldBalance'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 0,
                key_type: 'Field',
                db_sort_key_hex: '00'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultFieldBalance',
              entity_address:
                'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn',
              partition_kind: 'Field',
              partition_number: 64
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
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
            value: {
              substate_hex: null,
              substate_data: {
                value: {
                  frozen_status: {
                    is_burn_frozen: false,
                    is_deposit_frozen: false,
                    is_withdraw_frozen: false
                  }
                },
                is_locked: false,
                substate_type: 'FungibleVaultFieldFrozenStatus'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                id: 2,
                key_type: 'Field',
                db_sort_key_hex: '02'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultFieldFrozenStatus',
              entity_address:
                'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn',
              partition_kind: 'Field',
              partition_number: 64
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 5,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0500000000000000',
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
            value: {
              substate_hex: null,
              substate_data: {
                key: {
                  non_fungible_local_id: {
                    id_type: 'RUID',
                    sbor_hex:
                      '5cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c',
                    simple_rep:
                      '{c250477a72a92540-f1fb558c703556b3-acb6beb2abcdc087-648362dee36cd42c}'
                  }
                },
                value: {
                  is_present: true
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultContentsIndexEntry'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'InternalNonFungibleVault',
              substate_key: {
                key_hex: '5cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c',
                key_type: 'Map',
                db_sort_key_hex:
                  '0675795b3f52e49653077a2014f915e09f3a64e15cc003c250477a72a92540f1fb558c703556b3acb6beb2abcdc087648362dee36cd42c'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn',
              partition_kind: 'Index',
              partition_number: 65
            },
            system_structure: {
              type: 'ObjectIndexPartitionEntry',
              key_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 194,
                    kind: 'WellKnown',
                    as_sbor: {
                      hex: '5c22000107c2',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'package_tdx_2_1pkgxxxxxxxxxresrcexxxxxxxxx000538436477xxxxxxxxxmn4mes'
                }
              },
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: 'aa18e25a2222655fec8fdce11d9951f8258ce83b17e18cdfe52debea86b8419b',
                  local_type_id: {
                    id: 7,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0700000000000000',
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
                      xrd_amount: '0.235964722525',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '1.0031892737625',
                      validator_index: {
                        index: 0
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
                      xrd_amount: '0.235964722525',
                      validator_index: {
                        index: 3
                      }
                    },
                    {
                      xrd_amount: '0.754539516225',
                      validator_index: {
                        index: 0
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
                  total_supply: '2'
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            substate_id: {
              entity_type: 'GlobalNonFungibleResource',
              substate_key: {
                id: 2,
                key_type: 'Field',
                db_sort_key_hex: '02'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerFieldTotalSupply',
              entity_address: addresses.badges.instapassBadgeAddress,
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '0'
                },
                is_locked: false,
                substate_type: 'NonFungibleResourceManagerFieldTotalSupply'
              },
              substate_data_hash: null
            },
            system_structure: {
              type: 'ObjectField',
              value_schema: {
                type: 'Package',
                full_type_id: {
                  schema_hash: '13bcc1e1d055e469936948b51d3621e05f8130901231a0847b8ff16eee058759',
                  local_type_id: {
                    id: 5,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0500000000000000',
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
                  amount: '9995.84779810264'
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
                'internal_vault_tdx_2_1tpu32tv4vkpf30pk868pk6jmhydxzhddxzn2kuzkgjjt42zhqp6qd8',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '9996.84239713279'
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
                  amount: '2.478307993879279507'
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
                  amount: '1.981008478804279507'
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
            entity_address: 'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4'
          },
          {
            is_global: true,
            entity_type: 'GlobalVirtualEd25519Account',
            entity_address: 'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds'
          }
        ]
      },
      output: [
        {
          hex: '5c90f89ae308c355c10e19e5cce1c8930c37dd351153ef776f667c836bcab221',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8818b3a42733415dde92eed92480af300af50290796c568627b8156076f',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f873db2c615474e0320fc1846996ad8bb8bed49a5ab40e00a9d76c53d9a1',
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
                'internal_vault_tdx_2_1tpu32tv4vkpf30pk868pk6jmhydxzhddxzn2kuzkgjjt42zhqp6qd8'
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
          name: 'MintNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address: addresses.badges.instapassBadgeAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{8d80116b7705ec59-d17d96db00ef503b-3f568c040ab51139-78470fc1ed243435}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintNonFungibleResourceEvent'
          }
        },
        {
          name: 'VaultCreationEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address: addresses.badges.instapassBadgeAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '9875c661ab162e735cc1aa3c4ef2d0f710ba873b528a8ca60e2ce5300509',
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
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1np6uvcdtzch8xhxp4g7yauks7ugt4pem229gefsw9njnqpgf2lsr8a'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{8d80116b7705ec59-d17d96db00ef503b-3f568c040ab51139-78470fc1ed243435}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
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
                'account_tdx_2_12y30p7vks8pmc20h44s8zk3xtjfax2v34nul8vkfnpr30zanlrs9m4'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: addresses.badges.instapassBadgeAddress,
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{8d80116b7705ec59-d17d96db00ef503b-3f568c040ab51139-78470fc1ed243435}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array'
              }
            ],
            kind: 'Enum',
            type_name: 'DepositEvent'
          }
        },
        {
          name: 'MintNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address: addresses.badges.instapassBadgeAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{c250477a72a92540-f1fb558c703556b3-acb6beb2abcdc087-648362dee36cd42c}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintNonFungibleResourceEvent'
          }
        },
        {
          name: 'VaultCreationEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address: addresses.badges.instapassBadgeAddress
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '98adb896ab849990340193310aa332e05588eac8dc01337f6009d3a125fc',
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
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nzkm394tsjveqdqpjvcs4gejup2c36kgmsqnxlmqp8f6zf0u25tzzn'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{c250477a72a92540-f1fb558c703556b3-acb6beb2abcdc087-648362dee36cd42c}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array',
                field_name: 'ids'
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
                'account_tdx_2_12yrnzzkn6m74pfgze3gtpsx3sxv5kf5rq4k3rufglqqczva9v77eds'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: addresses.badges.instapassBadgeAddress,
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{c250477a72a92540-f1fb558c703556b3-acb6beb2abcdc087-648362dee36cd42c}',
                    kind: 'NonFungibleLocalId'
                  }
                ],
                kind: 'Array'
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
                'internal_vault_tdx_2_1tpu32tv4vkpf30pk868pk6jmhydxzhddxzn2kuzkgjjt42zhqp6qd8'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.99459903015',
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
                value: '0.497299515075',
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
                value: '0.497299515075',
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
    manifest_classes: []
  }
] as CommittedTransactionInfo[]

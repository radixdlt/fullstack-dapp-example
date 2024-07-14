// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 31247163,
    epoch: 16043,
    round: 801,
    round_timestamp: '2024-07-09T15:28:38.778Z',
    payload_hash:
      'notarizedtransaction_tdx_2_19aj57pvz8062f09evdq3w20gphteytft7xzjvq2gj335muwl7gwsrhqn6q',
    intent_hash: 'txid_tdx_2_1hmun2jd8f6vy4u4ksax26xy958dfux23q4rcj5p68y7fprk7zdxsksz6k0',
    fee_paid: '1.19921835552',
    affected_global_entities: [
      'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
      'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5',
      'component_tdx_2_1cpysluekg24ddzrx8u7z3wdfm8udy63rdxws9mv79n8rzy2nms7s0w',
      'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
      'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k',
      'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t'
    ],
    confirmed_at: '2024-07-09T15:28:38.778Z',
    raw_hex:
      '4d22030221022104210707020aab3e0000000000000aad3e000000000000095a386c4c22010120072072d31b97b8350ec4b310062dcf1e89f18fa71a744e7b2dffa310e44f74af99fb01010800002022084103800051787173ed493bf48e73272c0478618ce1c62a1e3d1dce3d43659cf145e50c086c6f636b5f666565210185000088b116afe3b5020000000000000000000000000000004103800051ef3be39aca3bf01243ced3697fc84efeb0e38ce7df07448ea7eb2ac4010c166372656174655f70726f6f665f6f665f616d6f756e74210280005d54e3b90d0a15cb6848c126d544b617198abb0ac09d8ffd82bd460f45df85000064a7b3b6e00d00000000000000000000000000000000410380005dff7cf0645b218477a88247a236565901c6cbf3222e097470f950e3ac590c046d696e742101850000e8890423c78a00000000000000000000000000000000000280005dff7cf0645b218477a88247a236565901c6cbf3222e097470f950e3ac59850000e8890423c78a0000000000000000000000000000000041038000c0c5771373d2a12f7ebd04725aff1aa4ae4affc20b41015afd97aab073550c096d696e745f6361726421080c2062343963336635613333336334383839613333313738613962346538633666640c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533030310c1d576869726c706f6f6c2053706972616c2043617264207b31362f35307d0cb8015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e67207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f66203136206f7574206f66206120706f737369626c652035302e0c10776869726c706f6f6c2073706972616c0c06636f6d6d6f6e85000040763a6b0bde000000000000000000000000000000000100020180009a5984d4502a0b129d327508e40f70f67fd411f5e83ef94d945929ec586a4103800051ef3be39aca3bf01243ced3697fc84efeb0e38ce7df07448ea7eb2ac4010c166372656174655f70726f6f665f6f665f616d6f756e74210280005d54e3b90d0a15cb6848c126d544b617198abb0ac09d8ffd82bd460f45df85000064a7b3b6e00d0000000000000000000000000000000041038000c0490ff33642aad688663f3c28b9a9d9f8d26a23699d02ed9e2cce3111530c186465706f7369745f676966745f626f785f7265776172647321020c2062343963336635613333336334383839613333313738613962346538633666642081020000000001000000202000220000202202010220072072d31b97b8350ec4b310062dcf1e89f18fa71a744e7b2dffa310e44f74af99fb210120074036006be868e45d2f7f49264581ece1ebb4c7624214ff385c6341fd61688ff333ac532237f606fd8401d5e942ecdd216db9d09256ae406d2023e7772aa26f2e070102200720c63becd87e6f813d71e9a180b6bbff0b4763ef7ade51a69e0b250ad7cd16f7ee210120074065f41874c83023b3f2b2ce44266a586eba964bb1cde1c8498fc7845aec445e66275222f7c13f0c3b3118e03cc91d923bb67ed0e3dc3f78037116aa5c555c53002201012101200740f45f02658cec20838e1fd79345fb5b5c3e26136eea462f69dbf161b1ebb6d645b5bae4eb07f1e4033fb3b71a74babc3d837e31b6506b23fed337952afa51c600',
    receipt: {
      status: 'CommittedSuccess',
      fee_summary: {
        xrd_total_royalty_cost: '0',
        xrd_total_storage_cost: '0.29220580552',
        xrd_total_tipping_cost: '0',
        xrd_total_execution_cost: '0.8352411',
        xrd_total_finalization_cost: '0.07177145',
        execution_cost_units_consumed: 16704822,
        finalization_cost_units_consumed: 1435429
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
        to_burn: '0.59960917776',
        to_proposer: '0.29980458888',
        to_validator_set: '0.29980458888',
        to_royalty_recipients: []
      },
      fee_source: {
        from_vaults: [
          {
            xrd_amount: '1.19921835552',
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
                  intent_hash: 'bef93549a74e984af2b6874cad1885a1da9e1951054789503a393c908ede134d',
                  intent_hash_bech32m:
                    'txid_tdx_2_1hmun2jd8f6vy4u4ksax26xy958dfux23q4rcj5p68y7fprk7zdxsksz6k0'
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
                key_hex: '5c200720bef93549a74e984af2b6874cad1885a1da9e1951054789503a393c908ede134d',
                key_type: 'Map',
                db_sort_key_hex:
                  'f08025cd33494d4eedb887a3ba43b1cf9ad816665c200720bef93549a74e984af2b6874cad1885a1da9e1951054789503a393c908ede134d'
              },
              entity_module: 'Main',
              substate_type: 'TransactionTrackerCollectionEntry',
              entity_address:
                'transactiontracker_tdx_2_1stxxxxxxxxxxtxtrakxxxxxxxxx006844685494xxxxxxxxxxzw7jp',
              partition_kind: 'KeyValue',
              partition_number: 225
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
                      '5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79',
                    simple_rep:
                      '{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}'
                  }
                },
                value: {
                  data_struct: {
                    struct_data: {
                      hex: '5c21070c4668747470733a2f2f7076736e7332377832302e657865637574652d6170692e65752d776573742d312e616d617a6f6e6177732e636f6d2f636172643f73686170653d533030310c1d576869726c706f6f6c2053706972616c2043617264207b31362f35307d0cb8015573652074686973204d6f72706820456e65726779204361726420746f206675736520322052616447656d73207573696e67207468652073696e6b696e672067797265206f66206120776869726c706f6f6c2073706972616c212054686520636f6d6d6f6e20736861706520646566696e6564206279207468697320636172642069732072617465642061742061207175616c697479206c6576656c206f66203136206f7574206f66206120706f737369626c652035302e0c10776869726c706f6f6c2073706972616c0c06636f6d6d6f6ea0000040763a6b0bde000000000000000000000000000000000100',
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
                key_hex: '5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79',
                key_type: 'Map',
                db_sort_key_hex:
                  '2248a9bfad077311dbbafe77cce1ad76263f2f9b5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleResourceManagerDataEntry',
              entity_address:
                'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5',
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
                  schema_hash: 'd61dbc44dad4046f09a3510d699d4048f60aea51371601d6a4647eb837ffbd53',
                  local_type_id: {
                    id: 0,
                    kind: 'SchemaLocal',
                    as_sbor: {
                      hex: '5c2201010a0000000000000000',
                      programmatic_json: null
                    }
                  },
                  entity_address:
                    'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5'
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
                    hex: '5c0c206234396333663561333333633438383961333331373861396234653863366664',
                    programmatic_json: null
                  }
                },
                value: {
                  data: {
                    struct_data: {
                      hex: '5c2023018022025dff7cf0645b218477a88247a236565901c6cbf3222e097470f950e3ac590001a00000e8890423c78a000000000000000000000000000000009a5984d4502a0b129d327508e40f70f67fd411f5e83ef94d945929ec586a010120c001037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79',
                      programmatic_json: null
                    },
                    owned_entities: [],
                    referenced_entities: [
                      {
                        is_global: true,
                        entity_type: 'GlobalFungibleResource',
                        entity_address:
                          'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k'
                      },
                      {
                        is_global: true,
                        entity_type: 'GlobalNonFungibleResource',
                        entity_address:
                          'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5'
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
                key_hex: '5c0c206234396333663561333333633438383961333331373861396234653863366664',
                key_type: 'Map',
                db_sort_key_hex:
                  '2e9a12b239a3b944f7331db933db315236087f365c0c206234396333663561333333633438383961333331373861396234653863366664'
              },
              entity_module: 'Main',
              substate_type: 'GenericKeyValueStoreEntry',
              entity_address:
                'internal_keyvaluestore_tdx_2_1kqeys9x09sfuw83cfy5fvvctdeunlcszn2yeyux3mn4n43lh7jvzu5',
              partition_kind: 'KeyValue',
              partition_number: 64
            },
            system_structure: {
              type: 'KeyValueStoreEntry',
              key_full_type_id: {
                schema_hash: '1f74aa8644b5ab8bc032b3f87bb24e55baa2514852de9c7cb835afb5dbec37f3',
                local_type_id: {
                  id: 0,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0000000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kqeys9x09sfuw83cfy5fvvctdeunlcszn2yeyux3mn4n43lh7jvzu5'
              },
              value_full_type_id: {
                schema_hash: '1f74aa8644b5ab8bc032b3f87bb24e55baa2514852de9c7cb835afb5dbec37f3',
                local_type_id: {
                  id: 1,
                  kind: 'SchemaLocal',
                  as_sbor: {
                    hex: '5c2201010a0100000000000000',
                    programmatic_json: null
                  }
                },
                entity_address:
                  'internal_keyvaluestore_tdx_2_1kqeys9x09sfuw83cfy5fvvctdeunlcszn2yeyux3mn4n43lh7jvzu5'
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
                      '5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79',
                    simple_rep:
                      '{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}'
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
                key_hex: '5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79',
                key_type: 'Map',
                db_sort_key_hex:
                  '2248a9bfad077311dbbafe77cce1ad76263f2f9b5cc0037e8f7650b0ec68405b9aaa23f221eb757551861d237ddb46f942833cd0ee8e79'
              },
              entity_module: 'Main',
              substate_type: 'NonFungibleVaultContentsIndexEntry',
              entity_address:
                'internal_vault_tdx_2_1nzg4g4whhzflxqz2fuwaeg0mzxfscwv72cpd6gd20wdpjj8uvx4f52',
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
                      xrd_amount: '19.6562561068225',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.114130131035',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.1626844264875',
                      validator_index: {
                        index: 3
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
                      xrd_amount: '19.3564515179425',
                      validator_index: {
                        index: 0
                      }
                    },
                    {
                      xrd_amount: '0.114130131035',
                      validator_index: {
                        index: 2
                      }
                    },
                    {
                      xrd_amount: '0.1626844264875',
                      validator_index: {
                        index: 3
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
                  total_supply: '850'
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
                'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '840'
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
                  total_supply: '14'
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
              entity_address:
                'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  total_supply: '13'
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
                  amount: '5810.9374763953'
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
                  amount: '5812.13669475082'
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
                  amount: '140'
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
                'internal_vault_tdx_2_1trhr2rucdmhycumst2pgwuj2gr24zsr8a4xh7nkufq52npgu3h3wg2',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '130'
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
                  amount: '14'
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
                'internal_vault_tdx_2_1nzg4g4whhzflxqz2fuwaeg0mzxfscwv72cpd6gd20wdpjj8uvx4f52',
              partition_kind: 'Field',
              partition_number: 64
            },
            previous_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '13'
                },
                is_locked: false,
                substate_type: 'NonFungibleVaultFieldBalance'
              },
              substate_data_hash: null
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
            new_value: {
              substate_hex: null,
              substate_data: {
                value: {
                  amount: '39.866141328909236238'
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
                  amount: '39.266532151149236238'
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
          hex: '5c90f8835f0c039b4754b6a7a7743ab0ccdbc7de875ff66e56f58cb027ed21ed',
          programmatic_json: null
        },
        {
          hex: '5c90f871b276c2cc98d4d6519cae2ec66a92169efd0c376d173be97459fd4a22',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8ecea8b5b23a20717f8014600e2abe71bcbcf8eb38eb61213325d608cc3',
          programmatic_json: null
        },
        {
          hex: '5c2100',
          programmatic_json: null
        },
        {
          hex: '5c90f8f51fd2b059b18dc22b653b09ee718ce976caa5c564704d595e1cc5ebf0',
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
          name: 'MintFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k'
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
            type_name: 'MintFungibleResourceEvent'
          }
        },
        {
          name: 'MintNonFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalNonFungibleResource',
              entity_address:
                'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}',
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
          name: 'MorphCardMintedEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalGenericComponent',
              entity_address:
                'component_tdx_2_1crzhwymn62sj7l4aq3e94lc65jhy4l7zpdqszkhaj74tqu64q032en'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: 'b49c3f5a333c4889a33178a9b4e8c6fd',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              },
              {
                value: '{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}',
                kind: 'NonFungibleLocalId',
                field_name: 'local_id'
              },
              {
                fields: [
                  {
                    value: 'https://pvsns27x20.execute-api.eu-west-1.amazonaws.com/card?shape=S001',
                    kind: 'String',
                    type_name: 'Url',
                    field_name: 'key_image_url'
                  },
                  {
                    value: 'Whirlpool Spiral Card {16}',
                    kind: 'String',
                    field_name: 'name'
                  },
                  {
                    value:
                      'Use this Morph Energy Card to fuse 2 RadGems using the sinking gyre of a whirlpool spiral! The common shape defined by this card is rated at a quality level of 16 out of a possible 50.',
                    kind: 'String',
                    field_name: 'description'
                  },
                  {
                    value: 'whirlpool spiral',
                    kind: 'String',
                    field_name: 'energy_type'
                  },
                  {
                    value: 'common',
                    kind: 'String',
                    field_name: 'rarity'
                  },
                  {
                    value: '16',
                    kind: 'Decimal',
                    field_name: 'quality'
                  },
                  {
                    value: false,
                    kind: 'Bool',
                    field_name: 'limited_edition'
                  }
                ],
                kind: 'Tuple',
                type_name: 'MorphEnergyCardData',
                field_name: 'morph_card_data'
              }
            ],
            kind: 'Tuple',
            type_name: 'MorphCardMintedEvent'
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
                'internal_vault_tdx_2_1trhr2rucdmhycumst2pgwuj2gr24zsr8a4xh7nkufq52npgu3h3wg2'
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
              is_global: false,
              entity_type: 'InternalNonFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1nzg4g4whhzflxqz2fuwaeg0mzxfscwv72cpd6gd20wdpjj8uvx4f52'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}',
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
          name: 'GiftBoxDepositedEvent',
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
                value: 'b49c3f5a333c4889a33178a9b4e8c6fd',
                kind: 'String',
                type_name: 'UserId',
                field_name: 'user_id'
              }
            ],
            kind: 'Tuple',
            type_name: 'GiftBoxDepositedEvent'
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
                value: '1.19921835552',
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
                value: '0.59960917776',
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
                value: '0.59960917776',
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
          entity_address: 'account_tdx_2_129u8zuldfyalfrnnyukqg7rp3nsuv2s785wuu02rvkw0z309khgv5t',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '-1.19921835552'
        },
        {
          type: 'FeeDistributed',
          entity_address:
            'consensusmanager_tdx_2_1scxxxxxxxxxxcnsmgrxxxxxxxxx000999665565xxxxxxxxxv6cg29',
          resource_address:
            'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
          balance_change: '0.59960917776'
        }
      ],
      fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1cpysluekg24ddzrx8u7z3wdfm8udy63rdxws9mv79n8rzy2nms7s0w',
          resource_address:
            'resource_tdx_2_1thlheurytvscgaagsfr6ydjktyqudjlnyghqjarsl9gw8tzegzax8k',
          balance_change: '10'
        }
      ],
      non_fungible_balance_changes: [
        {
          entity_address: 'component_tdx_2_1cpysluekg24ddzrx8u7z3wdfm8udy63rdxws9mv79n8rzy2nms7s0w',
          resource_address:
            'resource_tdx_2_1nfvcf4zs9g9398fjw5ywgrms7elagy04aql0jnv5ty57ckr2ehhnh5',
          added: ['{7e8f7650b0ec6840-5b9aaa23f221eb75-7551861d237ddb46-f942833cd0ee8e79}'],
          removed: []
        }
      ]
    }
  }
] as CommittedTransactionInfo[]

// @ts-nocheck
import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'
import { Addresses } from 'common'

const addresses = Addresses(2)

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 27261552,
    epoch: 14010,
    round: 263,
    round_timestamp: '2024-07-02T14:02:00.204Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1kdamwjsnp8pj2uayrfkj394ptlhlrcq3ckc4sljvmqqknv2vlqwsk6u5zf',
    intent_hash: 'txid_tdx_2_1xlzur4tnhfhhuanajy7wuq3dxl0tj59wsa0vwk8vlsvsw628axxqdhxwdu',
    fee_paid: '0.64961441333',
    confirmed_at: '2024-07-02T14:02:00.204Z',
    receipt: {
      status: 'CommittedSuccess',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tzsp0qaf8ufsl6dgga4mc2rkdr9attqlxnlszvng0zcp9sqklv6j2r'
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
                'internal_vault_tdx_2_1tzkdqnf8y79qwgdvxlvdk5nslelwvvm62urdhx6506csrtx6fah2ce'
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
                'account_tdx_2_12yz40na40y4xz2qhx2kuqf7merw0ehmg8ercxvytadljvj96azyqys'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
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
              entity_address:
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
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
                value: 'd9bccbe6322e4f2990644ff90fade0c1',
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
                'internal_vault_tdx_2_1tzsp0qaf8ufsl6dgga4mc2rkdr9attqlxnlszvng0zcp9sqklv6j2r'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.64961441333',
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
                value: '0.324807206665',
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
                value: '0.324807206665',
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
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 27261536,
    epoch: 14010,
    round: 248,
    round_timestamp: '2024-07-02T14:01:57.965Z',
    payload_hash:
      'notarizedtransaction_tdx_2_18fyrgk46mn2z9xqn54z7nnwalaauq6ewhk58zlqpwgvxtaffpnlqqrkzqr',
    intent_hash: 'txid_tdx_2_1ec9eqrgldelgl4suk3m2pfc9f39ws97lzm2jxpv8dc4mfdv8k65s283zw5',
    fee_paid: '0.39647996065',
    confirmed_at: '2024-07-02T14:01:57.965Z',
    receipt: {
      status: 'CommittedSuccess',
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
          name: 'MintFungibleResourceEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
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
          name: 'VaultCreationEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: true,
              entity_type: 'GlobalFungibleResource',
              entity_address:
                'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '58acd04d27278a0721ac37d8db5270fe7ee6337a5706db9b547eb101acda',
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
                'internal_vault_tdx_2_1tzkdqnf8y79qwgdvxlvdk5nslelwvvm62urdhx6506csrtx6fah2ce'
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
                'account_tdx_2_12yz40na40y4xz2qhx2kuqf7merw0ehmg8ercxvytadljvj96azyqys'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t49wp9mm70nzw6hmxts8z84tk7d8v2dchet8shpg2dv4jy9q9m2w72',
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
                value: '0.39647996065',
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
                value: '0.198239980325',
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
                value: '0.198239980325',
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
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 27261491,
    epoch: 14010,
    round: 204,
    round_timestamp: '2024-07-02T14:01:51.668Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1l68keeufng2t82krhfhtswqu8zyuakc6y8hws2ueukte9sv6lj7qd8evde',
    intent_hash: 'txid_tdx_2_1cqrlvu9f7a6kw5t7nl9e0hkwwk057kxp4hqx7vrj7q0mx6gv2nuqfgddj8',
    fee_paid: '0.4587681067',
    confirmed_at: '2024-07-02T14:01:51.668Z',
    receipt: {
      status: 'CommittedSuccess',
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
              entity_address:
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<d9bccbe6322e4f2990644ff90fade0c1>',
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
              entity_address:
                'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '98876f419a87a87e2ab64cf97eb3baa3be638d8e1659a8670c2249949d0e',
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
                'internal_vault_tdx_2_1nzrk7sv6s758u24kfnuhava65wlx8rvwzev6secvyfyef8gwgvejv9'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<d9bccbe6322e4f2990644ff90fade0c1>',
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
                'account_tdx_2_12yz40na40y4xz2qhx2kuqf7merw0ehmg8ercxvytadljvj96azyqys'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1ng4u8za72l24qfa0qqe9tdyumx0v5866uznrswemsky7jw9d6ehqr2',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<d9bccbe6322e4f2990644ff90fade0c1>',
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
                'internal_vault_tdx_2_1tpju344tn0z9ppek6yhgj7saw20y06umu59cdfc5hjpyqtmxs75fw4'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.4587681067',
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
                value: '0.22938405335',
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
                value: '0.22938405335',
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
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 27261474,
    epoch: 14010,
    round: 188,
    round_timestamp: '2024-07-02T14:01:49.365Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1uujepdq06378fnk72s69w9sct0s7rmgdp6dzrfecu5cjf5xy9c3s423ts7',
    intent_hash: 'txid_tdx_2_1fxcjyfcaf6ztwgxwan7062mttmfvpnxpurw9qemxdq8n3txfa6qqm4hyhs',
    fee_paid: '0.59133312794',
    confirmed_at: '2024-07-02T14:01:49.365Z',
    receipt: {
      status: 'CommittedSuccess',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tz9uaalv8g3ahmwep2trlyj2m3zn7rstm9pwessa3k56me2fuywfep'
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
                'internal_vault_tdx_2_1tz9uaalv8g3ahmwep2trlyj2m3zn7rstm9pwessa3k56me2fuywfep'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10000',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
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
                hex: '58a01783a93f130fe9a8476bbc287668cbd5ac1f34ff01326878b012c016',
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
                'internal_vault_tdx_2_1tzsp0qaf8ufsl6dgga4mc2rkdr9attqlxnlszvng0zcp9sqklv6j2r'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '10000',
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
                'account_tdx_2_12yz40na40y4xz2qhx2kuqf7merw0ehmg8ercxvytadljvj96azyqys'
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
                value: '10000',
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
                'internal_vault_tdx_2_1tz9uaalv8g3ahmwep2trlyj2m3zn7rstm9pwessa3k56me2fuywfep'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.59133312794',
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
                value: '0.29566656397',
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
                value: '0.29566656397',
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
    manifest_classes: ['General']
  },
  {
    transaction_status: 'CommittedSuccess',
    state_version: 27261313,
    epoch: 14010,
    round: 28,
    round_timestamp: '2024-07-02T14:01:26.231Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1m2s69k6gfxzr30avnyz9mqknqjqnv0glf6mez5sz5gtc3af0erfssqll0m',
    intent_hash: 'txid_tdx_2_1yhf3hps3xay5d2d58ljdj8algfqqzs3dkdeqt5jsasznvjswy94qv0a78z',
    fee_paid: '0.91565682517',
    confirmed_at: '2024-07-02T14:01:26.231Z',
    receipt: {
      status: 'CommittedSuccess',
      events: [
        {
          name: 'LockFeeEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tq5wjednlktmc99wc0wzcymu3uv8vfrwh7rj49tkz4cw0zefs3yyc0'
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
          name: 'DepositEvent',
          emitter: {
            type: 'Method',
            entity: {
              is_global: false,
              entity_type: 'InternalFungibleVault',
              entity_address:
                'internal_vault_tdx_2_1tz8n4qrm7uhwj4jgwvygvrgfyyjtvjp50e9qf3pn7z855pvypx6pwy'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'DepositEvent'
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
                'internal_vault_tdx_2_1tz8n4qrm7uhwj4jgwvygvrgfyyjtvjp50e9qf3pn7z855pvypx6pwy'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.000437460557618388',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
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
                'internal_vault_tdx_2_1tpkefljdrlwkkydfdfwu95m438ddw7g9kywep7yzya6pflwwndzhel'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.000437460557618388',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'DepositEvent'
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
                'resource_tdx_2_1t53juzjarzvj7l27824stwwydhts8832wgsuymk9hrg6utjm7zpz7t'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.004635076535971889',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'MintFungibleResourceEvent'
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
                'internal_vault_tdx_2_1tr0se95tyxd8z4aatshlpt9fqp59v3xae3eyu9pl7k4n5shnrtnend'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.004635076535971889',
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
              entity_type: 'GlobalOneResourcePool',
              entity_address: 'pool_tdx_2_1cn7r7fdh8kuqug0w7d3uz24e5qnmk7uydlqduz5qf0v6253cahjhf0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.004635076535971889',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
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
                'internal_vault_tdx_2_1tq5wjednlktmc99wc0wzcymu3uv8vfrwh7rj49tkz4cw0zefs3yyc0'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.91565682517',
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
                value: '0.457828412585',
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
                value: '0.457828412585',
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
    manifest_classes: ['General']
  }
] as CommittedTransactionInfo[]

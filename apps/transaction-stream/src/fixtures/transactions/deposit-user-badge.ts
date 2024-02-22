// @ts-nocheck

import { CommittedTransactionInfo } from '@radixdlt/babylon-gateway-api-sdk'

export default [
  {
    transaction_status: 'CommittedSuccess',
    state_version: 46748351,
    epoch: 33172,
    round: 424,
    round_timestamp: '2024-02-06T04:37:28.531Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1wgt3scrprntngvnte9vqg8cj2ls3jphc0gyyl79545sg3cgnt5aq3rwrg8',
    intent_hash: 'txid_tdx_2_183ua49r0hr8np2c7mw529xv5hrda77zcldxvmm7frafmp7pzc06sw3fzl3',
    fee_paid: '0.5856163119',
    confirmed_at: '2024-02-06T04:37:28.531Z',
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
                'internal_vault_tdx_2_1tzm77uevwrl5l0ntqf5phhuyp96cxhe8tjxnef3v0zsxmz3a3276ja'
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
                'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<2dae9e584f69432794890f4f4fbc8eea>',
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
                'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '98058fabdd43dca5ee28c091edd536a1cf9cd3d6e9ad5f7b8affc772c616',
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
                'internal_vault_tdx_2_1nqzcl27ag0w2tm3gczg7m4fk588ee57kaxk477u2llrh93skaguqq2'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<2dae9e584f69432794890f4f4fbc8eea>',
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
                'account_tdx_2_12yzrtkz34ltc0alxzd4rqdm8ykyhjf3tkmnpgs6keagp62kjw8zqqx'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 1,
            variant_name: 'NonFungible',
            fields: [
              {
                value: 'resource_tdx_2_1nfusnklkkgt4yrj5gw3vkdqaqkjmm46nyslkqcqm3zwypds4xtjae9',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                element_kind: 'NonFungibleLocalId',
                elements: [
                  {
                    value: '<2dae9e584f69432794890f4f4fbc8eea>',
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
                'internal_vault_tdx_2_1tzm77uevwrl5l0ntqf5phhuyp96cxhe8tjxnef3v0zsxmz3a3276ja'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.5856163119',
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
                value: '0.29280815595',
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
                value: '0.29280815595',
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
    state_version: 46748638,
    epoch: 33173,
    round: 63,
    round_timestamp: '2024-02-06T04:39:45.247Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1tjnmzt8l7e8c432ty5gguhku3gve6k0xqecs4k7cp5aktf5e7t8qutdld9',
    intent_hash: 'txid_tdx_2_1hpq92kpky7tscpwuqagr6at6t3nv8lw34n9j24nfu8hs5236k08qgwc2r4',
    fee_paid: '0.28732201691',
    confirmed_at: '2024-02-06T04:39:45.247Z',
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
                'internal_vault_tdx_2_1tp2lwhtfee0exm385uyq5l0k9pe9x8j6eddynmqq4wyzpwvgvqax8y'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '100',
                kind: 'Decimal',
                field_name: 'amount'
              }
            ],
            kind: 'Tuple',
            type_name: 'LockFeeEvent'
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
                'internal_vault_tdx_2_1tp2lwhtfee0exm385uyq5l0k9pe9x8j6eddynmqq4wyzpwvgvqax8y'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.28732201691',
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
                value: '0.143661008455',
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
                value: '0.143661008455',
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
    state_version: 46773430,
    epoch: 33211,
    round: 131,
    round_timestamp: '2024-02-06T07:50:15.205Z',
    payload_hash:
      'notarizedtransaction_tdx_2_1c04zqx3wfmaxdcgnwa66hczyesv2stg5xapz8wxjdccf3fwyj3sq7rkce3',
    intent_hash: 'txid_tdx_2_14r0nms9qqt795un7xy5fprp82nmehjf8ppul67gf6gvswpqnhysqwjrrcu',
    fee_paid: '0.66413175997',
    confirmed_at: '2024-02-06T07:50:15.205Z',
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
                'internal_vault_tdx_2_1tzw3fn424wv3p7w7q57gyfcseglwhtcd9kdjqgedavsdv0h8pnzj5j'
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
                'internal_vault_tdx_2_1tzz9s0t05u2wh967nqkrcrzmf73xs76yg9q2t6tmn9k2k472uwz7xh'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_1294v3qk9kg2v9q2xtgsv3yeqzudev9kkew93jqha8phcg6wsz0tzd4'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tksm3ljdrwr67eaztnmtc6kfsgfn3v0c2udfccp3wpddxpvqeu96xd',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
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
                'internal_vault_tdx_2_1tqujqk2232jnzp49qcvs8qk2laxsnatl9vh3v76ydnl6f75zfp96nn'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_1294v3qk9kg2v9q2xtgsv3yeqzudev9kkew93jqha8phcg6wsz0tzd4'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t4use7wp725csp4vwkvvsgqevxfv0qndvl6rl43qyjtex9wr8tx2xj',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'WithdrawEvent'
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
                'internal_vault_tdx_2_1tr973eaf9xnev4wz8c37x4xhm4rhukuf3y38htkv4m8hfkmtcatfn7'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_1294v3qk9kg2v9q2xtgsv3yeqzudev9kkew93jqha8phcg6wsz0tzd4'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t5ya6zugzus4ctlnwkwxf33wzytpht3pzrl7vv3hhqpud3l7e2l9zl',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
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
                'resource_tdx_2_1tksm3ljdrwr67eaztnmtc6kfsgfn3v0c2udfccp3wpddxpvqeu96xd'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '58b77b4adae474d406d1fa78a441ba9b43fbcfdc8462b8115cf8b7e593ba',
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
                'internal_vault_tdx_2_1tzmhkjk6u36dgpk3lfu2gsd6ndplhn7us33tsy2ulzm7tya6h2dhly'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_12yj5zqaljqcxhhgd77h9gvgjs2t8l4fz346gkknat4mxgfaadvd622'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1tksm3ljdrwr67eaztnmtc6kfsgfn3v0c2udfccp3wpddxpvqeu96xd',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'DepositEvent'
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
                'resource_tdx_2_1t4use7wp725csp4vwkvvsgqevxfv0qndvl6rl43qyjtex9wr8tx2xj'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '58e06d6f4bfbdc3f363730fb54351e68d03ac7bceb2d35713fe738644aff',
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
                'internal_vault_tdx_2_1trsx6m6tl0wr7d3hxra4gdg7drgr43auavkn2ufluuuxgjhlwlaws5'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_12yj5zqaljqcxhhgd77h9gvgjs2t8l4fz346gkknat4mxgfaadvd622'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t4use7wp725csp4vwkvvsgqevxfv0qndvl6rl43qyjtex9wr8tx2xj',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
                kind: 'Decimal'
              }
            ],
            kind: 'Enum',
            type_name: 'DepositEvent'
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
                'resource_tdx_2_1t5ya6zugzus4ctlnwkwxf33wzytpht3pzrl7vv3hhqpud3l7e2l9zl'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                element_kind: 'U8',
                hex: '584fc3aa2a8ee38c10ea822500e506da723cbd0a71f880a0e1e04afd24ff',
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
                'internal_vault_tdx_2_1tp8u82323m3ccy82sgjspegxmfere0g2w8ugpg8pup906f8lyc3l6j'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '1000',
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
                'account_tdx_2_12yj5zqaljqcxhhgd77h9gvgjs2t8l4fz346gkknat4mxgfaadvd622'
            },
            object_module_id: 'Main'
          },
          data: {
            variant_id: 0,
            variant_name: 'Fungible',
            fields: [
              {
                value: 'resource_tdx_2_1t5ya6zugzus4ctlnwkwxf33wzytpht3pzrl7vv3hhqpud3l7e2l9zl',
                kind: 'Reference',
                type_name: 'ResourceAddress'
              },
              {
                value: '1000',
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
                'internal_vault_tdx_2_1tzw3fn424wv3p7w7q57gyfcseglwhtcd9kdjqgedavsdv0h8pnzj5j'
            },
            object_module_id: 'Main'
          },
          data: {
            fields: [
              {
                value: '0.66413175997',
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
                value: '0.332065879985',
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
                value: '0.332065879985',
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
    manifest_classes: ['Transfer', 'General']
  }
] as CommittedTransactionInfo[]

import { createRadmorphHash, radmorphUrlsToTuples } from './getImageOracleManifest'
import { describe, it, expect } from 'vitest'

describe('hash creation', () => {
  const testCases = [
    [
      'Molten LavaCrystallineDuskForest',
      '197ca17fff60c13f83525d72b00df0dd635761efde784fced57c6a312adfb501'
    ],
    [
      'https://www.test.com/image1url',
      '648da20701f5eb52a4cfb304652c3984c589a766e4ed9d8de5b7b71bf8a6c21f'
    ],
    [
      'Molten LavaMetallicDuskForest',
      'd1889d1a7275e49c18c7c07d24063af49651adbeda382b637d72b2a127f868be'
    ],
    [
      'https://www.test.com/image2url',
      'dd052a044d37f98bb5a3edf71f6fb08fd8787f42243d3fb6b54a0ca09b909643'
    ],
    [
      'Molten LavaRadiantDuskForest',
      '0695c5bbf6ddaa6e6066aa405df712f7dfda99262fcd107482f3ceb89375a09f'
    ],
    [
      'https://www.test.com/image3url',
      '170b618e9981c567c0de560a5a2e62e470cf66847999a461d9f878d3583e080f'
    ]
  ]
  it('should create a radmorph hash', () => {
    testCases.forEach(([value, expectedHash]) => {
      const hash = createRadmorphHash(value)
      expect(hash).toBe(expectedHash)
    })
  })

  it('should create manifest blobs', () => {
    expect(
      radmorphUrlsToTuples([
        {
          id: 'S001_MET_PRP_LGN',
          url: 'https://www.test.com/image2url'
        }
      ])
    ).toBe(
      `Tuple(
        Bytes("596e82f104e6b62e240dde6b7e13a14fe862677369f6132f759bc5e9fd9dc2ec"),
        Bytes("dd052a044d37f98bb5a3edf71f6fb08fd8787f42243d3fb6b54a0ca09b909643"),
      )`
    )
  })
})

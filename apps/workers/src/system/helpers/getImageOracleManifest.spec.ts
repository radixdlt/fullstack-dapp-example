import { createRadmorphHash, radmorphUrlsToTuples } from './getImageOracleManifest'
import { describe, it, expect } from 'vitest'

describe('hash creation', () => {
  const testCases = [
    [
      'Molten LavaMetallicDuskForesthttps://www.test.com/image1url',
      'c12f7d993c3ace8a25f49731e4836acbf69be2b6a95670fc7c1d3d594b8b329c'
    ],
    [
      'https://www.test.com/image1url',
      '648da20701f5eb52a4cfb304652c3984c589a766e4ed9d8de5b7b71bf8a6c21f'
    ],
    [
      'Molten LavaMetallicDuskForesthttps://www.test.com/image2url',
      'cb8af8debfb69c5a8f8302645b30c73b1e096be36b1e7f4b2f468a491a5fb941'
    ],
    [
      'https://www.test.com/image2url',
      'dd052a044d37f98bb5a3edf71f6fb08fd8787f42243d3fb6b54a0ca09b909643'
    ],
    [
      'Molten LavaMetallicDuskForesthttps://www.test.com/image3url',
      '4a962025cad241a583c4f2b25007a8f928963b8cc6adac6dcbeec1ff94077f85'
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
          url: 'https://www.test.com/image3url'
        }
      ])
    ).toBe(
      `Tuple(
        Bytes("4a962025cad241a583c4f2b25007a8f928963b8cc6adac6dcbeec1ff94077f85"),
        Bytes("170b618e9981c567c0de560a5a2e62e470cf66847999a461d9f878d3583e080f"),
      )`
    )
  })
})

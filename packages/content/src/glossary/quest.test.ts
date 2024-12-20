import { expect, describe, it } from 'vitest'
import { loadGlossary } from './load-glossary'

describe('load glossary', () => {
  it('should successfully load', async () => {
    expect((await loadGlossary('en')).length).greaterThan(1)
  })
})

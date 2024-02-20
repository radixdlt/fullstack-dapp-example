import { expect, describe, it } from 'vitest'
import { loadQuests } from './load-quests'

describe('load quests', () => {
  it('should successfully load', async () => {
    expect((await loadQuests('en')).length).greaterThan(1)
  })
})

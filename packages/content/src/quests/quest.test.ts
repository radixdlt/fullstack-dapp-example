import { expect, describe, it } from 'vitest'
import { loadQuests } from './load-quests'

describe('load quests', () => {
  it('should successfully load', async () => {
    expect(loadQuests('en', 2).length).greaterThan(1)
  })
})

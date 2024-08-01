import { describe, it, expect } from 'vitest'
import { getRandomFloat } from '../helpers/random'
import { genRadgem, RadgemColor } from './radgems'

const newRadgem = () => genRadgem(getRandomFloat(), getRandomFloat(), getRandomFloat())

describe('RadGems', () => {
  it('should generate a new Radgem', () => {
    const actual = newRadgem()
    expect(actual).toBeDefined()
  })
  it('should generate Radgems with correct distribution', () => {
    const colorDistribution = {
      [RadgemColor.Blood]: 0,
      [RadgemColor.Coral]: 0,
      [RadgemColor.Dusk]: 0,
      [RadgemColor.Flame]: 0,
      [RadgemColor.Forest]: 0,
      [RadgemColor.Glacier]: 0,
      [RadgemColor.Ocean]: 0,
      [RadgemColor.Sand]: 0,
      [RadgemColor.Sky]: 0,
      [RadgemColor.Smoke]: 0
    }
    const materialDistribution = {
      Crystalline: 0,
      Metallic: 0,
      Radiant: 0
    }

    const count = 100_000
    new Array(count).fill(0).forEach(() => {
      const actual = newRadgem()
      colorDistribution[actual.color]++
      materialDistribution[actual.material.name]++
    })

    const colorDistributionRatios = Object.entries(colorDistribution).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value / count }),
      {}
    )
    const materialDistributionRatios = Object.entries(materialDistribution).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value / count }),
      {}
    )

    console.log({ colorDistribution, materialDistribution })
    console.log({ colorDistributionRatios, materialDistributionRatios })
  })
})

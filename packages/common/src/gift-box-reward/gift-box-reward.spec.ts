import { describe, it, expect } from 'vitest'
import { GiftBoxReward, GiftBoxRewardConfig } from './gift-box-reward'
import { starterBoxCard, availableEnergyCardsByRarity, EnergyCardRarity } from '../energy-cards'
import { getRandomFloat, getRandomIntInclusive } from '../helpers/random'

const cards = availableEnergyCardsByRarity

const commonCards = cards['Common']
const rareCards = cards['Rare']
const ultraRareCards = cards['Ultra-rare']

const giftBoxRewards = GiftBoxReward(
  GiftBoxRewardConfig({
    getRandomFloat,
    getRandomIntInclusive
  })
)

giftBoxRewards('Simple').energyCard

describe('GiftBoxRewards', () => {
  it('should open a Starter gift box', () => {
    const actual = giftBoxRewards('Starter')

    expect(actual.elements).toEqual(15)
    expect(actual.energyCard.energy_type).toEqual(starterBoxCard.energyType.toLowerCase())
  })
  it('should open a Simple gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards].map((card) =>
      card.energyType.toLowerCase()
    )

    const cardDistribution = {
      [EnergyCardRarity.Common.toLowerCase()]: 0,
      [EnergyCardRarity.Rare.toLowerCase()]: 0,
      [EnergyCardRarity.UltraRare.toLowerCase()]: 0
    }

    const cards = new Array(10_000).fill(0).map(() => {
      const actual = giftBoxRewards('Simple')
      expect(actual.elements).greaterThanOrEqual(5)
      expect(actual.elements).lessThanOrEqual(14)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energy_type)
      cardDistribution[actual.energyCard.rarity]++
      return actual
    })

    console.log(cards[0])

    console.log({ simple: cardDistribution })
  })
  it('should open a Fancy gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards, ...ultraRareCards].map((card) =>
      card.energyType.toLowerCase()
    )

    const cardDistribution = {
      [EnergyCardRarity.Common.toLowerCase()]: 0,
      [EnergyCardRarity.Rare.toLowerCase()]: 0,
      [EnergyCardRarity.UltraRare.toLowerCase()]: 0
    }

    new Array(10_000).fill(0).forEach(() => {
      const actual = giftBoxRewards('Fancy')
      expect(actual.elements).greaterThanOrEqual(10)
      expect(actual.elements).lessThanOrEqual(19)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energy_type)
      cardDistribution[actual.energyCard.rarity]++
    })

    console.log({ fancy: cardDistribution })
  })

  it('should open a Elite gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards, ...ultraRareCards].map((card) =>
      card.energyType.toLowerCase()
    )

    const cardDistribution = {
      [EnergyCardRarity.Common.toLowerCase()]: 0,
      [EnergyCardRarity.Rare.toLowerCase()]: 0,
      [EnergyCardRarity.UltraRare.toLowerCase()]: 0
    }

    new Array(10_000).fill(0).forEach(() => {
      const actual = giftBoxRewards('Elite')
      expect(actual.elements).greaterThanOrEqual(20)
      expect(actual.elements).lessThanOrEqual(30)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energy_type)
      cardDistribution[actual.energyCard.rarity]++
    })

    console.log({ elite: cardDistribution })
  })
})

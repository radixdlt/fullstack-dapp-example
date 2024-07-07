import { describe, it, expect } from 'vitest'
import { giftBox } from './gift-box'
import { starterBoxCard, availableEnergyCardsByRarity, EnergyCardRarity } from '../energy-cards'

const cards = availableEnergyCardsByRarity

const commonCards = cards.Common
const rareCards = cards.Rare
const ultraRareCards = cards['Ultra-Rare']

describe('GiftBox', () => {
  it('should open a Starter gift box', () => {
    const actual = giftBox.open('Starter').rewards
    expect(actual.elements).toEqual(10)
    expect(actual.energyCard.energyType).toEqual(starterBoxCard.energyType)
  })
  it('should open a Simple gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards].map((card) => card.energyType)

    const cardDistribution = {
      [EnergyCardRarity.Common]: 0,
      [EnergyCardRarity.Rare]: 0,
      [EnergyCardRarity.UltraRare]: 0
    }

    new Array(10_000).fill(0).forEach(() => {
      const actual = giftBox.open('Simple').rewards
      expect(actual.elements).greaterThanOrEqual(15)
      expect(actual.elements).lessThanOrEqual(24)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energyType)
      cardDistribution[actual.energyCard.rarity]++
    })

    console.log({ simple: cardDistribution })
  })
  it('should open a Fancy gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards, ...ultraRareCards].map(
      (card) => card.energyType
    )

    const cardDistribution = {
      [EnergyCardRarity.Common]: 0,
      [EnergyCardRarity.Rare]: 0,
      [EnergyCardRarity.UltraRare]: 0
    }

    new Array(10_000).fill(0).forEach(() => {
      const actual = giftBox.open('Fancy').rewards
      expect(actual.elements).greaterThanOrEqual(25)
      expect(actual.elements).lessThanOrEqual(34)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energyType)
      cardDistribution[actual.energyCard.rarity]++
    })

    console.log({ fancy: cardDistribution })
  })

  it('should open a Elite gift box', () => {
    const expectedEnergyTypes = [...commonCards, ...rareCards, ...ultraRareCards].map(
      (card) => card.energyType
    )

    const cardDistribution = {
      [EnergyCardRarity.Common]: 0,
      [EnergyCardRarity.Rare]: 0,
      [EnergyCardRarity.UltraRare]: 0
    }

    new Array(10_000).fill(0).forEach(() => {
      const actual = giftBox.open('Elite').rewards
      expect(actual.elements).greaterThanOrEqual(35)
      expect(actual.elements).lessThanOrEqual(45)
      expect(expectedEnergyTypes).toContain(actual.energyCard.energyType)
      cardDistribution[actual.energyCard.rarity]++
    })

    console.log({ elite: cardDistribution })
  })
})

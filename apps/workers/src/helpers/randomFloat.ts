import { getRandomValues } from 'node:crypto'

export const randomFloat = () => {
  const typedArray = new Uint32Array(1)
  const randomValue = getRandomValues(typedArray)[0]
  const randomFloat = randomValue / Math.pow(2, 32)
  return `${randomFloat}`.slice(0, 20)
}

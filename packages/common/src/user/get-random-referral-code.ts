import { getRandomValues } from 'node:crypto'

export const getRandomReferralCode = (length: number = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const randomArray = new Uint8Array(length)
  getRandomValues(randomArray)
  randomArray.forEach((number) => {
    result += chars[number % chars.length]
  })
  return result
}

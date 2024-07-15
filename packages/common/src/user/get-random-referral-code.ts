import crypto from 'crypto'

export const getRandomReferralCode = (length: number = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const randomArray = new Uint8Array(length)
  // @ts-ignore
  crypto.getRandomValues(randomArray)
  randomArray.forEach((number) => {
    result += chars[number % chars.length]
  })
  return result
}

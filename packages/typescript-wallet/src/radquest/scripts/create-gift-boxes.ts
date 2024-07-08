import { metadata } from 'common'
import { createGiftBoxResource } from '../helpers/createGiftBoxResource'
import { ResultAsync } from 'neverthrow'

const exec = async () => {
  const entries = Object.entries(metadata.resources.giftBox)
  await ResultAsync.combine(
    entries.map(([key, value]) => createGiftBoxResource(value).map((result) => [key, result]))
  ).map((results) => {
    console.log(Object.fromEntries(results))
  })
}

exec()

import { config } from '../../config'
import { registerGiftBoxResources } from '../helpers/registerGiftBoxResources'

const exec = async () => {
  const result = await registerGiftBoxResources(config.radQuest.components.giftBoxOpenerV2)
  if (result.isErr()) throw result.error
}

exec()

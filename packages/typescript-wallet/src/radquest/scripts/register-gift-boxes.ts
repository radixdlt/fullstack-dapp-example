import { config } from '../../config'
import { registerGiftBoxResources } from '../helpers/registerGiftBoxResources'

const exec = async () => {
  const result = await registerGiftBoxResources(config.radQuest.components.giftBoxOpener)
  if (result.isErr()) throw result.error
}

exec()

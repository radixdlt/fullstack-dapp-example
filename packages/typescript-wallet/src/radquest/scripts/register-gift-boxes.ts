import { registerGiftBoxResources } from '../helpers/registerGiftBoxResources'

const exec = async () => {
  const result = await registerGiftBoxResources()
  if (result.isErr()) throw result.error
}

exec()

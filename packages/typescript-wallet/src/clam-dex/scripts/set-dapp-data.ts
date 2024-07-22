import { logger } from '../../helpers'
import { setJettyswapMetadata } from '../helpers/setJettyswapMetadata'
import { setLettyswapMetadata } from '../helpers/setLettyswapMetadata'

const exec = async () => {
  const result1 = await setLettyswapMetadata()
  if (result1.isErr()) logger.error(result1.error)
  else logger.info(result1.value)
  const result2 = await setJettyswapMetadata()
  if (result2.isErr()) logger.error(result2.error)
  else logger.info(result2.value)
}

exec()

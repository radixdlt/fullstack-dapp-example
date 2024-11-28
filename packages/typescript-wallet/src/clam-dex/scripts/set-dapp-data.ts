import { logger } from '../../helpers'
import { setJettyswapMetadata } from '../helpers/setJettyswapMetadata'

const exec = async () => {
  const result2 = await setJettyswapMetadata()
  if (result2.isErr()) logger.error(result2.error)
  else logger.debug(result2.value)
}

exec()

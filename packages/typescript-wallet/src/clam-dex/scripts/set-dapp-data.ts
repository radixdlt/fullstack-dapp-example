import { logger } from '../../helpers'
import { setJettyswapMetadata } from '../helpers/setJettyswapMetadata'
import { setLettyswapMetadata } from '../helpers/setLettyswapMetadata'

const exec = async () => {
  const result1 = await setLettyswapMetadata()
  if (result1.isErr()) logger.error(result1.error)
  const result2 = await setJettyswapMetadata()
  if (result2.isErr()) logger.error(result2.error)
}

exec()

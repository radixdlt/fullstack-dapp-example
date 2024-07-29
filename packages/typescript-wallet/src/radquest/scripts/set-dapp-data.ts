import { logger } from '../../helpers'
import { setJettyMetadata } from '../helpers/setJettyMetadata'
import { setRadquestMetadata } from '../helpers/setRadquestMetadata'

const exec = async () => {
  const result1 = await setRadquestMetadata()
  if (result1.isErr()) logger.error(result1.error)
  else logger.debug(result1.value)
  const result2 = await setJettyMetadata()
  if (result2.isErr()) logger.error(result2.error)
  else logger.debug(result2.value)
}

exec()

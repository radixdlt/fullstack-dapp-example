import { logger } from '../../helpers'
import { setJettyMetadata } from '../helpers/setJettyMetadata'
import { setRadquestMetadata } from '../helpers/setRadquestMetadata'

const exec = async () => {
  const result1 = await setRadquestMetadata()
  if (result1.isErr()) logger.error(result1.error)
  const result2 = await setJettyMetadata()
  if (result2.isErr()) logger.error(result2.error)
}

exec()

import { logger } from '../../helpers'
import { setRadquestMetadata } from '../helpers/setRadquestMetadata'

const exec = async () => {
  const result = await setRadquestMetadata()
  if (result.isErr()) logger.error(result.error)
  else logger.debug(result.value)
}

exec()

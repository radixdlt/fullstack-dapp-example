import { config } from '../../config'
import { logger } from '../../helpers'
import { setDappDefinitionMetadata } from '../helpers/setDappDefinitionMetadata'

const exec = async () => {
  const result = await setDappDefinitionMetadata(config.radQuest.accounts.dAppDefinition.address)
  if (result.isErr()) logger.error(result.error)
}

exec()

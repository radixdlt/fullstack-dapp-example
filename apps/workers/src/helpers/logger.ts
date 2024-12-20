import { createAppLogger } from 'common'
import { config } from '../config'

export const logger = createAppLogger({ level: config.logLevel })

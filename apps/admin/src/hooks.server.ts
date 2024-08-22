import { error, type Handle } from '@sveltejs/kit'
import { env as privateEnv } from '$env/dynamic/private'
import { verifyJwt } from '$lib/verify-jwt'
import { PrismaClient } from 'database'
import { ImageController } from '$lib/server/image/controller'
import { ImageModel, appLogger, BlockedCountryModel } from 'common'
import { getQueues } from 'queues'
import { config } from '$lib/config'
import { readReplicas } from '@prisma/extension-read-replicas'

const { JWT_SECRET, DATABASE_URL, RO_DATABASE_URL } = privateEnv

const readUrl = RO_DATABASE_URL

const dbClient = new PrismaClient({
  datasourceUrl: DATABASE_URL
}).$extends({ ...(readUrl ? readReplicas({ url: readUrl }) : {}) }) as unknown as PrismaClient

const queues = getQueues(config.redis)
const logger = appLogger

const imageController = ImageController({
  imageModel: ImageModel(dbClient)(logger),
  systemQueue: queues.System
})

const blockedCountryModel = BlockedCountryModel(dbClient)(logger)

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/health') {
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  const jwt = event.cookies.get('jwt')

  if (jwt) {
    const result = verifyJwt(jwt, JWT_SECRET)

    if (result.isErr() || result.value.userType !== 'ADMIN') return error(401)

    const { userId, userType } = result.value

    event.locals.userId = userId
    event.locals.userType = userType
    event.locals.dbClient = dbClient
    event.locals.blockedCountryModel = blockedCountryModel
    event.locals.imageController = imageController
    event.locals.eventQueue = queues.Event
    event.locals.transactionQueue = queues.Transaction
    event.locals.systemQueue = queues.System
    event.locals.logger = logger

    return resolve(event, {})
  }

  return error(401)
}

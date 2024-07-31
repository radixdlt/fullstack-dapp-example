import { error, type Handle } from '@sveltejs/kit'
import { env as privateEnv } from '$env/dynamic/private'
import { verifyJwt } from '$lib/verify-jwt'
import { PrismaClient } from 'database'
import { ImageController } from '$lib/server/image/controller'
import { ImageModel, appLogger } from 'common'
import { getQueues } from 'queues'
import { config } from '$lib/config'
import { readReplicas } from '@prisma/extension-read-replicas'

const {
  JWT_SECRET,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  RO_DATABASE_URL
} = privateEnv

const readUrl = RO_DATABASE_URL

const dbClient = new PrismaClient({
  datasourceUrl: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public`
}).$extends({ ...(readUrl ? readReplicas({ url: readUrl }) : {}) }) as unknown as PrismaClient

const { systemQueue, eventQueue, transactionQueue } = getQueues(config.redis)
const logger = appLogger

const imageController = ImageController({
  imageModel: ImageModel(dbClient)(logger),
  systemQueue: systemQueue.queue
})

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
    event.locals.imageController = imageController
    event.locals.eventQueue = eventQueue
    event.locals.transactionQueue = transactionQueue
    event.locals.systemQueue = systemQueue
    event.locals.logger = logger

    return resolve(event, {})
  }

  return error(401)
}

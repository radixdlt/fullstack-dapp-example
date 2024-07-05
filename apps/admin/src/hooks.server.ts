import { error, type Handle } from '@sveltejs/kit'
import { env as privateEnv } from '$env/dynamic/private'
import { verifyJwt } from '$lib/verify-jwt'
import { PrismaClient } from 'database'
import { RadmorphController } from '$lib/server/radmorph/controller'
import { RadMorphModel, appLogger } from 'common'
import { getQueues } from 'queues'
import { config } from '$lib/config'

const {
  JWT_SECRET,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} = privateEnv

const dbClient = new PrismaClient({
  datasourceUrl: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public`
})

const { systemQueue } = getQueues(config.redis)
const logger = appLogger

const radmorphController = RadmorphController({
  radMorphModel: RadMorphModel(dbClient)(logger),
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
    event.locals.radmorphController = radmorphController

    return resolve(event, {})
  }

  return error(401)
}

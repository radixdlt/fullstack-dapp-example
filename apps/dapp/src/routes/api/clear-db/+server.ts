import type { RequestHandler } from './$types'
import { dbClient } from '$lib/db'
import { json } from '@sveltejs/kit'
import { config } from '$lib/config'

export const POST: RequestHandler = () => {
  if (config.dapp.networkId === 1) return json({ status: 403 })

  return Promise.all([
    dbClient.user.deleteMany({}),
    dbClient.notification.deleteMany({}),
    dbClient.completedQuestRequirement.deleteMany({}),
    dbClient.event.deleteMany({}),
    dbClient.questProgress.deleteMany({}),
    dbClient.savedProgress.deleteMany({}),
    dbClient.transaction.deleteMany({}),
    dbClient.userPhoneNumber.deleteMany({})
  ]).then(() =>
    json({
      status: 200
    })
  )
}

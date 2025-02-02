import type { RequestHandler } from './$types'
import { dbClient } from '$lib/db'
import { json } from '@sveltejs/kit'
import { config } from '$lib/config'

export const POST: RequestHandler = async ({ locals }) => {
  if (config.dapp.networkId === 1) return json({ status: 403 })

  return Promise.all([
    dbClient.user.delete({ where: { id: locals.userId } }),
    dbClient.notification.deleteMany({ where: { userId: locals.userId } }),
    dbClient.message.deleteMany({ where: { userId: locals.userId } }),
    dbClient.completedQuestRequirement.deleteMany({ where: { userId: locals.userId } }),
    dbClient.event.deleteMany({ where: { userId: locals.userId } }),
    dbClient.questProgress.deleteMany({ where: { userId: locals.userId } }),
    dbClient.savedProgress.deleteMany({ where: { userId: locals.userId } }),
    dbClient.transactionIntent.deleteMany({ where: { userId: locals.userId } })
  ]).then(() =>
    json({
      status: 200
    })
  )
}

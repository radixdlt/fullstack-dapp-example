import type { RequestHandler } from './$types'
import { isDevEnvironment } from '$lib/server/helpers/is-dev-environment'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals, request }) => {
  if (!isDevEnvironment()) return json({}, { status: 403 })

  const userId = locals.userId

  const { accountAddress } = await request.json()

  await locals.dependencies.dbClient.user.update({
    data: { accountAddress },
    where: { id: userId }
  })

  await locals.dependencies.dbClient.completedQuestRequirement.create({
    data: {
      userId,
      questId: 'FirstTransactionQuest',
      requirementId: 'RegisterAccount'
    }
  })

  await locals.dependencies.transactionModel.add({
    type: 'PopulateResources',
    accountAddress: accountAddress,
    discriminator: `PopulateResources:${locals.context.traceId}`,
    userId,
    traceId: locals.context.traceId
  })

  return json({}, { status: 200 })
}

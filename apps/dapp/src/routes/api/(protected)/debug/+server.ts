import type { RequestHandler } from './$types'
import { isDevEnvironment } from '$lib/server/helpers/is-dev-environment'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ locals, request }) => {
  if (!isDevEnvironment()) return json({}, { status: 403 })

  const userId = locals.userId

  const body = await request.json()

  const { accountAddress, type } = body

  locals.context.logger.info({ method: 'debug', userId, body })

  if (type === 'registerAccount') {
    await locals.dependencies.dbClient.user.update({
      data: { accountAddress },
      where: { id: userId }
    })

    await locals.dependencies.dbClient.completedQuestRequirement.create({
      data: {
        userId,
        questId: 'GetStuff',
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
  } else if (type === 'addPhoneNumber') {
    await locals.dependencies.userQuestModel.addVerifiedPhoneNumber(
      userId,
      'GB',
      crypto.randomUUID(),
      crypto.randomUUID()
    )
  } else if (type === 'clearPhoneNumbers') {
    await locals.dependencies.dbClient.userPhoneNumber.deleteMany({})
  } else if (type === 'addReferral') {
    const userResult = await locals.dependencies.userModel.getById(userId, {})
    if (userResult.isErr()) {
      return json({}, { status: 400 })
    }
    const user = userResult.value
    if (user)
      await locals.dependencies.systemQueue.queue.add('AddReferral', {
        type: 'AddReferral',
        userId,
        referralCode: user.referralCode,
        traceId: locals.context.traceId
      })
  } else if (type === 'updateKycOracle') {
    await locals.dependencies.systemQueue.queue.add('updateKYCOracle', {
      type: 'UpdateKycOracle',
      userId,
      traceId: locals.context.traceId
    })
  }

  return json({}, { status: 200 })
}

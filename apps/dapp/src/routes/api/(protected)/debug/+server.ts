import type { RequestHandler } from './$types'
import { isDevEnvironment } from '$lib/server/helpers/is-dev-environment'
import { json } from '@sveltejs/kit'
import { randomUUID } from 'node:crypto'
import { Priority } from 'common'

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

    await locals.dependencies.systemQueue.add([
      {
        type: 'PopulateResources',
        userId,
        accountAddress: accountAddress,
        id: randomUUID()
      }
    ])
  } else if (type === 'addReferral') {
    const userResult = await locals.dependencies.userModel.getById(userId, {})
    if (userResult.isErr()) {
      return json({}, { status: 400 })
    }
    const user = userResult.value
    if (user)
      await locals.dependencies.systemQueue.add([
        {
          type: 'AddReferral',
          userId,
          referralCode: user.referralCode,
          id: randomUUID()
        }
      ])
  } else if (type === 'depositHeroBadge') {
    await locals.dependencies.transactionModel.add(
      {
        traceId: randomUUID(),
        type: 'DepositHeroBadge',
        userId,
        discriminator: `DepositHeroBadge:${userId}`,
        accountAddress
      },
      Priority.High
    )
  } else if (type === 'mintElements') {
    await locals.dependencies.systemQueue.add([
      {
        type: 'MintElements',
        userId,
        accountAddress,
        id: randomUUID()
      }
    ])
  } else if (type === 'updateUserStatus') {
    await locals.dependencies.dbClient.user.update({
      where: { id: userId },
      data: { status: body.status }
    })
  }

  return json({}, { status: 200 })
}

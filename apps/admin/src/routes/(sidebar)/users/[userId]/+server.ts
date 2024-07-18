import { json } from '@sveltejs/kit'

export const POST = async ({ request, locals, params }) => {
  const requestBody = await request.json()

  const userId = params.userId

  const { block }: { block: boolean } = requestBody

  const user = await locals.dbClient.user.update({
    where: { id: userId },
    data: {
      blocked: block
    }
  })

  return json({ user }, { status: 200 })
}

export const GET = async ({ locals, params }) => {
  const user = await locals.dbClient.user.findUnique({
    where: { id: params.userId },
    include: {
      auditLogs: true,
      completedQuestRequirements: true,
      events: true,
      messages: true,
      phoneNumber: true,
      questProgress: true,
      referredByUser: true,
      savedProgress: true,
      transactions: true,
      marketing: true
    }
  })

  return json({ user: JSON.parse(JSON.stringify(user)) }, { status: 200 })
}

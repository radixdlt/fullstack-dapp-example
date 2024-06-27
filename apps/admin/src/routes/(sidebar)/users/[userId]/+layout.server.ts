import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, params }) => {
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
      transactions: true
    }
  })
  if (!user) redirect(200, '/users')

  return { user }
}

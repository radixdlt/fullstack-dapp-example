import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const transactions = await locals.dbClient.transactionIntent.findMany({
    orderBy: { createdAt: 'desc' },
    include: { transactions: true, user: true }
  })
  return { transactions }
}

import { json } from '@sveltejs/kit'

export const POST = async ({ locals, params }) => {
  const userId = params.userId

  const user = await locals.dbClient.phoneNumber.remove({
    where: { id: userId }
  })

  return json({ user }, { status: 200 })
}

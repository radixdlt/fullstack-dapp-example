import { json } from '@sveltejs/kit'

export const POST = async ({ locals, params }) => {
  const userId = params.userId

  if ((await locals.dbClient.userPhoneNumber.count({ where: { userId } })) === 1)
    await locals.dbClient.userPhoneNumber.delete({
      where: { userId }
    })

  return json({}, { status: 200 })
}

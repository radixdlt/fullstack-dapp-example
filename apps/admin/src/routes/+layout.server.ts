import { error } from '@sveltejs/kit'
import { UserType } from 'database'
import jwt from 'jsonwebtoken'

export async function load({ cookies }) {
  const cookie = cookies.get('jwt')

  if (cookie) {
    const decoded = jwt.decode(cookie, { json: true })
    if (decoded && decoded.userType === UserType.ADMIN) {
      return
    }
  }

  error(400)
}

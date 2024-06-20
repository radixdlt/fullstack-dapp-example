import { env } from '$env/dynamic/private'

export const isDevEnvironment = () =>
  ['http://localhost:5173'].includes(env.EXPECTED_ORIGIN) ||
  env.EXPECTED_ORIGIN.endsWith('.rdx-works-main.extratools.works')

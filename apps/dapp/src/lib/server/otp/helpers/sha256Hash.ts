import { ok } from 'neverthrow'
import { createHash } from 'node:crypto'

export const sha256Hash = (value: string) => ok(createHash('sha256').update(value).digest('hex'))

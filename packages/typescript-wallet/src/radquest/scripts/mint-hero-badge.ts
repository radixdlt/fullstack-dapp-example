import { mintHeroBadge } from '../helpers/mintHeroBadge'
import crypto from 'node:crypto'

mintHeroBadge(
  crypto.randomUUID().replace(/-/g, ''),
  'account_tdx_2_128sy9s0ymw0m2f4uyle6vyjwctnhvw5lewfjrl7lzz6kr57txuy07e'
)

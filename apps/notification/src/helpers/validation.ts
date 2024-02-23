export const hasStringUserId = (userId: unknown): userId is string => {
  return !!(userId && typeof userId === 'string')
}

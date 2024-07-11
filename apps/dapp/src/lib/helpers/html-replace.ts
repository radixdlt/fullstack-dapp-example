export const htmlReplace = (
  html: string | undefined,
  replacements: Record<string, string | null | undefined>
) => {
  if (!html) return ''
  let result = html
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value || '')
  }
  return result
}

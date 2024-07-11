export const htmlReplace = (html: string, replacements: Record<string, string>) => {
  let result = html
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value)
  }
  return result
}

import markdownit from 'markdown-it'
import { readMdFileSync } from './readMdFileSync'
import { resolve } from 'path'

export const mdParser = markdownit()

export const convertMarkdownFilePathToHtml = (...parts: string[]) => {
  try {
    const resolvedPath = resolve(...parts)
    const rendered = mdParser.render(readMdFileSync(resolvedPath))
    console.info('Rendered MD to HTML:', resolvedPath)
    return rendered
  } catch (e) {
    console.error('Error converting MD to HTML:', e)
    return ''
  }
}

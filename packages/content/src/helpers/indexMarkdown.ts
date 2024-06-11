import fs from 'fs'
import path from 'path'
import { produce } from 'immer'
import markdown from 'markdown-it'

const md = markdown({ html: true })

export const indexMarkdownFiles = (directoryPath: string) => {
  const itemIds = fs.readdirSync(directoryPath)

  let index: Record<string, Record<string, Record<string, string>>> = {}

  for (const itemId of itemIds) {
    const languages = fs.readdirSync(path.resolve(directoryPath, itemId))

    languages.forEach((language) => {
      fs.readdirSync(path.resolve(directoryPath, itemId, language)).forEach((filePath) => {
        const html = md.render(
          fs.readFileSync(path.resolve(directoryPath, itemId, language, filePath), 'utf8')
        )
        index = produce(index, (draft) => {
          if (!draft[itemId]) {
            draft[itemId] = { [language]: { [filePath]: html } }
          }
          draft[itemId][language][filePath] = html
        })
      })
    })
  }

  return index
}

var defaultRender =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, _, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href')
  let url: URL

  try {
    url = new URL(href!)
  } catch {
    return defaultRender(tokens, idx, options, env, self)
  }

  if (!(url.hostname === 'localhost' || url.hostname.includes('radquest'))) {
    tokens[idx].attrSet('target', '_blank')
  }

  return defaultRender(tokens, idx, options, env, self)
}

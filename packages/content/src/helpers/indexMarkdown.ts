import fs from 'fs'
import path from 'path'
import { produce } from 'immer'
import markdown from 'markdown-it'
const md = markdown()

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

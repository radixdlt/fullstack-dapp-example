import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { indexMarkdownFiles } from './src/helpers/indexMarkdown'

const questIndex = indexMarkdownFiles(path.resolve(__dirname, 'src', 'quests', 'markdown'))
const glossaryIndex = indexMarkdownFiles(path.resolve(__dirname, 'src', 'glossary', 'markdown'))
const landingPopupIndex = indexMarkdownFiles(
  path.resolve(__dirname, 'src', 'landingPopup', 'markdown')
)

console.log('Quest Index')
console.log(Object.keys(questIndex))

console.log('Glossary Index')
console.log(Object.keys(glossaryIndex))

console.log('Landing Popup Index')
console.log(Object.keys(landingPopupIndex))

fs.writeFileSync(
  path.resolve(__dirname, 'src', 'quests', 'quest-index.json'),
  JSON.stringify(questIndex, null, 2)
)

fs.writeFileSync(
  path.resolve(__dirname, 'src', 'glossary', 'glossary-index.json'),
  JSON.stringify(glossaryIndex, null, 2)
)

fs.writeFileSync(
  path.resolve(__dirname, 'src', 'landingPopup', 'landing-popup-index.json'),
  JSON.stringify(landingPopupIndex, null, 2)
)

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'index'
    }
  }
})

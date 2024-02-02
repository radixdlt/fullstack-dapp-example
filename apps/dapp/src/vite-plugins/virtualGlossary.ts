import ts from 'typescript'
import { tsPrinter } from './helpers/tsPrinter'
import { createArrayEntry, createStringEntry } from './helpers/tsFactoryHelpers'
import { virtualModuleFactory } from './helpers/virtualModuleFactory'
import { convertMarkdownFilePathToHtml } from './helpers/mdParser'
import { readDefinitionJson } from './helpers/readDefinitionJson'

type GlossaryEntry = {
  title: string
  id: string
}

type GlossaryDefinition = GlossaryEntry[]

export function virtualGlossary() {
  return virtualModuleFactory({
    name: 'glossary',
    loadFn({ directory, languages }) {
      try {
        const node = ts.factory.createObjectLiteralExpression(
          languages.map((language) =>
            createArrayEntry(
              language,
              readDefinitionJson<GlossaryDefinition>(directory, language).map(({ title, id }) => {
                const html = convertMarkdownFilePathToHtml(directory, language, `${id}.md`)

                return ts.factory.createObjectLiteralExpression([
                  createStringEntry('id', id),
                  createStringEntry('title', title),
                  createStringEntry('content', html)
                ])
              })
            )
          )
        )

        return `export const GlossaryContent = ${tsPrinter(node)};`
      } catch (e) {
        console.error(e)
        return 'export const GlossaryContent = {};'
      }
    }
  })
}

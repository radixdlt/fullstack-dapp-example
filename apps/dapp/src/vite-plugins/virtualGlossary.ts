import { readMdFileSync } from './helpers/readMdFileSync'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'
import ts from 'typescript'
import markdownit from 'markdown-it'
import { isNotJunk } from 'junk'
import { readJsonFileSync } from './helpers/readJsonFileSync'
import { tsPrinter } from './helpers/tsPrinter'
import { createStringObjectEntry } from './helpers/tsFactoryHelpers'

type GlossaryEntry = {
  title: string
  path: string
}

type GlossaryDefinition = GlossaryEntry[]

export function virtualGlossary() {
  const mdParser = markdownit()
  const virtualModuleId = 'virtual:glossary'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'glossary',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      try {
        if (id === resolvedVirtualModuleId) {
          const glossaryDir = resolve(cwd(), 'src', 'markdown', 'glossary')
          const languages = readdirSync(glossaryDir).filter(isNotJunk)

          const node = ts.factory.createObjectLiteralExpression(
            languages.map((language) => {
              const glossaryDefinition = readJsonFileSync<GlossaryDefinition>(
                resolve(glossaryDir, language, 'definition.json')
              )
              return ts.factory.createPropertyAssignment(
                language,
                ts.factory.createArrayLiteralExpression(
                  glossaryDefinition.map((glossaryEntry) => {
                    return ts.factory.createObjectLiteralExpression([
                      createStringObjectEntry('title', glossaryEntry.title),
                      createStringObjectEntry(
                        'content',
                        mdParser.render(
                          readMdFileSync(resolve(glossaryDir, language, glossaryEntry.path))
                        )
                      )
                    ])
                  })
                )
              )
            })
          )

          return `export const GlossaryContent = ${tsPrinter(node)};`
        }
      } catch (e) {
        return 'export const GlossaryContent = {}'
      }
    }
  }
}

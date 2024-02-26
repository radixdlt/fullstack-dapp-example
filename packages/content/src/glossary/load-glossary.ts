import { Language } from '../quests/quest-definitions'
import { GlossaryDefinitions, glossaryKeys } from './glossary-definitions'
import GlossaryIndex from './glossary-index.json'

export const loadGlossary = (language: Language) =>
  glossaryKeys.map((glossaryId) => {
    const glossaryDefinition = GlossaryDefinitions[glossaryId][language]
    const html = Object.values(GlossaryIndex[glossaryId][language])[0]

    if (!glossaryDefinition)
      throw new Error(`Language '${language}' is not supported for glossary: '${glossaryId}'`)

    return { id: glossaryId, ...glossaryDefinition, html }
  })

import GlossaryIndex from './glossary-index.json'

export type GlossaryId = keyof typeof GlossaryIndex

type Language = string

export type GlossaryDefinition = Record<Language, { title: string }>

export type GlossaryDefinitions = Record<GlossaryId, GlossaryDefinition>

export const GlossaryDefinitions: GlossaryDefinitions = {
  dexes: {
    en: { title: 'DEXes' }
  },
  dapps: {
    en: { title: 'dApps' }
  }
}

export const glossaryKeys = Object.keys(GlossaryDefinitions) as GlossaryId[]

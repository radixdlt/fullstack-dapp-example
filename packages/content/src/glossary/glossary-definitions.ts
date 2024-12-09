import GlossaryIndex from './glossary-index.json'

export type GlossaryId = keyof typeof GlossaryIndex

type Language = string

export type GlossaryDefinition = Record<Language, { title: string }>

export type GlossaryDefinitions = Record<GlossaryId, GlossaryDefinition>

export const GlossaryDefinitions: GlossaryDefinitions = {
  radixnetwork: {
    en: { title: 'Radix Network' }
  },
}

export const glossaryKeys = Object.keys(GlossaryDefinitions) as GlossaryId[]

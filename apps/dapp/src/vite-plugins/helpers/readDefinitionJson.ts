import { resolve } from 'path'
import { readJsonFileSync } from './readJsonFileSync'

export const readDefinitionJson = <T>(directory: string, language: string) =>
  readJsonFileSync<T>(resolve(directory, language, 'definition.json'))

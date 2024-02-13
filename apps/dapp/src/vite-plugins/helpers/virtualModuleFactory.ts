import { resolve } from 'path'
import { readdirSync } from 'fs'
import { isNotJunk } from 'junk'
import { cwd } from 'process'

/**
 * Helper function that abstracts away boilerplate code for creating a virtual module.
 * Additionally it iterates over the `src/markdown/{name}` directory and returns its content
 * (in this case it's supported languages)
 */
export function virtualModuleFactory({
  name,
  loadFn
}: {
  name: string
  loadFn: (params: { directory: string; languages: string[] }) => string
}) {
  const virtualModuleId = `virtual:${name}`
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name,
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const directory = resolve(cwd(), 'src', 'markdown', name)
        const languages = readdirSync(directory).filter(isNotJunk)

        return loadFn({
          directory,
          languages
        })
      }
    }
  }
}

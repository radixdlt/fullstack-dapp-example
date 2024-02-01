import { readFileSync } from 'fs'

export const readMdFileSync = (path: string): string => {
	return readFileSync(path).toString('utf8')
}

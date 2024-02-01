import { readFileSync } from 'fs'

export const readJsonFileSync = <T>(path: string) => {
	return JSON.parse(readFileSync(path).toString()) as T
}

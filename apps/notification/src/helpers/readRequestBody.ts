import { ResultAsync } from 'neverthrow'
import http from 'http'

export type JSONValue = string | number | boolean | JSONObject | JSONArray

export interface JSONObject {
  [x: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

export const readRequestBody = (request: http.IncomingMessage) => {
  const chunks: Buffer[] = []

  return ResultAsync.fromPromise(
    new Promise<JSONObject>((resolve, reject) => {
      request.on('data', (chunk) => {
        chunks.push(chunk)
      })
      request.on('end', () => {
        const data = Buffer.concat(chunks)
        try {
          const parsed = JSON.parse(data.toString())
          resolve(parsed)
        } catch (e) {
          reject(e)
        }
        
      })
      request.on('error', (error) => {
        reject(error)
      })
    }),
    (jsError) => ({ jsError, error: 'failed to read request body' })
  )
}

import http from 'http'
import { JSONObject } from './readRequestBody'

export const respondFactory = (response: http.ServerResponse) => ({
  error: (status: number, error: string) => {
    response.writeHead(status, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify({ error }))
    response.end()
  },
  success: (status?: number, data?: JSONObject) => {
    response.writeHead(status || 200, { 'Content-Type': 'application/json' })
    response.write(data ? JSON.stringify(data) : '')
    response.end()
  }
})

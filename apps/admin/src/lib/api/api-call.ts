import { fetchWrapper } from 'common'

// TODO: set domain based on configuration
const baseUrl = 'http://localhost:5173/'

export const apiCall = (fetchImpl: typeof fetch = fetch) => ({
  get: <T>(url: string) =>
    fetchWrapper<T>(
      fetchImpl(`${baseUrl}${url}`, {
        credentials: 'include'
      })
    ).map(({ data }) => data),
  post: <T>(url: string, body: any) =>
    fetchWrapper<T>(
      fetchImpl(`${baseUrl}${url}`, {
        credentials: 'include',
        body: JSON.stringify(body)
      })
    ).map(({ data }) => data)
})

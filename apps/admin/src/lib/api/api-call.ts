import { fetchWrapper } from 'common'
import { PUBLIC_RADQUEST_API } from '$env/static/public'

const baseUrl = PUBLIC_RADQUEST_API

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
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
    ).map(({ data }) => data)
})

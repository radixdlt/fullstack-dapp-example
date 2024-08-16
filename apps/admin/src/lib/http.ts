export const httpFactory = (fetchFn: typeof fetch) => {
  return {
    post: (url: string, body?: any) =>
      fetchFn(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()),
    get: (url: string) =>
      fetchFn(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()),
    put: (url: string, body?: any) =>
      fetchFn(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
  }
}

export const http = httpFactory(fetch)

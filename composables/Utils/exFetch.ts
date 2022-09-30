const { toastError } = useShowToast();

export const exFetch = (url: string, options?: FetchOptions) => {
  const config = useRuntimeConfig()

  const sheetUrl = new URL(config.baseURL + url)
  sheetUrl.searchParams.append('key', config.apiKey);
  
  return $fetch(sheetUrl.href, {
    ...options,
    async onResponse({ request, response, options }) {
      // console.log('[fetch response]')
    },
    async onResponseError({ request, response, options }) {
      const status = response?.status ?? 500
      // console.log(response)
    },

    async onRequest({ request, options }) {
      // console.log('[fetch request]')
    },
    async onRequestError({ request, options, error }) {
      console.error('[fetch request error]')
    }
  })
}
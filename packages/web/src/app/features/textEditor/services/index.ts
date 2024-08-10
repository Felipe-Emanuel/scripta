export const sentimentalAnalysis = async (textToAnalysis: string) => {
    const endpoint = process.env.NEXT_PUBLIC_MEANINGCLOUD_URL!
    const key = process.env.NEXT_PUBLIC_MEANINGCLOUD_KEY!

    const formdata = new FormData()
    formdata.append('key', key)
    formdata.append('txt', textToAnalysis)
    formdata.append('lang', 'pt')

    try {
      const response = fetch(endpoint, {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      })
        .then((response) => ({
          status: response.status,
          body: response.json()
        }))
        .then(({ status, body }) => console.log(status, body))
        .catch((error) => console.log('error', error))

      return await response
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message)
    }
  }
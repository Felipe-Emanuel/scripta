export const useEditorController = () => {
  const sentimentalAnalysis = async (textToAnalysis: string) => {
    const endpoint = 'https://api.meaningcloud.com/sentiment-2.1'
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

  return {
    sentimentalAnalysis
  }
}

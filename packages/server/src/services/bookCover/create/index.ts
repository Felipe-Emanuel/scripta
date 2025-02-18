import sharp from 'sharp'

export type TCreateBookCoverServiceRequest = {
  base64Image: string
}

export type TCreateBookCoverServiceResponse = string

export const CreateBookCoverService = async ({
  base64Image
}: TCreateBookCoverServiceRequest): Promise<TCreateBookCoverServiceResponse> => {
  const buffer = Buffer.from(base64Image, 'base64')

  const outputBuffer = await sharp(buffer)
    .resize(800, 1200)
    // .composite([{ // uso futuro para adicionar overlays (adesivos) à capa
    //   input: 'overlay.png',
    //   top: 50,
    //   left: 50
    // }])
    .toBuffer()

  const outputBase64 = outputBuffer.toString('base64')

  const base64WithPrefix = `data:image/webp;base64,${outputBase64}`

  return base64WithPrefix
}

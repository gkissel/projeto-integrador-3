import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeUpdateAccountImageService } from '../../factories/account/update-account-image.factory'
import { auth } from '../../middlewares/auth'

export async function updateAccountImage(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>()
  await app.register(auth)
  server.patch(
    '/organizations/:slug/accounts/:accountId/image',
    {
      schema: {
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        summary: 'Update account image',
        params: z.object({
          accountId: z.string(),
          slug: z.string(),
        }),
        consumes: ['application/json'],
        body: z.object({
          base64Image: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      console.log('updateAccountImage')
      const updateAccountImageService = makeUpdateAccountImageService()

      const { accountId } = request.params
      const { base64Image } = request.body

      if (!base64Image) {
        return reply.status(400).send({ message: 'Image is required' })
      }

      const buffer = base64ToBuffer(base64Image)

      const response = await updateAccountImageService.execute({
        accountId,
        imageBlob: buffer,
      })

      if (response.isLeft()) {
        const error = response.value
        throw error
      }

      return reply.status(200).send({ message: 'Image updated successfully' })
    },
  )
}

function base64ToBuffer(base64: string): Buffer {
  const binaryString = Buffer.from(base64, 'base64').toString('binary')
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return Buffer.from(bytes.buffer)
}

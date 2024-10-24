import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateOrganizationService } from '../../factories/organization/create-organization.factory'
import { auth } from '../../middlewares/auth'

export async function createOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations',
      {
        schema: {
          tags: ['Organization'],
          security: [{ bearerAuth: [] }],
          summary: 'Create a new organization',
          body: z.object({
            name: z.string(),
          }),
          response: {
            201: z.object({
              id: z.string(),
            }),
            409: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const createOrganizationService = makeCreateOrganizationService()

        const userId = await request.getCurrentUserId()
        const { name } = request.body

        const response = await createOrganizationService.execute({
          name,
          ownerId: userId,
        })

        if (response.isLeft()) {
          const error = response.value

          throw error
        }

        const { organization } = response.value

        return reply.status(201).send({ id: organization.id.toString() })
      },
    )
}

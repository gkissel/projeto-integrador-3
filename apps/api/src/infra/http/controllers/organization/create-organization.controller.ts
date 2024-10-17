import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateOrganizationService } from '../../factories/organization/create-organization.factory'

export async function createOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/organizations',
    {
      schema: {
        tags: ['Organization'],
        summary: 'Create a new organization',
        body: z.object({
          name: z.string(),
          slug: z.string(),
        }),
        response: {
          201: z.object({}),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const createOrganizationService = makeCreateOrganizationService()

      const userId = await request.getCurrentUserId()
      const { name, slug } = request.body

      const response = await createOrganizationService.execute({
        name,
        slug,
        ownerId: userId,
      })

      if (response.isLeft()) {
        const error = response.value

        throw error
      }

      return reply.status(201).send()
    },
  )
}

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './infra/env'
import { createOrganization } from './infra/http/controllers/organization/create-organization.controller'
import { getMembers } from './infra/http/controllers/organization/get-members.controller'
import { getMembership } from './infra/http/controllers/organization/get-membership.controller'
import { getOrganizationByUser } from './infra/http/controllers/organization/get-organization-by-user.controller'
import { authenticateWithPassword } from './infra/http/controllers/user/authenticate-user.controller'
import { createAccount } from './infra/http/controllers/user/create-user.controller'
import { deleteProfile } from './infra/http/controllers/user/delete-user.controller'
import { getUserByID } from './infra/http/controllers/user/get-user-by-id.controller'
import { getProfile } from './infra/http/controllers/user/get-user-profile.controller'
import { updateProfile } from './infra/http/controllers/user/update-user.controller'
import { errorHandler } from './infra/http/error-handler'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Projeto Integrador 3',
      description: 'Projeto Integrador 3.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(getUserByID)
app.register(updateProfile)
app.register(deleteProfile)
app.register(createOrganization)
app.register(getOrganizationByUser)
app.register(getMembers)
app.register(getMembership)

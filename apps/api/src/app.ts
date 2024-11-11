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
import { createMoneyAccount } from './infra/http/controllers/account/create-account.controller'
import { getAccountsByOrganization } from './infra/http/controllers/account/get-accounts-by-organization.controller'
import { getAccountsById } from './infra/http/controllers/account/get-acocunt-by-id.controller'
import { updateAccountImage } from './infra/http/controllers/account/update-account-image.controller'
import { acceptInvite } from './infra/http/controllers/invite/accept-invite.controller'
import { createInvite } from './infra/http/controllers/invite/create-invite.controller'
import { denyInvite } from './infra/http/controllers/invite/deny-invite.controller'
import { getInvitesByOrganization } from './infra/http/controllers/invite/get-invites-by-organization.controller'
import { getInvitesByUser } from './infra/http/controllers/invite/get-invites-by-user.controller'
import { revokeInvite } from './infra/http/controllers/invite/revoke-invite.controller'
import { createOrganization } from './infra/http/controllers/organization/create-organization.controller'
import { getMembers } from './infra/http/controllers/organization/get-members.controller'
import { getMembership } from './infra/http/controllers/organization/get-membership.controller'
import { getOrganizationById } from './infra/http/controllers/organization/get-organization-by-id.controller'
import { getOrganizationByUser } from './infra/http/controllers/organization/get-organization-by-user.controller'
import { createTransaction } from './infra/http/controllers/transaction/create-transaction.controller'
import { deleteTransaction } from './infra/http/controllers/transaction/delete-transaction.controller'
import { getTransactionById } from './infra/http/controllers/transaction/get-transaction-by-id.controller'
import { getTransactionsByAccount } from './infra/http/controllers/transaction/get-transactions-by-account.controller'
import { getTransactionsByOrganization } from './infra/http/controllers/transaction/get-transactions-by-organization.controller'
import { updateTransactionInfo } from './infra/http/controllers/transaction/update-transaction-info.controller'
import { authenticateWithPassword } from './infra/http/controllers/user/authenticate-user.controller'
import { changePassword } from './infra/http/controllers/user/change-password.controller'
import { createAccount } from './infra/http/controllers/user/create-user.controller'
import { deleteProfile } from './infra/http/controllers/user/delete-user.controller'
import { getUserByID } from './infra/http/controllers/user/get-user-by-id.controller'
import { getProfile } from './infra/http/controllers/user/get-user-profile.controller'
import { recoverPassword } from './infra/http/controllers/user/recover-passowrd.controller'
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

// User
app.register(createAccount)
app.register(authenticateWithPassword)
app.register(recoverPassword)
app.register(changePassword)

// Profile
app.register(getProfile)
app.register(getUserByID)
app.register(updateProfile)
app.register(deleteProfile)

// Organization
app.register(createOrganization)
app.register(getOrganizationByUser)
app.register(getOrganizationById)

// Member
app.register(getMembers)
app.register(getMembership)

// Invites
app.register(getInvitesByOrganization)
app.register(getInvitesByUser)
app.register(createInvite)
app.register(revokeInvite)
app.register(denyInvite)
app.register(acceptInvite)

// Account

app.register(createMoneyAccount)
app.register(updateAccountImage)
app.register(getAccountsByOrganization)
app.register(getAccountsById)

// Transaction
app.register(createTransaction)
app.register(getTransactionsByAccount)
app.register(getTransactionsByOrganization)
app.register(getTransactionById)
app.register(updateTransactionInfo)
app.register(deleteTransaction)

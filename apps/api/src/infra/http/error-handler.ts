import chalk from 'chalk'
import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EntityAlreadyExistsError } from '@/domain/money-app/application/services/errors/entity-already-exists-error'
import { OrganizationAlreadyExistsError } from '@/domain/money-app/application/services/errors/organization-already-exists-error'
import { UserAlreadyExistsError } from '@/domain/money-app/application/services/errors/user-already-exists-error'
import { WrongCredentialsError } from '@/domain/money-app/application/services/errors/wrong-credentials-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Erro de validação',
      errors: error.flatten().fieldErrors,
    })
  }
  console.log(error)

  console.error(chalk.redBright(error.message))

  // if (error instanceof BadRequestError) {
  //   reply.status(400).send({
  //     message: error.message,
  //   })
  // }

  // if (error instanceof UnauthorizedError) {
  //   reply.status(401).send({
  //     message: error.message,
  //   })
  // }

  if (error instanceof ResourceNotFoundError) {
    reply.status(404).send({
      message: 'Recurso não encontrado',
    })
  }

  if (error instanceof NotAllowedError) {
    reply.status(403).send({
      message: 'Você não tem permissão para acessar este recurso',
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    reply.status(409).send({
      message: 'Este e-mail já está em uso',
    })
  }

  if (error instanceof OrganizationAlreadyExistsError) {
    reply.status(409).send({
      message: 'Já existe uma organização com esse nome',
    })
  }

  if (error instanceof EntityAlreadyExistsError) {
    reply.status(409).send({
      message: 'Já existe uma entidade com esses dados',
    })
  }

  if (error instanceof WrongCredentialsError) {
    reply.status(401).send({
      message: 'Credenciais inválidas',
    })
  }

  // eslint-disable-next-line no-console
  console.error(chalk.red(error))

  // send error to some observability platform

  reply.status(500).send({ message: 'Erro do Servidor' })
}

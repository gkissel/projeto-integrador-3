import { ServiceError } from '@/core/errors/service-error'

type entityLists = 'member'

export class EntityAlreadyExistsError extends Error implements ServiceError {
  constructor(identifier: entityLists) {
    super(`Entidade ${identifier} já existe.`)
  }
}

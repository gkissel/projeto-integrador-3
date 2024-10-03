import { ServiceError } from '@/core/errors/service-error'

type uniqueUsersFields = 'email' | 'username'

export class UserAlreadyExistsError extends Error implements ServiceError {
  constructor(identifier: uniqueUsersFields, value: string) {
    super(`User with ${identifier}: "${value}" already exists.`)
  }
}

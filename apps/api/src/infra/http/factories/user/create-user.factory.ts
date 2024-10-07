import { CreateUserService } from '@/domain/money-app/application/services/user/create-user.service'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeCreateUserService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const bcryptHasher = new BcryptHasher()

  const createUserService = new CreateUserService(usersRepository, bcryptHasher)

  return createUserService
}

import { AuthenticateUserService } from '@/domain/money-app/application/services/user/authenticate-user.service'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeAuthenticateUserService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const bcryptHasher = new BcryptHasher()

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    bcryptHasher,
  )

  return authenticateUserService
}

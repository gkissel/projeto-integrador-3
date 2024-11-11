import { RecoverPasswordService } from '@/domain/money-app/application/services/user/recover-password.service'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeRecoverPasswordService() {
  const usersRepository = new DrizzleUsersRepository(db)
  const bcryptHasher = new BcryptHasher()

  const recoverPasswordService = new RecoverPasswordService(
    usersRepository,
    bcryptHasher,
  )

  return recoverPasswordService
}

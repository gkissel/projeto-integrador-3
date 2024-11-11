import { UpdateUserPasswordService } from '@/domain/money-app/application/services/user/update-user-password.service'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeUpdateUserPasswordService() {
  const usersRepository = new DrizzleUsersRepository(db)
  const bcryptHasher = new BcryptHasher()

  const updateUserPasswordService = new UpdateUserPasswordService(
    usersRepository,
    bcryptHasher,
    bcryptHasher,
  )

  return updateUserPasswordService
}

import { UpdateUserService } from '@/domain/money-app/application/services/user/update-user-info.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeUpdateUserService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const updateUserService = new UpdateUserService(usersRepository)

  return updateUserService
}

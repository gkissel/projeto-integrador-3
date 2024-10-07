import { DeleteUserService } from '@/domain/money-app/application/services/user/delete-user.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeDeleteUserService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const deleteUserService = new DeleteUserService(usersRepository)

  return deleteUserService
}

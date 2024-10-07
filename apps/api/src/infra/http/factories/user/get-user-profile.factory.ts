import { GetProfileService } from '@/domain/money-app/application/services/user/get-profile.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeGetUserProfileService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const getUserProfileService = new GetProfileService(usersRepository)

  return getUserProfileService
}

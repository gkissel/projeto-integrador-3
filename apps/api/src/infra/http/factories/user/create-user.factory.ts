import { CreateUserService } from '@/domain/money-app/application/services/user/create-user.service'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleMembersRepository from '@/infra/database/postgres/repositories/members.drizzle.repository'
import DrizzleOrganizationsRepository from '@/infra/database/postgres/repositories/organiaztions.drizzle.repository'
import DrizzleUsersRepository from '@/infra/database/postgres/repositories/users.drizzle.repository'

export function makeCreateUserService() {
  const usersRepository = new DrizzleUsersRepository(db)

  const bcryptHasher = new BcryptHasher()

  const organizationsRepository = new DrizzleOrganizationsRepository(db)

  const membersRepository = new DrizzleMembersRepository(db)

  const createUserService = new CreateUserService(
    usersRepository,
    bcryptHasher,
    organizationsRepository,
    membersRepository,
  )

  return createUserService
}

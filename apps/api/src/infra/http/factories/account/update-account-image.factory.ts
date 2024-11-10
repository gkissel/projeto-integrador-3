import { UpdateAccountImageService } from '@/domain/money-app/application/services/account/add-account-image.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'

export function makeUpdateAccountImageService() {
  const accountsRepository = new DrizzleAccountsRepository(db)

  const updateAccountImageService = new UpdateAccountImageService(
    accountsRepository,
  )

  return updateAccountImageService
}

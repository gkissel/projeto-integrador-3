import { GetAccountByIdService } from '@/domain/money-app/application/services/account/get-account-by-id.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'

export function makeGetAccountsByIdService() {
  const accountsRepository = new DrizzleAccountsRepository(db)

  const getAccountsByIdService = new GetAccountByIdService(accountsRepository)

  return getAccountsByIdService
}

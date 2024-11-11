import { CreateTransactionService } from '@/domain/money-app/application/services/transaction/create-transaction.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleAccountsRepository from '@/infra/database/postgres/repositories/accounts.drizzle.repository'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeCreateTransactionService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)
  const accountsRepository = new DrizzleAccountsRepository(db)

  const createTransactionService = new CreateTransactionService(
    transactionsRepository,
    accountsRepository,
  )

  return createTransactionService
}

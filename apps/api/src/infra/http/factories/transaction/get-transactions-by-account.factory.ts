import { GetTransactionsByAccountService } from '@/domain/money-app/application/services/transaction/get-transactions-by-account.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeGetTransactionsByAccountService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)

  const getTransactionsByAccountService = new GetTransactionsByAccountService(
    transactionsRepository,
  )

  return getTransactionsByAccountService
}

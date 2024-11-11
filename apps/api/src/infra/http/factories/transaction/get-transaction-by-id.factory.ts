import { GetTransactionByIdService } from '@/domain/money-app/application/services/transaction/get-transaction-by-id.service'
import { db } from '@/infra/database/postgres/connection.service'
import DrizzleTransactionsRepository from '@/infra/database/postgres/repositories/transactions.drizzle.repository'

export function makeGetTransactionByIdService() {
  const transactionsRepository = new DrizzleTransactionsRepository(db)

  const getTransactionByIdService = new GetTransactionByIdService(
    transactionsRepository,
  )

  return getTransactionByIdService
}

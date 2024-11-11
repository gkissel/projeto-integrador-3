import { Either, right } from '@/core/either'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import TransactionsRepository from '../../repositories/abstract/transactions.repository'

export interface GetTransactionsByAccountRequest {
  accountId: string
}

type GetTransactionsByAccountResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

export class GetTransactionsByAccountService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    accountId,
  }: GetTransactionsByAccountRequest): Promise<GetTransactionsByAccountResponse> {
    const transactions =
      await this.transactionsRepository.getByAccountId(accountId)

    return right({
      transactions,
    })
  }
}

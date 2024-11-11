import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import TransactionsRepository from '../../repositories/abstract/transactions.repository'

export interface GetTransactionByIdRequest {
  transactionId: string
}

type GetTransactionByIdResponse = Either<
  ResourceNotFoundError,
  {
    transaction: Transaction
  }
>

export class GetTransactionByIdService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: GetTransactionByIdRequest): Promise<GetTransactionByIdResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    return right({
      transaction,
    })
  }
}

import { Either, right } from '@/core/either'
import { Transaction } from '@/domain/money-app/enterprise/entities/transaction'

import TransactionsRepository from '../../repositories/abstract/transactions.repository'

export interface GetTransactionsByOrganizationRequest {
  orgId: string
}

type GetTransactionsByOrganizationResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

export class GetTransactionsByOrganizationService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    orgId,
  }: GetTransactionsByOrganizationRequest): Promise<GetTransactionsByOrganizationResponse> {
    const transactions = await this.transactionsRepository.getByOrgId(orgId)

    return right({
      transactions,
    })
  }
}

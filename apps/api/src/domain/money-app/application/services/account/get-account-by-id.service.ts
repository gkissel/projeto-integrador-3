import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Account } from '@/domain/money-app/enterprise/entities/account'

import AccountsRepository from '../../repositories/abstract/accounts.repository'

export interface GetAccountByIdRequest {
  accountId: string
}

type GetAccountByIdResponse = Either<
  ResourceNotFoundError,
  {
    account: Account
  }
>

export class GetAccountByIdService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    accountId,
  }: GetAccountByIdRequest): Promise<GetAccountByIdResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    return right({
      account,
    })
  }
}

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Account } from '@/domain/money-app/enterprise/entities/account'

import AccountsRepository from '../../repositories/abstract/accounts.repository'

interface UpdateAccountImageRequest {
  accountId: string
  imageBlob: Buffer
}

type UpdateAccountImageResponse = Either<
  ResourceNotFoundError,
  { account: Account }
>

export class UpdateAccountImageService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    imageBlob,
    accountId,
  }: UpdateAccountImageRequest): Promise<UpdateAccountImageResponse> {
    const account = await this.accountsRepository.findAccountById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    account.updateImage(imageBlob)

    await this.accountsRepository.updateAccountById(account)

    return right({ account })
  }
}

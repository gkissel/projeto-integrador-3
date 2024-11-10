import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Account } from '@/domain/money-app/enterprise/entities/account'

import AccountsRepository from '../../repositories/abstract/accounts.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'

interface CreateAccountRequest {
  name: string
  value: number
  orgId: string
}

type CreateAccountResponse = Either<ResourceNotFoundError, { account: Account }>

export class CreateAccountService {
  constructor(
    private accountsRepository: AccountsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    orgId,
    value,
  }: CreateAccountRequest): Promise<CreateAccountResponse> {
    const organization = await this.organizationsRepository.findById(orgId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const account = Account.create({
      name,
      value,
      orgId: organization.id,
    })

    await this.accountsRepository.create(account)

    return right({ account })
  }
}

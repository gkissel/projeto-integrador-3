import { Either, right } from '@/core/either'
import { Account } from '@/domain/money-app/enterprise/entities/account'

import AccountsRepository from '../../repositories/abstract/accounts.repository'

export interface GetAccountsByOrganizationRequest {
  orgId: string
}

type GetAccountsByOrganizationResponse = Either<
  never,
  {
    accounts: Account[]
  }
>

export class GetAccountsByOrganization {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    orgId,
  }: GetAccountsByOrganizationRequest): Promise<GetAccountsByOrganizationResponse> {
    const accounts = await this.accountsRepository.getAccountsByOrgId(orgId)

    return right({ accounts })
  }
}

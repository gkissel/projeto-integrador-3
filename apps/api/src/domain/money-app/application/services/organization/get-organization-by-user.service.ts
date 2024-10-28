import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'

export interface GetOrganizationByUserServiceRequest {
  userId: string
}

type GetOrganizationByUserServiceResponse = Either<
  null,
  {
    organizations: Array<Organization>
  }
>

export class GetOrganizationByUserService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    userId,
  }: GetOrganizationByUserServiceRequest): Promise<GetOrganizationByUserServiceResponse> {
    const memberships = await this.membersRepository.findByOwnerId(
      new UniqueEntityID(userId),
    )

    const organizationsPromise = await Promise.all(
      memberships.map(async (membership) => {
        const organization = await this.organizationsRepository.findById(
          membership.orgId.toString(),
        )
        return organization
      }),
    )

    const organizations = await organizationsPromise.filter(Boolean)

    return right({
      organizations,
    })
  }
}

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Member } from '@/domain/money-app/enterprise/entities/member'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

export interface CreateOrganizationServiceRequest {
  orgId: string
}

type GetOrganizationMembersServiceResponse = Either<
  OrganizationAlreadyExistsError,
  {
    members: Array<Member>
  }
>

export class GetOrganizationMembersService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    orgId,
  }: CreateOrganizationServiceRequest): Promise<GetOrganizationMembersServiceResponse> {
    const organization = await this.organizationsRepository.findById(orgId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const members = await this.membersRepository.findByOrganizationId(
      new UniqueEntityID(orgId),
    )

    return right({
      members,
    })
  }
}

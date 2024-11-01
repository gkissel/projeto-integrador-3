import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Member } from '@/domain/money-app/enterprise/entities/member'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

export interface CreateOrganizationServiceRequest {
  orgId: string
  userId: string
}

type GetMembershipServiceResponse = Either<
  OrganizationAlreadyExistsError,
  {
    member: Member
  }
>

export class GetMembershipService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    orgId,
  }: CreateOrganizationServiceRequest): Promise<GetMembershipServiceResponse> {
    const organization = await this.organizationsRepository.findById(orgId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const members = await this.membersRepository.findByOrganizationId(
      new UniqueEntityID(orgId),
    )

    const member = members.find(
      (member) => member.userId === organization.ownerId,
    )

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    return right({
      member,
    })
  }
}

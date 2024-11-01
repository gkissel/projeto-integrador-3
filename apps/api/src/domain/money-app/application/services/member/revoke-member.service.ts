import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface RevokeMemberServiceRequest {
  memberId: string

  organizationId: string
  userId: string
}

type RevokeMemberServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class RevokeMemberService {
  constructor(
    private membersRepository: MembersRepository,
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    memberId,
    userId,
    organizationId,
  }: RevokeMemberServiceRequest): Promise<RevokeMemberServiceResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const membersOfSameUser = await this.membersRepository.findByOwnerId(
      new UniqueEntityID(userId),
    )

    const userMember = membersOfSameUser
      .filter((member) => member.orgId.equals(organization.id))
      .find((member) => member.userId.equals(user.id))

    if (!userMember) {
      return left(new NotAllowedError())
    }

    if (!userMember.hasPermission('ADMIN')) {
      return left(new NotAllowedError())
    }

    const member = await this.membersRepository.findById(memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await this.membersRepository.delete(memberId)

    return right({})
  }
}

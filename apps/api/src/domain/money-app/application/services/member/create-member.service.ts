import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Member, ROLES } from '@/domain/money-app/enterprise/entities/member'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface CreateMemberServiceRequest {
  organizationId: string
  userId: string
  role: ROLES[keyof ROLES]
}

type CreateMemberServiceResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  {
    member: Member
  }
>

export class CreateQuestionService {
  constructor(
    private membersRepository: MembersRepository,
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    organizationId,
    userId,
    role,
  }: CreateMemberServiceRequest): Promise<CreateMemberServiceResponse> {
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

    let isSameOrganization: boolean = false

    membersOfSameUser.forEach((member) => {
      if (member.orgId.equals(new UniqueEntityID(organizationId))) {
        isSameOrganization = true
      }
    })

    if (isSameOrganization) {
      return left(new EntityAlreadyExistsError('member'))
    }

    const member = Member.create({
      orgId: new UniqueEntityID(organizationId),
      userId: new UniqueEntityID(userId),
      role,
    })

    await this.membersRepository.create(member)

    return right({
      member,
    })
  }
}

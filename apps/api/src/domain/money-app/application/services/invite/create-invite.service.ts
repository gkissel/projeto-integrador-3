import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'
import { ROLES } from '@/domain/money-app/enterprise/entities/member'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface CreateInviteServiceRequest {
  organizationId: string
  email: string
  role: ROLES[keyof ROLES]
  authorId: string
}

type CreateInviteServiceResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  {
    invite: Invite
  }
>

export class CreateInviteService {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    organizationId,
    email,
    role,
    authorId,
  }: CreateInviteServiceRequest): Promise<CreateInviteServiceResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const author = await this.usersRepository.findById(authorId)

    if (!author) {
      return left(new ResourceNotFoundError())
    }

    const invite = Invite.create({
      orgId: new UniqueEntityID(organizationId),
      email,
      role,
      authorId: author.id,
    })

    await this.invitesRepository.create(invite)

    return right({
      invite,
    })
  }
}

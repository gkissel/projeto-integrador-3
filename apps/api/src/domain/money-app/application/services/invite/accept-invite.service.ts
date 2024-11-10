import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Member } from '@/domain/money-app/enterprise/entities/member'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import MembersRepository from '../../repositories/abstract/members.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

export interface AcceptInviteServiceRequest {
  id: string
  userId: string
}

type AcceptInviteServiceResponse = Either<
  WrongCredentialsError | ResourceNotFoundError,
  object
>

export class AcceptInviteService {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    id,
    userId,
  }: AcceptInviteServiceRequest): Promise<AcceptInviteServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const invite = await this.invitesRepository.findById(id)

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    if (invite.email !== user.email) {
      return left(new WrongCredentialsError())
    }

    const member = Member.create({
      orgId: invite.orgId,
      userId: user.id,
      role: invite.role,
    })

    await this.membersRepository.create(member)

    await this.invitesRepository.deleteByid(id)

    return right({})
  }
}

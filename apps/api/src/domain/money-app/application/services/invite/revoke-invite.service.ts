import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import MembersRepository from '../../repositories/abstract/members.repository'

export interface RevokeInviteServiceRequest {
  memberId: string
  inviteId: string
}

type RevokeInviteServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    invite: Invite
  }
>

export class RevokeInviteService {
  constructor(
    private invitesRepository: InvitesRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    inviteId,
    memberId,
  }: RevokeInviteServiceRequest): Promise<RevokeInviteServiceResponse> {
    const invite = await this.invitesRepository.findById(inviteId)

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    const member = await this.membersRepository.findById(memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    if (member.role === 'MEMBER') {
      return left(new NotAllowedError())
    }

    await this.invitesRepository.deleteByid(inviteId)

    return right({
      invite,
    })
  }
}

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface GetInvitesByUserRequest {
  userId: string
}

type GetInvitesByUserResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  {
    invites: Invite[]
  }
>

export class GetInvitesByUser {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetInvitesByUserRequest): Promise<GetInvitesByUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const invites = await this.invitesRepository.getByEmail(user.email)

    return right({ invites })
  }
}

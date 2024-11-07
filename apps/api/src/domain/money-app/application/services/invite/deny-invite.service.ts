import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface DenyInviteServiceRequest {
  id: string
  userId: string
}

type DenyInviteServiceResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  object
>

export class DenyInviteService {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userId,
  }: DenyInviteServiceRequest): Promise<DenyInviteServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const invite = await this.invitesRepository.findById(id)

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    this.invitesRepository.deleteByid(id)

    return right({})
  }
}

import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'

import InvitesRepository from '../../repositories/abstract/invites.repository'
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error'

export interface GetInvitesByOrganizationRequest {
  orgId: string
}

type GetInvitesByOrganizationResponse = Either<
  EntityAlreadyExistsError | ResourceNotFoundError,
  {
    invites: Invite[]
  }
>

export class GetInvitesByOrganization {
  constructor(private invitesRepository: InvitesRepository) {}

  async execute({
    orgId,
  }: GetInvitesByOrganizationRequest): Promise<GetInvitesByOrganizationResponse> {
    const invites = await this.invitesRepository.getByOrgId(orgId)

    return right({ invites })
  }
}

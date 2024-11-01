import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import OrganizationsRepository from '../../repositories/abstract/organizations.repository'

export interface GetOrganizationByIdServiceRequest {
  orgId: string
}

type GetOrganizationByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    organization: Organization
  }
>

export class GetOrganizationByIdService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    orgId,
  }: GetOrganizationByIdServiceRequest): Promise<GetOrganizationByIdServiceResponse> {
    const organization = await this.organizationsRepository.findById(orgId)

    if (!organization) {
      return left(new ResourceNotFoundError())
    }
    return right({
      organization,
    })
  }
}

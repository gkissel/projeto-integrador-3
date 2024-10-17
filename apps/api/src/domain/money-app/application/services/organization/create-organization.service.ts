import { Either, left, right } from '@/core/either'
import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

export interface CreateOrganizationServiceRequest {
  name: string
  ownerId: string
  slug: string
}

type CreateOrganizationServiceResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

export class CreateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    ownerId,
    slug,
  }: CreateOrganizationServiceRequest): Promise<CreateOrganizationServiceResponse> {
    const organizationWithSameSlug =
      await this.organizationsRepository.findBySlug(Slug.createFromText(slug))

    if (organizationWithSameSlug) {
      return left(new OrganizationAlreadyExistsError('slug', slug))
    }

    const organization = Organization.create({
      name,
      ownerId: new UniqueEntityID(ownerId),
      slug: Slug.createFromText(slug),
    })

    await this.organizationsRepository.create(organization)

    return right({
      organization,
    })
  }
}

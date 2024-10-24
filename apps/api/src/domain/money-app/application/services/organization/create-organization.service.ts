import { Either, left, right } from '@/core/either'
import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Member } from '@/domain/money-app/enterprise/entities/member'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

export interface CreateOrganizationServiceRequest {
  name: string
  ownerId: string
}

type CreateOrganizationServiceResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

export class CreateOrganizationService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    name,
    ownerId,
  }: CreateOrganizationServiceRequest): Promise<CreateOrganizationServiceResponse> {
    const organizationWithSameSlug =
      await this.organizationsRepository.findBySlug(Slug.createFromText(name))

    if (organizationWithSameSlug) {
      return left(
        new OrganizationAlreadyExistsError(
          'slug',
          Slug.createFromText(name).value,
        ),
      )
    }

    const organization = Organization.create({
      name,
      ownerId: new UniqueEntityID(ownerId),
      slug: Slug.createFromText(name),
    })

    await this.organizationsRepository.create(organization)

    const member = Member.create({
      userId: new UniqueEntityID(ownerId),
      orgId: organization.id,
      role: 'ADMIN',
    })

    await this.membersRepository.create(member)

    return right({
      organization,
    })
  }
}

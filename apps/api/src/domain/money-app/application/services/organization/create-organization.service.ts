import { Either, left, right } from '@/core/either'
import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Member } from '@/domain/money-app/enterprise/entities/member'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
import { UsersRepository } from '../../repositories/abstract/users.repository'
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
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    ownerId,
  }: CreateOrganizationServiceRequest): Promise<CreateOrganizationServiceResponse> {
    const user = await this.usersRepository.findById(ownerId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

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
      role: 'OWNER',
    })

    await this.membersRepository.create(member)

    return right({
      organization,
    })
  }
}

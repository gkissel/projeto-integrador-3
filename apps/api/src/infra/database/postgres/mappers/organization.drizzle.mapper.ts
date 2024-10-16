import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import { DrizzleOrganization } from '../repositories/organiaztions.drizzle.repository'

export class DrizzleOrganizationMapper {
  static toDomain(raw: DrizzleOrganization): Organization {
    return Organization.create(
      {
        name: raw.name,
        ownerId: new UniqueEntityID(raw.ownerId || ''),
        slug: Slug.createFromText(raw.slug),

        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(organization: Organization): DrizzleOrganization {
    return {
      id: organization.id.toString(),

      name: organization.name,
      ownerId: organization.ownerId?.toString() || null,
      slug: organization.slug.value,

      createdAt: organization.createdAt || null,
      updatedAt: organization.updatedAt || null,
    }
  }
}

import { eq } from 'drizzle-orm'

import { Slug } from '@/core/entities/slug'
import OrganizationsRepository from '@/domain/money-app/application/repositories/abstract/organizations.repository'
import Organization from '@/domain/money-app/enterprise/entities/organization'

import { DrizzleClient } from '../connection.service'
import { DrizzleOrganizationMapper } from '../mappers/organization.drizzle.mapper'
import { organizations } from '../schema'

export type DrizzleOrganization = {
  id: string
  name: string
  slug: string
  createdAt: Date | null
  updatedAt: Date | null
  ownerId: string | null
}

export default class DrizzleOrganizationsRepository
  implements OrganizationsRepository
{
  constructor(private drizzle: DrizzleClient) {}

  async create(organization: Organization): Promise<void> {
    const data = DrizzleOrganizationMapper.toDrizzle(organization)
    await this.drizzle.insert(organizations).values(data).execute()
  }

  async update(organization: Organization): Promise<void> {
    const data = DrizzleOrganizationMapper.toDrizzle(organization)
    await this.drizzle
      .update(organizations)
      .set(data)
      .where(eq(organizations.id, data.id))
      .execute()
  }

  async delete(id: string): Promise<void> {
    await this.drizzle
      .delete(organizations)
      .where(eq(organizations.id, id))
      .execute()
  }

  async findById(id: string): Promise<Organization | null> {
    const [organization] = await this.drizzle
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .limit(1)
      .execute()
    if (!organization) {
      return null
    }
    return DrizzleOrganizationMapper.toDomain(organization)
  }

  async findByOwnerId(ownerId: string): Promise<Organization | null> {
    const [organization] = await this.drizzle
      .select()
      .from(organizations)
      .where(eq(organizations.ownerId, ownerId))
      .limit(1)
      .execute()

    if (!organization) {
      return null
    }

    return DrizzleOrganizationMapper.toDomain(organization)
  }

  async findAll(): Promise<Organization[]> {
    const allOrganizations = await this.drizzle
      .select()
      .from(organizations)
      .execute()

    return allOrganizations.map((organization) =>
      DrizzleOrganizationMapper.toDomain(organization),
    )
  }

  async findBySlug(slug: Slug): Promise<Organization | null> {
    const [organization] = await this.drizzle
      .select()
      .from(organizations)
      .where(eq(organizations.slug, slug.value))
      .limit(1)
      .execute()

    if (!organization) {
      return null
    }

    return DrizzleOrganizationMapper.toDomain(organization)
  }
}

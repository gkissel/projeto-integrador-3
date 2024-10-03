import { Slug } from '@/core/entities/slug'
import Organization from '@/domain/money-app/enterprise/entities/organization'

export default abstract class OrganizationsRepository {
  abstract create(organization: Organization): Promise<void>

  abstract findBySlug(slug: Slug): Promise<Organization | null>
  abstract findById(id: string): Promise<Organization | null>
  abstract findByOwnerId(ownerId: string): Promise<Organization | null>

  abstract update(organization: Organization): Promise<void>
  abstract delete(id: string): Promise<void>
}

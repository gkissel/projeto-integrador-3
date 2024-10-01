import { Entity } from '@/core/entities/entity'
import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrganizationProps {
  name: string
  slug: Slug
  ownerId?: UniqueEntityID | null

  createdAt?: Date
  updatedAt?: Date
}

export default class Organization extends Entity<OrganizationProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get ownerId() {
    return this.props.ownerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  protected transferOwnership(ownerId: UniqueEntityID) {
    this.props.ownerId = ownerId
  }

  static create(
    props: Optional<OrganizationProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Organization(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

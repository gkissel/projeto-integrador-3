import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ROLES {
  ADMIN: 'ADMIN'
  MEMBER: 'MEMBER'
  OWNER: 'OWNER'
}

export interface MemberProps {
  role: ROLES[keyof ROLES]
  orgId: UniqueEntityID
  userId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Member extends Entity<MemberProps> {
  get orgId() {
    return this.props.orgId
  }

  get userId() {
    return this.props.userId
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set role(role: ROLES[keyof ROLES]) {
    this.props.role = role

    this.touch()
  }

  public hasPermission(role: ROLES[keyof ROLES]) {
    return this.props.role === role
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<MemberProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Member(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

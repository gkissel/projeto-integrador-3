import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ROLES {
  ADMIN: 'ADMIN'
  MEMBER: 'MEMBER'
}

export interface MemberProps {
  role: ROLES[keyof ROLES]
  orgId: UniqueEntityID
  userId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Member extends Entity<MemberProps> {
  get role() {
    return this.props.role
  }

  get orgId() {
    return this.props.orgId
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
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

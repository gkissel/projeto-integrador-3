import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ROLES {
  ADMIN: 'ADMIN'
  INVITE: 'INVITE'
  OWNER: 'OWNER'
}

export interface InviteProps {
  email: string
  role: ROLES[keyof ROLES]

  authorId: UniqueEntityID
  orgId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Invite extends Entity<InviteProps> {
  get orgId() {
    return this.props.orgId
  }

  get authorId() {
    return this.props.authorId
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

  static create(
    props: Optional<InviteProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Invite(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

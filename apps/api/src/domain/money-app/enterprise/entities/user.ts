import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  firstName: string
  lastName: string
  birthdate: Date
  telephone: string

  username: string
  email: string
  password: string

  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get birthdate() {
    return this.props.birthdate
  }

  get telephone() {
    return this.props.telephone
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
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

  protected changePassword(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const organization = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

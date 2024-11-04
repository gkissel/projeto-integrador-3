import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AccountProps {
  name: string

  imageUrl: string

  maxValue: number
  actualValue: number

  orgId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Account extends Entity<AccountProps> {
  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get maxValue() {
    return this.props.maxValue
  }

  get actualValue() {
    return this.props.actualValue
  }

  set actualValue(actualValue: number) {
    this.props.actualValue = actualValue

    this.touch()
  }

  set maxValue(maxValue: number) {
    this.props.maxValue = maxValue

    this.touch()
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

  static create(
    props: Optional<AccountProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

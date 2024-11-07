import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type TransactionType = 'INCOME' | 'OUTCOME'

export interface TransactionProps {
  description: string

  value: number

  type: TransactionType

  accountId: UniqueEntityID
  orgId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Transaction extends Entity<TransactionProps> {
  get orgId() {
    return this.props.orgId
  }

  get accountId() {
    return this.props.accountId
  }

  get description() {
    return this.props.description
  }

  get type() {
    return this.props.type
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value

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
    props: Optional<TransactionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Transaction(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

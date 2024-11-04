import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BudgetProps {
  name: string

  iconName: string

  value: number

  orgId: UniqueEntityID

  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Budget extends Entity<BudgetProps> {
  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  get iconName() {
    return this.props.iconName
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
    props: Optional<BudgetProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Budget(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return organization
  }
}

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AccountProps {
  name: string

  imageBlob: Buffer | null

  value: number

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

  get imageBlob() {
    return this.props.imageBlob
  }

  get value() {
    return this.props.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  public updateImage(imageBlob: Buffer) {
    this.props.imageBlob = imageBlob
    this.touch()
  }

  public transaction(value: number) {
    this.props.value += value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AccountProps, 'createdAt' | 'imageBlob'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        imageBlob: props.imageBlob ?? null,
      },
      id,
    )

    return organization
  }
}

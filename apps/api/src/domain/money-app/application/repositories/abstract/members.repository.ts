import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Member } from '@/domain/money-app/enterprise/entities/member'

export default abstract class MembersRepository {
  abstract create(member: Member): Promise<void>

  abstract findById(id: string): Promise<Member | null>
  abstract findByOrganizationId(
    organizationId: UniqueEntityID,
  ): Promise<Array<Member>>

  abstract findByOwnerId(ownerId: UniqueEntityID): Promise<Array<Member>>

  abstract update(member: Member): Promise<void>
  abstract delete(id: string): Promise<void>
}

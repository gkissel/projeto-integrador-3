import { eq } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import MembersRepository from '@/domain/money-app/application/repositories/abstract/members.repository'
import { Member } from '@/domain/money-app/enterprise/entities/member'

import { DrizzleClient } from '../connection.service'
import { DrizzleMemberMapper } from '../mappers/member.drizzle.mapper'
import { members } from '../schema'

export type DrizzleMember = {
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  orgId: string
  role: 'ADMIN' | 'MEMBER' | 'OWNER'
  userId: string
}

export default class DrizzleMembersRepository implements MembersRepository {
  constructor(private drizzle: DrizzleClient) {}

  async create(member: Member) {
    this.drizzle
      .insert(members)
      .values(DrizzleMemberMapper.toDrizzle(member))
      .execute()
  }

  async findById(id: string): Promise<Member | null> {
    const [member] = await this.drizzle
      .select()
      .from(members)
      .where(eq(members.id, id))
      .limit(1)
      .execute()

    if (!member) {
      return null
    }
    return DrizzleMemberMapper.toDomain(member)
  }

  async findByOrganizationId(
    organizationId: UniqueEntityID,
  ): Promise<Array<Member>> {
    const membersArray = await this.drizzle
      .select()
      .from(members)
      .where(eq(members.orgId, organizationId.toString()))
      .execute()

    return membersArray.map((member) => DrizzleMemberMapper.toDomain(member))
  }

  async findByOwnerId(ownerId: UniqueEntityID): Promise<Array<Member>> {
    const membersArray = await this.drizzle
      .select()
      .from(members)
      .where(eq(members.userId, ownerId.toString()))
      .execute()

    return membersArray.map((member) => DrizzleMemberMapper.toDomain(member))
  }

  async update(member: Member): Promise<void> {
    const values = DrizzleMemberMapper.toDrizzle(member)
    await this.drizzle
      .update(members)
      .set(values)
      .where(eq(members.id, values.id))
      .execute()
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.delete(members).where(eq(members.id, id)).execute()
  }
}

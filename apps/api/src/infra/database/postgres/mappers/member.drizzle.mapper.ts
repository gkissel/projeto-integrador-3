import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Member } from '@/domain/money-app/enterprise/entities/member'

import { DrizzleMember } from '../repositories/members.drizzle.repository'

export class DrizzleMemberMapper {
  static toDomain(raw: DrizzleMember): Member {
    return Member.create(
      {
        orgId: new UniqueEntityID(raw.orgId),
        userId: new UniqueEntityID(raw.userId),

        role: raw.role,

        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(member: Member): DrizzleMember {
    return {
      id: member.id.toString(),

      orgId: member.orgId.toString(),
      userId: member.userId.toString(),

      role: member.role,

      createdAt: member.createdAt || null,
      updatedAt: member.updatedAt || null,
    }
  }
}

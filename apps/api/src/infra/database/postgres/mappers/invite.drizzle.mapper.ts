import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'

import { DrizzleInvite } from '../repositories/invites.drizzle.repository'

export class DrizzleInviteMapper {
  static toDomain(raw: DrizzleInvite): Invite {
    return Invite.create(
      {
        orgId: new UniqueEntityID(raw.orgId),
        authorId: new UniqueEntityID(raw.authorId),

        email: raw.email,
        role: raw.role,

        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(invite: Invite): DrizzleInvite {
    return {
      id: invite.id.toString(),

      orgId: invite.orgId.toString(),
      authorId: invite.authorId.toString(),
      email: invite.email,

      role: invite.role,

      createdAt: invite.createdAt || null,
    }
  }
}

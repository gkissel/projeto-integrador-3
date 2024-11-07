import { eq } from 'drizzle-orm'

import InvitesRepository from '@/domain/money-app/application/repositories/abstract/invites.repository'
import { Invite } from '@/domain/money-app/enterprise/entities/invite'

import { DrizzleClient } from '../connection.service'
import { DrizzleInviteMapper } from '../mappers/invite.drizzle.mapper'
import { invites } from '../schema'

export type DrizzleInvite = {
  id: string
  email: string
  createdAt: Date | null
  orgId: string
  role: 'ADMIN' | 'MEMBER' | 'OWNER'
  authorId: string
}

export default class DrizzleInvitesRepository implements InvitesRepository {
  constructor(private client: DrizzleClient) {}

  async create(invite: Invite): Promise<void> {
    const values = DrizzleInviteMapper.toDrizzle(invite)

    await this.client.insert(invites).values(values).execute()
  }

  async getByOrgId(orgId: string): Promise<Array<Invite>> {
    const invitesArray = await this.client
      .select()
      .from(invites)
      .where(eq(invites.orgId, orgId))
      .execute()

    return invitesArray.map((invite) => DrizzleInviteMapper.toDomain(invite))
  }

  async findById(id: string): Promise<Invite | null> {
    const [invite] = await this.client
      .select()
      .from(invites)
      .where(eq(invites.id, id))
      .limit(1)
      .execute()

    if (!invite) {
      return null
    }

    return DrizzleInviteMapper.toDomain(invite)
  }

  async getByEmail(email: string): Promise<Array<Invite>> {
    const invitesArray = await this.client
      .select()
      .from(invites)
      .where(eq(invites.email, email))
      .execute()

    return invitesArray.map((invite) => DrizzleInviteMapper.toDomain(invite))
  }

  async deleteByid(id: string): Promise<void> {
    await this.client.delete(invites).where(eq(invites.id, id)).execute()
  }
}

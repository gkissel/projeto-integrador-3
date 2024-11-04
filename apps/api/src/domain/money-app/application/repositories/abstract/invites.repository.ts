import { Invite } from '@/domain/money-app/enterprise/entities/invite'

export default abstract class InvitesRepository {
  abstract create(invite: Invite): Promise<void>
  abstract findInviteById(token: string): Promise<Invite | null>
  abstract findInviteByEmail(email: string): Promise<Invite | null>
  abstract deleteInviteByEmail(email: string): Promise<void>
}

import { Invite } from '@/domain/money-app/enterprise/entities/invite'

export default abstract class InvitesRepository {
  abstract create(invite: Invite): Promise<void>

  abstract getByOrgId(orgId: string): Promise<Array<Invite>>
  abstract findById(id: string): Promise<Invite | null>
  abstract getByEmail(email: string): Promise<Array<Invite>>
  abstract deleteByid(id: string): Promise<void>
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/money-app/enterprise/entities/account'
import { getAverageRGB, rgbToHex } from '@/infra/utils/image-colors'

import { DrizzleAccount } from '../repositories/accounts.drizzle.repository'

export class DrizzleAccountMapper {
  static toDomain(raw: DrizzleAccount): Account {
    return Account.create(
      {
        name: raw.name,
        imageBlob: raw.imageBlob,
        value: raw.value,
        orgId: new UniqueEntityID(raw.orgId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(account: Account): DrizzleAccount {
    return {
      id: account.id.toString(),
      name: account.name,
      imageBlob: account.imageBlob,
      value: account.value,
      orgId: account.orgId.toString(),
      createdAt: account.createdAt || null,
      updatedAt: account.updatedAt || null,
    }
  }

  static async toHTTP(account: Account) {
    const base64 = account.imageBlob?.toString('base64')

    let color: string | null = null

    if (account.imageBlob) {
      try {
        const avgRGB = await getAverageRGB(account.imageBlob)
        color = rgbToHex(avgRGB[0], avgRGB[1], avgRGB[2])
      } catch (error) {
        console.error('Error calculating image color:', error)
      }
    }

    return {
      id: account.id.toString(),
      name: account.name,
      imageUrl: base64 ? `data:image/jpeg;base64,${base64}` : undefined,
      value: account.value,
      orgId: account.orgId.toString(),

      mainColor: color ?? undefined,

      createdAt: account.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: account.updatedAt?.toISOString() ?? new Date().toISOString(),
    }
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { DrizzleUser } from '../repositories/users.drizzle.repository'

export class DrizzleUserMapper {
  static toDomain(raw: DrizzleUser): User {
    return User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,

        birthdate: raw.birthdate,
        telephone: raw.telephone,

        password: raw.password,
        email: raw.email,

        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(user: User): DrizzleUser {
    return {
      id: user.id.toString(),

      firstName: user.firstName,
      lastName: user.lastName,
      birthdate: user.birthdate,
      telephone: user.telephone,
      email: user.email,
      password: user.password,

      createdAt: user.createdAt || null,
      updatedAt: user.updatedAt || null,
    }
  }
}

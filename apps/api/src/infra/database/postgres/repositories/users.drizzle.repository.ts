import { eq } from 'drizzle-orm'

import { UsersRepository } from '@/domain/money-app/application/repositories/abstract/users.repository'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { DrizzleClient } from '../connection.service'
import { DrizzleUserMapper } from '../mappers/user.drizzle.mapper'
import { users } from '../schema'

export type DrizzleUser = {
  id: string
  firstName: string
  lastName: string
  birthdate: Date
  telephone: string
  email: string
  password: string
  createdAt: Date | null
  updatedAt: Date | null
}

export default class DrizzleUsersRepository implements UsersRepository {
  constructor(private drizzle: DrizzleClient) {}

  async create(user: User): Promise<void> {
    const values = DrizzleUserMapper.toDrizzle(user)

    await this.drizzle.insert(users).values(values).execute()
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.drizzle
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute()

    if (!user) {
      return null
    }

    return DrizzleUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.drizzle
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute()

    if (!user) {
      return null
    }

    return DrizzleUserMapper.toDomain(user)
  }

  async update(user: User): Promise<void> {
    const values = DrizzleUserMapper.toDrizzle(user)

    await this.drizzle
      .update(users)
      .set(values)
      .where(eq(users.id, values.id))
      .execute()
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.delete(users).where(eq(users.id, id)).execute()
  }
}

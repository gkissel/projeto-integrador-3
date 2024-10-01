import { User } from "@/domain/money-app/enterprise/entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>

  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
  abstract findByUsername(username: string): Promise<User | null>

  abstract update(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}

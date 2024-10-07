import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface UpdateUserServiceRequest {
  userId: string
  firstName?: string
  lastName?: string
  telephone?: string
}

type UpdateUserServiceResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    telephone,
    userId,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.update({
      firstName,
      lastName,
      telephone,
    })

    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}

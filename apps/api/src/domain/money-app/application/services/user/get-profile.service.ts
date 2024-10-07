import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface GetProfileServiceRequest {
  userId: string
}

type GetProfileServiceResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileServiceRequest): Promise<GetProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user,
    })
  }
}

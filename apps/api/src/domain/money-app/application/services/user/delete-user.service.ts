/* eslint-disable drizzle/enforce-delete-with-where */
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface DeleteUserServiceRequest {
  userId: string
}

type DeleteUserServiceResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class DeleteQuestionService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(userId)

    return right({
      user,
    })
  }
}

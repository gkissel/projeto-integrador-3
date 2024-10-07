/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable drizzle/enforce-delete-with-where */
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface DeleteUserServiceRequest {
  userId: string
}

type DeleteUserServiceResponse = Either<ResourceNotFoundError, {}>

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(userId)

    return right({})
  }
}

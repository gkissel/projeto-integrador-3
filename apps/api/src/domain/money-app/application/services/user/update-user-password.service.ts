import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { HashComparer } from '../../cryptography/hash-comparer'
import { HashGenerator } from '../../cryptography/hash-generator'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

export interface UpdateUserPasswordServiceRequest {
  userId: string
  oldPassword: string
  newPassword: string
}

type UpdateUserPasswordServiceResponse = Either<
  ResourceNotFoundError | WrongCredentialsError,
  {
    user: User
  }
>

export class UpdateUserPasswordService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    userId,
    oldPassword,
    newPassword,
  }: UpdateUserPasswordServiceRequest): Promise<UpdateUserPasswordServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const passwordMatches = await this.hashComparer.compare(
      oldPassword,
      user.password,
    )

    if (!passwordMatches) {
      return left(new WrongCredentialsError())
    }

    const hashedPassword = await this.hashGenerator.hash(newPassword)

    user.changePassword(hashedPassword)

    await this.usersRepository.update(user)

    return right({
      user,
    })
  }
}

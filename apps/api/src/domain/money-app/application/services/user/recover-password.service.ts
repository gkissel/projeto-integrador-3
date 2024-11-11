import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { HashGenerator } from '../../cryptography/hash-generator'
import { UsersRepository } from '../../repositories/abstract/users.repository'

export interface RecoverPasswordServiceRequest {
  email: string
}

type RecoverPasswordServiceResponse = Either<
  ResourceNotFoundError,
  {
    recoverCode: string
  }
>

export class RecoverPasswordService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
  }: RecoverPasswordServiceRequest): Promise<RecoverPasswordServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const recoverCode = crypto.randomUUID().substring(0, 8)

    const hashedPassword = await this.hashGenerator.hash(recoverCode)

    user.changePassword(hashedPassword)

    await this.usersRepository.update(user)

    return right({
      recoverCode,
    })
  }
}

import { Either, left, right } from '@/core/either'

import { HashComparer } from '../../cryptography/hash-comparer'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

interface AuthenticateUserServiceRequest {
  email: string
  password: string
}

type AuthenticateUserServiceResponse = Either<
  WrongCredentialsError,
  {
    userId: string
  }
>

export class AuthenticateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    return right({
      userId: user.id.toString(),
    })
  }
}

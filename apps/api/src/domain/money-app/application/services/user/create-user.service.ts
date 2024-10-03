import { Either, left, right } from '@/core/either'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { HashGenerator } from '../../cryptography/hash-generator'
import { UsersRepository } from '../../repositories/abstract/users.repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

export interface CreateUserServiceRequest {
  firstName: string
  lastName: string
  email: string
  birthdate: Date
  password: string
  telephone: string
}

type CreateUserServiceResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateQuestionService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    birthdate,
    email,
    firstName,
    lastName,
    password,
    telephone,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError('email', email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      firstName,
      lastName,
      email,
      birthdate,
      password: hashedPassword,
      telephone,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}

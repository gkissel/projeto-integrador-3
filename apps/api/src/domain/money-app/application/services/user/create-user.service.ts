import { Either, left, right } from '@/core/either'
import { Slug } from '@/core/entities/slug'
import { Member } from '@/domain/money-app/enterprise/entities/member'
import Organization from '@/domain/money-app/enterprise/entities/organization'
import { User } from '@/domain/money-app/enterprise/entities/user'

import { HashGenerator } from '../../cryptography/hash-generator'
import MembersRepository from '../../repositories/abstract/members.repository'
import OrganizationsRepository from '../../repositories/abstract/organizations.repository'
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

export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
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

    const orgSlug =
      email.split('@')[0] + '.' + email.split('@')[1].split('.')[0]

    // console.log(orgSlug)

    const organization = Organization.create({
      name: `Organiazção de ${firstName} ${lastName}`,
      ownerId: user.id,
      slug: Slug.createFromText(orgSlug),
    })

    await this.organizationsRepository.create(organization)

    const member = Member.create({
      orgId: organization.id,
      userId: user.id,
      role: 'OWNER',
    })

    await this.membersRepository.create(member)

    return right({
      user,
    })
  }
}

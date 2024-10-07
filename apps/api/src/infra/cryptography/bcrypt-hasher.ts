import bcrypt from 'bcryptjs'

import { HashComparer } from '@/domain/money-app/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/money-app/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.HASH_SALT_LENGTH)
  }

  // eslint-disable-next-line class-methods-use-this, no-shadow
  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
  }
}

import { ServiceError } from '@/core/errors/service-error'

type uniqueOrganizationFields = 'slug'

export class OrganizationAlreadyExistsError
  extends Error
  implements ServiceError
{
  constructor(identifier: uniqueOrganizationFields, value: string) {
    super(`Organização ${identifier}: "${value}" já existe.`)
  }
}

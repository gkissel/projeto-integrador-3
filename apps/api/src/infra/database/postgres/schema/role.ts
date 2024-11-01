import { pgEnum } from 'drizzle-orm/pg-core'

export const roles = pgEnum('roles', ['ADMIN', 'MEMBER', 'OWNER'])

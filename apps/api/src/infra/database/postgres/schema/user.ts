import { randomUUID } from 'crypto'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  birthdate: timestamp('birthdate').notNull(),

  telephone: text('telephone').notNull().unique(),
  username: text('username').notNull().unique(),

  email: text('email').notNull().unique(),
  password: text('password').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

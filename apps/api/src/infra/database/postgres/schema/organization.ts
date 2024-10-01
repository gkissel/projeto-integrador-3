import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './user'

export const organizations = pgTable('organizations', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),

  ownerId: text('manager_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const organizationsRelations = relations(organizations, ({ one }) => ({
  owner: one(users, {
    fields: [organizations.ownerId],
    references: [users.id],
    relationName: 'organizationOwner',
  }),
}))

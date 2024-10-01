import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { organizations } from './organization'
import { roles } from './role'
import { users } from './user'

export const members = pgTable('members', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  role: roles('role').notNull(),

  orgId: text('organization_id')
    .references(() => organizations.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const membersRelations = relations(members, ({ one }) => ({
  participates: one(organizations, {
    fields: [members.orgId],
    references: [organizations.id],
    relationName: 'OrganizationMember',
  }),
  profile: one(users, {
    fields: [members.userId],
    references: [users.id],
    relationName: 'UserMember',
  }),
}))

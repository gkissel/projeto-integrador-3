import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { organizations } from './organization'
import { roles } from './role'
import { users } from './user'

export const invites = pgTable('invites', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),

  email: text('email').notNull(),

  role: roles('role').notNull(),

  orgId: text('organization_id')
    .references(() => organizations.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  authorId: text('author_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
})

export const invitesRelations = relations(invites, ({ one }) => ({
  owner: one(organizations, {
    fields: [invites.orgId],
    references: [organizations.id],
    relationName: 'OrganizationInvite',
  }),

  author: one(users, {
    fields: [invites.authorId],
    references: [users.id],
    relationName: 'InviteAuthor',
  }),
}))

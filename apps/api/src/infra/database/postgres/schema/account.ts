import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { doublePrecision, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { organizations } from './organization'

export const account = pgTable('account', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image_url').notNull(),

  maxValue: doublePrecision('max_value').notNull(),
  actualValue: doublePrecision('actual_value').notNull(),

  orgId: text('organization_id')
    .references(() => organizations.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const accountRelations = relations(account, ({ one }) => ({
  organization: one(organizations, {
    fields: [account.orgId],
    references: [organizations.id],
    relationName: 'OrganizationBudget',
  }),
}))

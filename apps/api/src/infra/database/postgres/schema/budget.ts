import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import { doublePrecision, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { organizations } from './organization'

export const budgets = pgTable('budgets', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  iconName: text('icon_name').notNull(),

  value: doublePrecision('value').notNull(),

  orgId: text('organization_id')
    .references(() => organizations.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const budgetsRelations = relations(budgets, ({ one }) => ({
  organization: one(organizations, {
    fields: [budgets.orgId],
    references: [organizations.id],
    relationName: 'OrganizationBudget',
  }),
}))

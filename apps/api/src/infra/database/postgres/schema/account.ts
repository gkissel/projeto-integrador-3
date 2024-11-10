import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import {
  customType,
  doublePrecision,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

import { organizations } from './organization'

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea'
  },
})

export const account = pgTable('account', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  imageBlob: bytea('image_binary'), // Changed to bytea for binary data

  value: doublePrecision('value').notNull(),

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

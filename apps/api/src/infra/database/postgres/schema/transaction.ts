import { randomUUID } from 'crypto'
import { relations } from 'drizzle-orm'
import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

import { account } from './account'
import { organizations } from './organization'

export const transactionTypes = pgEnum('transaction_types', [
  'INCOME',
  'OUTCOME',
])

export const transactions = pgTable('transactions', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),

  description: text('description').notNull(),

  value: doublePrecision('value').notNull(),

  type: transactionTypes('type').notNull(),

  accountId: text('account_id')
    .references(() => account.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  orgId: text('organization_id')
    .references(() => organizations.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  organization: one(organizations, {
    fields: [transactions.orgId],
    references: [organizations.id],
    relationName: 'OrganizationTransaction',
  }),
  account: one(account, {
    fields: [transactions.accountId],
    references: [account.id],
    relationName: 'AccountTransaction',
  }),
}))

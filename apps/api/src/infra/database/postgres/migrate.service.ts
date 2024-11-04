/* eslint-disable no-console */
import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { env } from '@/infra/env'

const connection = postgres(env.DATABASE_URL, { max: 1 })
const db = drizzle(connection)

migrate(db, { migrationsFolder: 'drizzle' }).then(() => {
  console.log(chalk.greenBright('Migrations applied successfully!'))
  connection.end().then(() => {
    process.exit()
  })
})

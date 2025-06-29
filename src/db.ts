import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'
import { Pool } from 'pg'
import 'dotenv/config'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL
  })
})
export const db = new Kysely<DB>({dialect});

export async function closeDb() {
    await db.destroy()
}

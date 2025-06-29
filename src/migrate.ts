import { Migrator, FileMigrationProvider } from 'kysely'
import { db } from './db'
import * as path from 'path'
import * as fs from 'fs/promises'

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations')
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`✅ Migration ${it.migrationName} executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`❌ Migration ${it.migrationName} failed`)
    }
  })

  if (error) {
    console.error('❌ Migration failed')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()

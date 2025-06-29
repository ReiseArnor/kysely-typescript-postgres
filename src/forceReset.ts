import { db } from './db'
import * as path from 'path'
import * as fs from 'fs/promises'

async function forceResetMigrations() {
  const migrationsFolder = path.join(__dirname, '../migrations')
  const files = await fs.readdir(migrationsFolder)

  const migrationFiles = files
    .filter(file => file.endsWith('.ts'))
    .sort()

  for (const file of migrationFiles) {
    const migrationPath = path.join(migrationsFolder, file)
    const migration = await import(migrationPath)

    console.log(`⚡ Running DOWN for ${file}`)
    if (typeof migration.down === 'function') {
      await migration.down(db)
    } else {
      console.log(`⚠ Skipping DOWN for ${file} — no down function`)
    }
  }

  for (const file of migrationFiles) {
    const migrationPath = path.join(migrationsFolder, file)
    const migration = await import(migrationPath)

    console.log(`⚡ Running UP for ${file}`)
    if (typeof migration.up === 'function') {
      await migration.up(db)
    } else {
      console.log(`⚠ Skipping UP for ${file} — no up function`)
    }
  }

  await db.destroy()
  console.log('✅ Force reset complete')
}

forceResetMigrations().catch(err => {
  console.error('❌ Force reset failed')
  console.error(err)
  process.exit(1)
})

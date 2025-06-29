import { Kysely, sql } from 'kysely'
import { DB } from '../src/types'

export async function up(db: Kysely<DB>): Promise<void> {
    await db.schema.createType('gender_enum').asEnum(['woman', 'man']).execute()

    await db.schema
        .createTable('person')
        .addColumn('id', 'integer', col => col.primaryKey().generatedAlwaysAsIdentity())
        .addColumn('first_name', 'text', col => col.notNull())
        .addColumn('last_name', 'text')
        .addColumn('gender', sql`gender_enum`, col => col.notNull())
        .addColumn('age', 'integer', col => col.notNull())
        .addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`now()`))
        .execute()

    await db.schema
        .createTable('pet')
        .addColumn('id', 'integer', col => col.primaryKey().generatedAlwaysAsIdentity())
        .addColumn('name', 'text', col => col.notNull())
        .addColumn('owner_id', 'integer', col => col.references('person.id').onDelete('cascade').notNull())
        .addColumn('species', 'text', col => col.notNull())
        .execute()
}

export async function down(db: Kysely<DB>): Promise<void> {
    await db.schema.dropTable('pet').execute()
    await db.schema.dropTable('person').execute()
}

import { db } from './db'
import { Person } from './types'
import { Insertable } from 'kysely'

async function main() {
    let person = { first_name: 'Bob', age: 29, gender: 'man' }

    const insert = async (person: Insertable<Person>) => {
        await db.insertInto('person').values(person).execute()
    }

    await insert(person);
    person = { first_name: 'Ann', age: 25, gender: 'woman' }
    await insert(person);

    const people = await db.selectFrom('person').selectAll().execute()
    console.log(people)
}

main().catch(console.error)

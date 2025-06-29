import { Request, Response } from 'express'
import { db } from '../db'

export async function getPeople(req: Request, res: Response) {
    try {
        const people = await db
            .selectFrom('person')
            .select(['id', 'first_name', 'last_name', 'age', 'gender'])
            .execute()
        res.json({ data: people })
    } catch (err) {
        console.error(err)
        res.status(500).json({ data: null, error: 'Failed to fetch people' })
    }
}

export async function createPerson(req: Request, res: Response): Promise<any> {
    const { first_name, last_name, gender, age } = req.body
    if (!first_name || !gender || age == null) {
        return res.status(400).json({ created: false, error: 'Missing required fields' })
    }

    try {
        await db
            .insertInto('person')
            .values({ first_name, last_name, gender, age })
            .returningAll()
            .executeTakeFirst()

        res.status(201).json({ created: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ created: false, error: 'Failed to insert person' })
    }
}

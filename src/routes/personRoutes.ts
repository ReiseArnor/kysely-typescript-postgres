import { Router } from 'express'
import { getPeople, createPerson } from '../controllers/personController'

export const personRoutes = Router()

personRoutes.get('/', getPeople)
personRoutes.post('/', createPerson)

import { Router } from 'express'
import { personRoutes } from './personRoutes'

const router = Router()

router.use('/people', personRoutes)
// router.use('/pets', petRoutes)

export default router

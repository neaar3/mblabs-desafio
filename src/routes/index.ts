import { Router } from 'express'
import authRouter from './authRoutes'
import eventRouter from './eventRoutes'
import ticketRouter from './ticketRoutes'
import userRouter from './userRoutes'

const router = Router()

router.use('/', userRouter)
router.use('/', authRouter)
router.use('/', eventRouter)
router.use('/', ticketRouter)

export default router
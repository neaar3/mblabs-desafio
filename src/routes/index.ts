import { Router } from 'express'
import authRouter from './authRoutes'
import eventRouter from './eventRoutes'
import userRouter from './userRoutes'

const router = Router()

router.use('/', userRouter)
router.use('/', authRouter)
router.use('/', eventRouter)

export default router
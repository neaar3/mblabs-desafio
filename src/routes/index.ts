import { Router } from 'express'
import authRouter from './authRoutes'
import userRouter from './userRoutes'

const router = Router()

router.use('/', userRouter)
router.use('/', authRouter)

export default router
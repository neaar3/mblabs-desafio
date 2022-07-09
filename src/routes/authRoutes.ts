import { Router } from 'express'
import * as authController from '../controllers/authController'
import { validateBody } from '../middlewares/schemaValidation'
import { authSchema } from '../schemas/authSchema'

const authRouter = Router()

authRouter.post('/sign-in', validateBody(authSchema), authController.signIn)

export default authRouter
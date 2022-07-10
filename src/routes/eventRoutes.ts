import { Router } from 'express'
import * as eventController from '../controllers/eventController'
import { validateBody } from '../middlewares/schemaValidation'
import { createEventSchema } from '../schemas/eventSchema'

const eventRouter = Router()

eventRouter.post('/events', 
    validateBody(createEventSchema), 
    eventController.createEvent
)

export default eventRouter
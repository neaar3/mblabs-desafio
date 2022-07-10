import { Router } from 'express'
import * as eventController from '../controllers/eventController'
import { validateBody, validateParams } from '../middlewares/schemaValidation'
import { createEventSchema, getEventSchema } from '../schemas/eventSchema'
import { authenticateToken } from "../middlewares/authentication";

const eventRouter = Router()

eventRouter.post('/events', 
    validateBody(createEventSchema), 
    authenticateToken,
    eventController.create
)

eventRouter.get('/events/user',
    authenticateToken, 
    eventController.userEvents
)

eventRouter.get('/events', 
    eventController.availableEvents
)

eventRouter.get('/events/:id',
    validateParams(getEventSchema),
    eventController.findOne
)

export default eventRouter
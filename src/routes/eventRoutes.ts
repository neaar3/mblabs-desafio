import { Router } from 'express'
import * as eventController from '../controllers/eventController'
import { validateBody, validateParams } from '../middlewares/schemaValidation'
import { newEventSchema, getEventSchema } from '../schemas/eventSchema'
import { authenticateToken } from "../middlewares/authentication";

const eventRouter = Router()

eventRouter.post('/events', 
    validateBody(newEventSchema), 
    authenticateToken,
    eventController.create
)

eventRouter.put('/events/:id', 
    validateBody(newEventSchema), 
    validateParams(getEventSchema),
    authenticateToken,
    eventController.update
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

eventRouter.delete('/events/:id',
    validateParams(getEventSchema),
    authenticateToken,
    eventController.remove
)

export default eventRouter
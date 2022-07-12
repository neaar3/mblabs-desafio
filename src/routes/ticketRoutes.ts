import { Router } from 'express'
import * as ticketController from '../controllers/ticketController'
import { validateBody, validateParams } from '../middlewares/schemaValidation'
import { authenticateToken } from "../middlewares/authentication";
import { createTicketSchema, getUserTicketSchema } from '../schemas/ticketSchema';

const ticketRouter = Router()

ticketRouter.post('/tickets', 
    validateBody(createTicketSchema), 
    authenticateToken, 
    ticketController.payment
)

ticketRouter.post('/success/:qty/:event_id', 
    validateParams(createTicketSchema), 
    authenticateToken, 
    ticketController.create
)

ticketRouter.get('/ticket', 
    validateBody(getUserTicketSchema), 
    authenticateToken, 
    ticketController.findOne
)

ticketRouter.get('/tickets/user', 
    authenticateToken, 
    ticketController.findAll
)

export default ticketRouter
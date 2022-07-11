import joi from 'joi'
import { TicketPartial } from '../services/ticketService.js'

export const createTicketSchema = joi.object<TicketPartial>({
	event_id: joi.number().required(),
    qty: joi.number().required(),
})

export const getUserTicketSchema = joi.object<{ code: string }>({
    code: joi.string().required()
})
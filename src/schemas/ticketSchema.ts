import joi from 'joi'
import { TicketPartial } from '../types/ticketTypes'

export const createTicketSchema = joi.object<TicketPartial>({
    qty: joi.number().required(),
	event_id: joi.number().required(),
})

export const getUserTicketSchema = joi.object<{ code: string }>({
    code: joi.string().required()
})
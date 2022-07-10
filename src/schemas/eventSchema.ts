import joi from 'joi'
import { EventParams } from '../types/eventTypes.js'

export const createEventSchema = joi.object<EventParams>({
	name: joi.string().required(),
    description: joi.string().required(),
    date: joi.date().required(),
    location: joi.string().required(),
    price: joi.number().required(),
    ticket_qty: joi.number().required(),
    image: joi.string().required(),
})

export const getEventSchema = joi.object<{ id: number }>({
    id: joi.number().required()
})

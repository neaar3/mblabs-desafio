import joi from 'joi'
import { EventParams } from '../types/eventTypes.js'

export const newEventSchema = joi.object<EventParams>({
	name: joi.string().required(),
    description: joi.string().required(),
    date: joi.date().required(),
    location: joi.string().required(),
    price: joi.number().required().greater(0),
    ticket_qty: joi.number().required().greater(0),
    image: joi.string().required(),
})

export const getEventSchema = joi.object<{ id: number }>({
    id: joi.number().required()
})

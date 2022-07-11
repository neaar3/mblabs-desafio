import { Request, Response } from 'express'
import httpStatus from 'http-status'
import * as eventService from '../services/eventService'


export async function create(req: Request, res: Response) {
    const { user } = res.locals
    const body = req.body

    const createdEvent = await eventService.create( { 
        user_id: user.userId,
        ...body 
    })

    return res.status(httpStatus.CREATED).json(createdEvent)
}

export async function userEvents(_req: Request, res: Response) {
    const { user } = res.locals

    const events = await eventService.findUserEvents(user.userId)

    return res.status(httpStatus.OK).json(events)
}

export async function availableEvents(_req: Request, res: Response) {
    const events = await eventService.findAvailableEvents()

    return res.status(httpStatus.OK).json(events)
}

export async function findOne(req: Request, res: Response) {
    const { id } = req.params

    const event = await eventService.findById(parseInt(id))

    return res.status(httpStatus.OK).json(event)
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params

    await eventService.remove(parseInt(id))

    return res.sendStatus(httpStatus.OK)
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const body = req.body

    const updatedEvent = await eventService.update(parseInt(id), body)

    return res.status(httpStatus.ACCEPTED).json(updatedEvent)
}



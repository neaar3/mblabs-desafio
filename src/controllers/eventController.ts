import { Request, Response } from 'express'
import httpStatus from 'http-status'
import * as eventService from '../services/eventService'


export async function create(req: Request, res: Response) {
    const { user } = res.locals
    const body = req.body

    try {
        const createdUser = eventService.create( { 
            user_id: user.userId,
            ...body 
        })

        return res.status(httpStatus.CREATED).json(createdUser)

    } catch(err) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function userEvents(_req: Request, res: Response) {
    const { user } = res.locals

    const events = eventService.findUserEvents(user.userId)

    return res.status(httpStatus.OK).json(events)
}

export async function availableEvents(_req: Request, res: Response) {
    const events = eventService.findAvailableEvents()

    return res.status(httpStatus.OK).json(events)
}

export async function findOne(req: Request, res: Response) {
    const { id } = req.params

    const event = await eventService.findById(parseInt(id))

    return res.status(httpStatus.OK).json(event)
}



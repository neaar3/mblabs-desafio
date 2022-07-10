import { Request, Response } from 'express'
import httpStatus from 'http-status'
import * as eventService from '../services/eventService'


export async function createEvent(req: Request, res: Response) {
    const { user } = res.locals
    const body = req.body

    return eventService.create( { 
        user_id: user.userId,
        ...body 
    })
}

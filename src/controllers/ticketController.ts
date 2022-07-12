import { Request, Response } from "express";
import httpStatus from "http-status";
import * as ticketService from "../services/ticketService";

export async function payment(req: Request, res: Response) {
    const body = req.body;

    const ticket = await ticketService.payment(body);

    return res.status(httpStatus.OK).json({ 
        message: 'Use the link below to pay your ticket',
        url: ticket 
    });
}


export async function create(req: Request, res: Response) {
    const { user } = res.locals;
    const { qty, event_id } = req.params;


    const ticket = await ticketService.buy({
        qty: parseInt(qty),
        event_id: parseInt(event_id), 
        user_id: user.userId
    });

    return res.status(httpStatus.CREATED).json(ticket);
}



export async function findAll(_req: Request, res: Response) {
    const { user } = res.locals;
    const tickets = await ticketService.findAllUserTickets(user.userId);

    res.status(httpStatus.OK).send(tickets);
}

export async function findOne(req: Request, res: Response) {
    const { user } = res.locals;
    const { code } = req.body;

    const ticket = await ticketService.findUserTicket(code, user.userId);

    res.status(httpStatus.OK).json(ticket);
}
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as ticketService from "../services/ticketService";

export async function create(req: Request, res: Response) {
    const { user } = res.locals;
    const body = req.body;

    const ticket = await ticketService.buy({
        ...body,
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
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as userService from "../services/userService";
import { UserParams } from "../types/userTypes";

export async function findAll(_req: Request, res: Response) {
    const users = await userService.findAll();

    res.status(httpStatus.OK).send(users);
}

export async function findOne(req: Request, res: Response) {
    const params = req.params;
    const { user } = res.locals;

    const userFound = await userService.findById(params.id? parseInt(params.id) : user.userId);

    res.status(httpStatus.OK).json(userFound);
}

export async function create(req: Request, res: Response) {
    const body = req.body;

    const user = await userService.createUser(body); 

    return res.status(httpStatus.CREATED).json(user);
}

export async function update(req: Request, res: Response) {
    const { user } = res.locals;
    const body: Partial<UserParams> = req.body;

    await userService.update(user.userId, body);

    return res.sendStatus(httpStatus.OK);
}


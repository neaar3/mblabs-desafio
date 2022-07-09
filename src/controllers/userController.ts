import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function findAll(req: Request, res: Response) {}

export async function findOne(req: Request, res: Response) {}

export async function create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await userService.createUser({ name, email, password }); 

    res.status(201).json(user);
}

export async function update(req: Request, res: Response) {}

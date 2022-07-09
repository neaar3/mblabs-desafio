import { Request, Response } from 'express'
import httpStatus from 'http-status'
import * as authService from '../services/authService'

export async function signIn(req: Request, res: Response) {
	const auth = await authService.signIn(req.body)

	res.status(httpStatus.OK).send(auth)
}
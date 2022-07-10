import joi from 'joi'
import { UserParams } from '../types/userTypes.js'

export const createUserSchema = joi.object<UserParams>({
	name: joi.string().required(),
	password: joi.string().min(6).required(),
	email: joi.string().required()
})

export const updateUserBodySchema = joi.object<Partial<UserParams>>({
	name: joi.string(),
	password: joi.string().min(6),
	email: joi.string()
})

export const UserParamsSchema = joi.object<{ id: number }>({
	id: joi.number().required()
})
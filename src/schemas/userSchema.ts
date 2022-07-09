import joi from 'joi'
import { UserParams } from '../types/userTypes.js'

export const userSchema = joi.object<UserParams>({
	name: joi.string().required(),
	password: joi.string().min(6).required(),
	email: joi.string().required()
})
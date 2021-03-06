import * as userRepository from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserParams } from '../types/userTypes'
import Unauthorized from '../errors/Unauthorized'

export type UserLogin = Omit<UserParams, 'name'>

export async function signIn(user: UserLogin) {
	const { email, password } = user
    const EXPIRATION_ONE_DAY = 60 * 60 * 24

	const userFound = await userRepository.findByEmail(email);
	
	if (!userFound) 
		throw new Unauthorized('Incorrect email or password')

	if (!bcrypt.compareSync(password, userFound.password)) 
		throw new Unauthorized('Incorrect email or password')

	const data = { userId: userFound.id }
	const secret = process.env.JWT_SECRET

	const token = jwt.sign(data, secret, { expiresIn: EXPIRATION_ONE_DAY })

	return { token }
}
import { UserParams } from "../types/userTypes";
import * as userRepository from "../repositories/userRepository"
import bcrypt from "bcrypt"

export async function createUser(user: UserParams) {
    const { name, email, password } = user;

    const userFound = await userRepository.findByEmail(email);

    if (userFound) {
        throw new Error("User already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    return userRepository.create({ name, email, password: hashedPassword });
}
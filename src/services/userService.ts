import { UserParams } from "../types/userTypes";
import * as userRepository from "../repositories/userRepository"
import bcrypt from "bcrypt"
import NotFound from "../errors/NotFound";
import { User } from "@prisma/client";
import Forbidden from "../errors/Forbidden";
import InvalidData from "../errors/InvalidDataError";

export type PasswordlessUser = Omit<User, "password">;

export async function create(user: UserParams): Promise<PasswordlessUser> {
    const userFound = await userRepository.findByEmail(user.email);

    if (userFound) 
        throw new Forbidden("User already exists");

    const hashedPassword = bcrypt.hashSync(user.password, 10)

    const userCreated = await userRepository.create({ 
        name: user.name,
        email: user.email, 
        password: hashedPassword 
    });

    const { password, ...userWithoutPassword } = userCreated;

    return userWithoutPassword;
}

export async function update(id: number, user: Partial<UserParams>): Promise<PasswordlessUser> {
    const userFound = await userRepository.findById(id);

    if (!userFound) 
        throw new NotFound("User not found");

    let  hashedPassword = userFound.password;
    const bodyIsEmpty = Object.keys(user).length === 0;

    if (bodyIsEmpty) 
        throw new InvalidData("No data provided")

    if (user.password)
        hashedPassword = bcrypt.hashSync(user.password, 10)


    const updatedUser = await userRepository.update(id, {
        name: user.name ?? userFound.name,
        email: user.email ?? userFound.email,
        password: hashedPassword
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
}

export async function findById(id: number): Promise<PasswordlessUser> {
    const user = await userRepository.findById(id);

    if (!user) 
        throw new NotFound("User not found");

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
}

export async function findAll(): Promise<PasswordlessUser[]> {
    const users = await userRepository.findAll();

    const formattedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    });

    return formattedUsers;
}
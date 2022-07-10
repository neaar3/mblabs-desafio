
import { User } from "@prisma/client";
import { prisma } from "../config/database";
import { UserParams } from "../types/userTypes";

export async function create(user: UserParams): Promise<User> {
    return prisma.user.create({
        data: { ...user }
    });
}

export async function findAll(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function findByEmail(email: string): Promise<User> {
    return prisma.user.findFirst({
        where: { email }
    });
}

export async function findById(id: number): Promise<User>{
    return prisma.user.findUnique({
        where: { id }
    });
}

export async function update(
        userId: number, 
        user: Partial<UserParams>
    ): Promise<User>{
        
    return prisma.user.update({
        where: { id: userId },
        data: { ...user }
    });
}
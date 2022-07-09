
import { prisma } from "../config/database";
import { UserParams } from "../types/userTypes";

export async function create(user: UserParams){
    return prisma.user.create({
        data: { ...user }
    });
}

export async function findByEmail(email: string){
    return prisma.user.findFirst({
        where: { email }
    });
}

import { prisma } from "../config/database";
import { UserParams } from "../types/userTypes";

export async function create(user: UserParams){
    return prisma.user.create({
        data: { ...user }
    });
}

export async function findAll(){
    return prisma.user.findMany();
}

export async function findByEmail(email: string){
    return prisma.user.findFirst({
        where: { email }
    });
}

export async function findById(id: number){
    return prisma.user.findUnique({
        where: { id }
    });
}

export async function update(userId: number, user: Partial<UserParams>){
    return prisma.user.update({
        where: { id: userId },
        data: { ...user }
    });
}
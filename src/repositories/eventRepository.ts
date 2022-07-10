import { prisma } from "../config/database";
import { EventParams } from "../types/eventTypes";

export async function create(event: EventParams) {
    return prisma.event.create({
        data: { ...event }
    });
}

export async function findUserEvents(userId: number) {
    return prisma.event.findMany({
        where: { user_id: userId }
    });
}

export async function findByNameAndDate (name: string, date: Date) {
    return prisma.event.findMany({
        where: {
            name,
            date
        }
    });
}
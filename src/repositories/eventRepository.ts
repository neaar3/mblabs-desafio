import { Event } from "@prisma/client";
import { prisma } from "../config/database";
import { EventParams } from "../types/eventTypes";

export async function create(event: EventParams): Promise<Event> {
    return prisma.event.create({
        data: { ...event }
    });
}

export async function findUserEvents(userId: number): Promise<Event[]>  {
    return prisma.event.findMany({
        where: { 
            user_id: userId,
        }
    });
}

export async function findByNameAndDate (name: string, date: Date): Promise<Event>  {
    return prisma.event.findFirst({
        where: {
            name,
            date
        }
    });
}

export async function findById(id: number): Promise<Event> {
    return prisma.event.findUnique({
        where: { id },
        include: {
            User: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
}

export async function findAvailableEvents(): Promise<Event[]>  {
    let date = new Date();
    date.setDate(date.getDate() - 1);

    return prisma.event.findMany({
        where: {
            date: {
                gte: date
            },
            ticket_qty: {
                gte: 1
            }
        }
    });
}


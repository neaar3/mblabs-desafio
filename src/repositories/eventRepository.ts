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

export async function findById(id: number) {
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

export async function findAvailableEvents(today: Date): Promise<Event[]>  {
    return prisma.event.findMany({
        where: {
            date: {
                gte: today
            },
            ticket_qty: {
                gte: 1
            }
        }
    });
}

export async function destroy(id: number): Promise<void> {
    return prisma.$transaction(async (prisma) => {
        await prisma.ticket.deleteMany({
            where: {
                event_id: id
            }
        });
        await prisma.event.delete({
            where: { id }
        });
    });
}

export async function update(id: number, event: Omit<EventParams, "user_id">): Promise<Event> {
    return prisma.event.update({
        where: { id },
        data: { ...event }
    });
}



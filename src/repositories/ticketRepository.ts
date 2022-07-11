import { prisma } from "../config/database";
import { TicketCompact, TicketParams } from "../types/ticketTypes";

export async function findUserTicket(code: string, userId: number): Promise<TicketCompact> {
    return prisma.ticket.findFirst({
        where: { 
            code,
            user_id: userId
        },
        select: {
            code: true,
            Event: {
                select: {
                    name: true,
                    date: true,
                    location: true,
                }
            },
            User: {
                select: {
                    name: true,
                }
            }
        }
    });
}

export async function findAllUserTickets(userId: number): Promise<TicketCompact[]> {
    return prisma.ticket.findMany({
        where: {
            user_id: userId
        },
        select: {
            code: true,
            Event: {
                select: {
                    name: true,
                    date: true,
                    location: true,
                }
            },
            User: {
                select: {
                    name: true,
                }
            }
        }
    });
}

export async function buyTicket(ticket: TicketParams): Promise<TicketCompact> {

    return prisma.$transaction(async (prisma) => {
        await prisma.event.update({
            where: { id: ticket.event_id },
            data: { 
                ticket_qty: {
                    decrement: 1
                }
            }
        });
        return prisma.ticket.create({
            data: { 
                event_id: ticket.event_id,
                user_id: ticket.user_id,
                code: ticket.code 
            },
            select: {
                code: true,
                Event: {
                    select: {
                        name: true,
                        date: true,
                        location: true,
                    }
                },
                User: {
                    select: {
                        name: true,
                    }
                }
            }
        });
    });
}

export async function findEventTickets(eventId: number) {
    return prisma.ticket.findMany({
        where: {
            event_id: eventId
        },
        include: {
            User: true,
            Event: true
        }
    });
}
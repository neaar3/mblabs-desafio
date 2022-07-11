import { TicketCompact, TicketParams } from "../types/ticketTypes";
import { v4 as uuidv4 } from 'uuid';
import * as ticketRepository from '../repositories/ticketRepository';
import * as eventRepository from '../repositories/eventRepository';
import * as mailService from "../services/mailService";
import * as userRepository from "../repositories/userRepository"
import NotFound from "../errors/NotFound";
import InvalidData from "../errors/InvalidDataError";

export type TicketPartial = Omit<TicketParams, 'code'>;

export async function buy(ticket: TicketPartial): Promise<TicketCompact[]> {
    const codes: string[]= [];

    for(let i = 0; i < ticket.qty; i++) {
        codes.push(uuidv4());
    }

    const event = await eventRepository.findById(ticket.event_id);
    
    if (!event) 
        throw new NotFound('Event not found');

    if (event.ticket_qty < ticket.qty) 
        throw new InvalidData('Not enough tickets available');

    const tickets: TicketCompact[] = [] 

    for (let i = 0; i < codes.length; i++) {    
        tickets.push(
            await ticketRepository.buyTicket({
                ...ticket, 
                code: codes[i]
            })
        );
    }

    const user = await userRepository.findById(ticket.user_id);

    await mailService.sendMail({
        from: {
            name: "admin",
            email: "admin@admin.com"
        },
        to: {
            name: user.name,
            email: user.email,
        },
        subject: "Tickets purchased",
        text: `You have purchased ${ticket.qty} ${ticket.qty > 1 ? 'tickets': 'ticket'} for the event ${event.name}. \nHere are your tickets:\n   ${tickets.map(ticket => `${ticket.code}`).join('\n   ')}`
    });

    return tickets;
}

export async function findUserTicket(code: string, userId: number) {
    const ticket = await ticketRepository.findUserTicket(code, userId);

    if (!ticket) 
        throw new NotFound('Ticket not found');

    return ticket;
}

export async function findAllUserTickets(userId: number) {
    const tickets = await ticketRepository.findAllUserTickets(userId);

    if (!tickets) 
        throw new NotFound('User has no tickets');

    return tickets;
}
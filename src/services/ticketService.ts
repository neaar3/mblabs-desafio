import { TicketCompact, TicketPartial } from "../types/ticketTypes";
import * as ticketRepository from '../repositories/ticketRepository';
import * as eventRepository from '../repositories/eventRepository';
import * as mailService from "../services/mailService";
import * as userRepository from "../repositories/userRepository"
import * as paymentService from "../services/paymentService";
import { createCodes } from "../utils/index";
import NotFound from "../errors/NotFound";
import InvalidData from "../errors/InvalidDataError";


export async function payment(ticket: TicketPartial) {
    const event = await eventRepository.findById(ticket.event_id);

    if (!event) 
        throw new NotFound('Event not found');

    if (event.ticket_qty < ticket.qty) 
        throw new InvalidData('Not enough tickets available');

    if (event.date < new Date()) 
        throw new InvalidData('Event has already passed');

    return paymentService.createPaymentSession({
        name: event.name,
        price: event.price,
        qty: ticket.qty
    }, event.id);
}

export async function buy(ticket: TicketPartial) {
    const codes = await createCodes(ticket.qty);
    const event = await eventRepository.findById(ticket.event_id);

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
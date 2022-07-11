import { Event } from "@prisma/client";
import Forbidden from "../errors/Forbidden";
import NotFound from "../errors/NotFound";
import * as eventRepository from "../repositories/eventRepository";
import * as ticketRepository from "../repositories/ticketRepository";
import * as mailService from "../services/mailService";
import { EventCompact, EventParams } from "../types/eventTypes";

type EventPartial = Omit<Event, "user_id">;

export async function create(event: EventParams): Promise<Event> {
    const eventFound = await eventRepository.findByNameAndDate(event.name, event.date);

    if(eventFound)
        throw new Forbidden("Event already exists");

    return eventRepository.create(event);
}

export async function findUserEvents(userId: number): Promise<Event[]> {
    const events = await eventRepository.findUserEvents(userId);

    if(!events) 
        throw new NotFound("User has no events");

    return events;
}

export async function findAvailableEvents(): Promise<EventCompact[]> {
    let today = new Date();
    today.setHours(0,0,0,0);

    const events = await eventRepository.findAvailableEvents(today);

    if(!events) 
        throw new NotFound("No events available");

    const compactedEvents: EventCompact[] = events.map(event => {
        return {
            id: event.id,
            name: event.name,
            date: event.date,
            price: event.price,
            location: event.location,
            image: event.image
        };
    })

    return compactedEvents;
}

export async function findById(id: number): Promise<EventPartial> {
    const event = await eventRepository.findById(id);

    if(!event) 
        throw new NotFound("Event not found");

    const { user_id, ...eventWithoutUserId } = event;

    return eventWithoutUserId;
}

export async function remove(id: number): Promise<void> {
    const event = await eventRepository.findById(id);

    if(!event) 
        throw new NotFound("Event not found");

    const tickets = await ticketRepository.findEventTickets(id);

    if(tickets.length > 0) {
        for(let ticket of tickets) {
            await mailService.sendMail({
                from: {
                    name: "admin",
                    email: "admin@admin.com"
                },
                to: {
                    name: ticket.User.name,
                    email: ticket.User.email,
                },
                subject: "Event cancelled",
                text: `Your ticket for the event ${ticket.Event.name} has been cancelled. \n Feel free to contact ${event.User.email} for more information.`
            });
        }
    }
    
    await eventRepository.destroy(id);
}

export async function update(id: number, event: Omit<EventParams, "user_id">): Promise<Event> {
    const eventFound = await eventRepository.findById(id);

    if(!eventFound) 
        throw new NotFound("Event not found");

    const tickets = await ticketRepository.findEventTickets(id);

    if(tickets.length > 0) {
        for(let ticket of tickets) {
            await mailService.sendMail({
                from: {
                    name: "admin",
                    email: "admin@admin.com"
                },
                to: {
                    name: ticket.User.name,
                    email: ticket.User.email,
                },
                subject: "Event updated",
                text: `Your ticket for the event ${eventFound.name} has been updated.\nPlease verify your ticket using the code: ${ticket.code} at http://localhost:5000/ticket for more information.`
            });
        }
    } 

    return eventRepository.update(id, {
        name: event.name ?? eventFound.name,
        date: event.date ?? eventFound.date,
        price: event.price ?? eventFound.price,
        location: event.location ?? eventFound.location,
        image: event.image ?? eventFound.image,
        description: event.description ?? eventFound.description,
        ticket_qty: event.ticket_qty ?? eventFound.ticket_qty,
    });
}
import { Event } from "@prisma/client";
import InvalidData from "../errors/InvalidDataError";
import NotFound from "../errors/NotFound";
import * as eventRepository from "../repositories/eventRepository";
import { EventCompact, EventParams } from "../types/eventTypes";

export async function create(event: EventParams): Promise<Event> {
    const eventFound = await eventRepository.findByNameAndDate(event.name, event.date);

    if(eventFound) {
        throw new InvalidData("Event already exists");
    }

    return eventRepository.create(event);
}

export async function findUserEvents(userId: number): Promise<Event[]> {
    const events = await eventRepository.findUserEvents(userId);

    if(!events) {
        throw new NotFound("User has no events");
    }

    return events;
}

export async function findAvailableEvents(): Promise<EventCompact[]> {
    const events = await eventRepository.findAvailableEvents();

    if(!events) {
        throw new NotFound("No events available");
    }

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

export async function findById(id: number): Promise<Event> {
    const event = await eventRepository.findById(id);

    if(!event) {
        throw new NotFound("Event not found");
    }

    return event;
}
import InvalidData from "../errors/InvalidDataError";
import * as eventRepository from "../repositories/eventRepository";
import { EventParams } from "../types/eventTypes";

export async function create(event: EventParams) {
    const eventFound = await eventRepository.findByNameAndDate(event.name, event.date);

    if(eventFound) {
        throw new InvalidData("Event already exists");
    }

    return eventRepository.create(event);
}
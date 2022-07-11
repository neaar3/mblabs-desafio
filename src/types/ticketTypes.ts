export type TicketParams = {
    qty: number
    event_id: number
    user_id: number
    code: string
}

export type TicketCompact = Omit<TicketParams, 'event_id'|'user_id'|'qty'>;
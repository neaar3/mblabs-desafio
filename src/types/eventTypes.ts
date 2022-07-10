export type EventParams = {
    name: string,
    description: string,
    date: Date,
    location: string,
    price: number,
    ticket_qty: number,
    image: string,
    user_id: number,
}

export type EventCompact = {
    id: number,
    name: string,
    date: Date,
    location: string,
    price: number,
    image: string
}
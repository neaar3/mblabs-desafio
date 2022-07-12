import { v4 as uuidv4 } from 'uuid';

export async function createCodes(qty: number) {
    const codes: string[]= [];

    for(let i = 0; i < qty; i++) {
        codes.push(uuidv4());
    }
    
    return codes;
}
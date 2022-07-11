type Address = {
    email: string;
    name: string;
}

export type MailParams = {
    to: Address;
    from: Address;
    subject: string;
    text: string;
}
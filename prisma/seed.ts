import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const users = await prisma.user.findMany();

    if(users.length === 0) {
        await prisma.user.createMany({
            data: [
                {
                    name: "John Doe",
                    email: "john@doe",
                    password: "$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm" // plaintext password: nooneknows
                },
                {
                    name: "Jane Doe",
                    email: "jane@doe",
                    password: "$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm" // plaintext password: nooneknows
                }
        ]
        });
    }

    const events = await prisma.event.findMany();

    if(events.length === 0) {
        await prisma.event.createMany({
            data: [
                {
                    name: "Event 1",
                    date: new Date(),
                    description: "Event 1 description",
                    location: "Event 1 location",
                    price: 1000,
                    ticket_qty: 50,
                    image: "Event 1 image",
                    user_id: 1,            
                },
                {
                    name: "Event 2",
                    date: new Date(),
                    description: "Event 2 description",
                    location: "Event 2 location",
                    price: 2000,
                    ticket_qty: 100,
                    image: "Event 2 image",
                    user_id: 1,
                },
                {
                    name: "Event 3",
                    date: new Date(),
                    description: "Event 3 description",
                    location: "Event 3 location",
                    price: 3000,
                    ticket_qty: 150,
                    image: "Event 3 image",
                    user_id: 1,
                },
                {
                    name: "Event 4",
                    date: new Date(),
                    description: "Event 4 description",
                    location: "Event 4 location",
                    price: 4000,
                    ticket_qty: 200,
                    image: "Event 4 image",
                    user_id: 2,
                },
                {
                    name: "Event 5",
                    date: new Date(),
                    description: "Event 5 description",
                    location: "Event 5 location",
                    price: 5000,
                    ticket_qty: 250,
                    image: "Event 5 image",
                    user_id: 2,
                }
        ]
        });
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

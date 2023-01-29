import { prisma } from "@/config";

async function findAllTickets() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findAllTickets
};

export default ticketsRepository;


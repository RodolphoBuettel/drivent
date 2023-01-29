import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { createAnewTicket, findTicket, findTicketTypes } from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function  getAllTicketTypes() {
  return await findTicketTypes();
}

async function getTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await findTicket(enrollment);

  if(!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function insertTicket(body: { ticketTypeId: number }, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
 
  if (!body.ticketTypeId || !enrollment) {
    throw { name: "NotFoundError" };
  }

  const newTicket = { 
    ...body, status: "RESERVED", enrollmentId: enrollment.id
  } as 
     {
      status: TicketStatus, ticketTypeId: number, enrollmentId: number
    };
  return await createAnewTicket(newTicket);
}

const ticketServices = { getAllTicketTypes, getTicket, insertTicket };

export default ticketServices;

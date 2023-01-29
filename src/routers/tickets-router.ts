import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicket, getAllTicketTypes, postTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", getTicket)
  .post("/", postTicket);

export { ticketsRouter };

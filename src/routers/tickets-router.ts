import { Router } from "express";
import { authenticateToken } from "@/middlewares";
const ticketsRouter = Router();

ticketsRouter
  .get("/tickets/types", authenticateToken);

export { ticketsRouter };

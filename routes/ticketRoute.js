import express from "express";
import TicketController from "./../controller/ticketController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/:userId", authUser, TicketController.addTicket);
router.get("/", TicketController.getTicket);
router.put("/:id", TicketController.updateTicket);
router.delete("/:id", TicketController.deleteTicket);


export default router
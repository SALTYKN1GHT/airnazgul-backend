import express from 'express';
import { ticketController } from '../controllers/ticket.controller.js';

const ticketRouter = express.Router();

ticketRouter.get('/', ticketController.getTickets);
ticketRouter.get('/:id', ticketController.getTicketById);
ticketRouter.post('/create', ticketController.createTicket);
ticketRouter.put('/update/:id', ticketController.updateTicket);
ticketRouter.delete('/delete/:id', ticketController.deleteTicket);

export default ticketRouter;
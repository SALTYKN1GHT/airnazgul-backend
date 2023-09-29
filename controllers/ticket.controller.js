import { ticketService } from '../services/ticket.service.js';

export const ticketController = {
    async getTickets(request, response, next)
    {
        try{
            const tickets = await ticketService.getTicketList();
            return response.status(200).json(tickets);
        }
        catch(err)
        {
            next(err);
        }
    },

    async getTicketById(request, response, next)
    {
        const ticketId = request.params.id;
        try{
            const result = await ticketService.getTicketById(ticketId);
            return response.status(200).json(result);
        }
        catch(err)
        {
            next(err);
        }
    },

    async createTicket(request, response, next)
    {
        const ticket = request.body;
        try{
            const created = await ticketService.addTicket(ticket);
            return response.status(200).json(created);
        }
        catch(err)
        {
            next(err);
        }
    },

    async updateTicket(request, response, next)
    {
        const ticketId = request.params.id;
        const ticket = request.body;
        try{
            const updated = await ticketService.updateTicket(ticketId, ticket);
            return response.status(200).json(updated);
        }
        catch(err)
        {
            next(err);
        }
    },

    async deleteTicket(request, response, next)
    {
        const ticketId = request.params.id;
        try{
            const result = await ticketService.deleteTicket(ticketId);
            return response.status(200).json(result);
        }
        catch(err)
        {
            next(err);
        }
    },
};
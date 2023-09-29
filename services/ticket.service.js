import { ticketRepository } from '../repositories/ticket.repository.js';

export const ticketService = {
    async addTicket(ticket) {
        if (!ticket.name || !ticket.description || !ticket.validity_start || !ticket.validity_end || !ticket.price || !ticket.available || !ticket.type) {
          throw new Error('Missing ticket details');
        }
        ticket.isActive = 1;
        return await ticketRepository.add(ticket);
    },

    async updateTicket(id, ticket) {
        if (!id || !ticket.name || !ticket.description || !ticket.validity_start || !ticket.validity_end || !ticket.price || !ticket.available || !ticket.type) {
          throw new Error('Missing ticket details');
        }
        return await ticketRepository.update(id, ticket);
      },
    
      async getTicketById(id) {
        if (!id) {
          throw new Error('Missing ticket ID');
        }
        return await ticketRepository.getById(id);
      },
    
      async getTicketList() {
        return await ticketRepository.getList();
      },
    
      async deleteTicket(id) {
        if (!id) {
          throw new Error('Missing ticket ID');
        }
        return await ticketRepository.delete(id);
      },
}
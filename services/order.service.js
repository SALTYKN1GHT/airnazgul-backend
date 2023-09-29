import { orderRepository } from '../repositories/order.repository.js';
import { ticketRepository } from '../repositories/ticket.repository.js';


export const orderService = {
    async addOrder(order) {
        if (!order.ticketId || !order.userId || !order.amount) {
          throw new Error('Missing order details');
        }
        return await orderRepository.add(order);
    },

    async updateOrder(id, order) {
        if (!id || !order.amount) {
          throw new Error('Missing order details');
        }
        const ticket = await ticketRepository.getById(order.ticketId);
        if (order.amount > ticket.available) {
            throw new Error('Not enough tickets to purchase');
          }
        return await orderRepository.update(id, order);
      },
    
      async getOrderById(id) {
        if (!id) {
          throw new Error('Missing order ID');
        }
        return await orderRepository.getById(id);
      },

      async getOrderDetailsById(id) {
        if (!id) {
          throw new Error('Missing order ID');
        }
        return await orderRepository.getOrderDetailsById(id);
      },
    
      async getOrderList() {
        return await orderRepository.getList();
      },

      async getDetailedOrderList() {
        return await orderRepository.getDetailedList();
      },
    
      async deleteOrder(id) {
        if (!id) {
          throw new Error('Missing order ID');
        }
        return await orderRepository.delete(id);
      },
}
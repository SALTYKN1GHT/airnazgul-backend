import { db } from '../connection/connection.js';

export const orderRepository = {
  async add(order) {
    const query = 'INSERT INTO orders (ticketId, userId, amount) VALUES (?, ?, ?)';
    const values = [order.ticketId, order.userId, order.amount];
    return await db.query(query, values);
  },

  async update(id, order) {
    const query = 'UPDATE orders JOIN ticket ON orders.ticketId = ticket.id SET orders.amount = ? WHERE orders.id = ? AND ? <= ticket.available';
    const values = [order.amount, id, order.amount];
    return await db.query(query, values);
  },

  async getById(id) {
    const query = 'SELECT * FROM orders WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },

  async getDetailsById(id) {
    const query = 'SELECT orders.*, user.userName, user.email, ticket.name AS ticket_name, ticket.validity_start, ticket.validity_end, ticket.price, ticket.type, ticket.created FROM orders JOIN user ON userId=user.id JOIN ticket ON ticketId=ticket.id WHERE orders.id = ?';
    const values = [id];
    return await db.query(query, values);
  },

  async getList() {
    const query = 'SELECT * FROM orders';
    return await db.query(query);
  },

  async getDetailedList() {
    const query = 'SELECT orders.*, user.userName, user.email, ticket.name AS ticket_name, ticket.validity_start, ticket.validity_end, ticket.price, ticket.type, ticket.created FROM orders JOIN user ON userId=user.id JOIN ticket ON ticketId=ticket.id';
    return db.query(query);
  },

  async delete(id) {
    const query = 'DELETE FROM orders WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },
};

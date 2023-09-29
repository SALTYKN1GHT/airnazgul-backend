import { db } from '../connection/connection.js';

export const ticketRepository = {
  async add(ticket) {
    const query = `INSERT INTO ticket (name, description, validity_start, validity_end, price, available, type, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [ticket.name, ticket.description, ticket.validity_start, ticket.validity_end, ticket.price, ticket.available, ticket.type, ticket.isActive];
    return await db.query(query, values);
  },

  async update(id, ticket) {
    const query = `UPDATE ticket SET name = ?, description = ?, validity_start = ?, validity_end = ?, price = ?, available = ?, type = ?, isActive = ? WHERE id = ?`;
    const values = [ticket.name, ticket.description, ticket.validity_start, ticket.validity_end, ticket.price, ticket.available, ticket.type, ticket.isActive, id];
    return await db.query(query, values);
  },

  async getById(id) {
    const query = 'SELECT * FROM ticket WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },

  async getList() {
    const query = 'SELECT * FROM ticket';
    return await db.query(query);
  },

  async delete(id) {
    const query = 'DELETE FROM ticket WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },
};

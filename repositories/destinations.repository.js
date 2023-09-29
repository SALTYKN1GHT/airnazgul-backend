import { db } from '../connection/connection.js';

export const destinationsRepository = {
  async add(destinations) {
    const query = 'INSERT INTO destinations (realm, settlement) VALUES (?, ?)';
    const values = [destinations.realm, destinations.settlement];
    return await db.query(query, values);
  },

  async update(id, destinations) {
    const query = 'UPDATE destinations SET realm=?, settlement=? WHERE=? ';
    const values = [destinations.realm, destinations.settlement, id];
    return await db.query(query, values);
  },

  async getList() {
    const query = 'SELECT * FROM destinations';
    return await db.query(query);
  },

  async getByFilter(from, to) {
    const query = 'SELECT * FROM destinations WHERE settlement = ? OR settlement = ?';
    const values = [from, to];

    return await db.query(query, values);
  },

  async delete(id) {
    const query = 'DELETE FROM destinations WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },
};

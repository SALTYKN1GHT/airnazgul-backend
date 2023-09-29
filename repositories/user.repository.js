import { db } from '../connection/connection.js';

export const userRepository = {
  async add(user) {
    const query = 'INSERT INTO user (userName, email, password, isAdmin) VALUES (?, ?, ?, ?)';
    const values = [user.username, user.email, user.password, user.isAdmin];
    return await db.query(query, values);
  },

  async update(id, user) {
    const query = 'UPDATE user SET userName = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?';
    const values = [user.userName, user.email, user.password, user.isAdmin, id];
    return await db.query(query, values);
  },

  async getById(id) {
    const query = 'SELECT * FROM user WHERE id = ?';
    const values = [id];
    const result = await db.query(query, values);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  },
  async getByEmail(email) {
    const query = 'SELECT * FROM user WHERE email = ?';
    const values = [email];
    const result = await db.query(query, values);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  },

  async getList() {
    const query = 'SELECT * FROM user';
    return await db.query(query);
  },

  async delete(id) {
    const query = 'DELETE FROM user WHERE id = ?';
    const values = [id];
    return await db.query(query, values);
  },
};

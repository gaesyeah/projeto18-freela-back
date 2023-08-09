import { db } from '../database/database.js';

export const selectSessionByToken = (token) => {
  return db.query('SELECT * FROM sessions WHERE token = $1', [token]);
};

export const insertSessions = async (token, id) => {
  await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2);', [token, id]);

  return db.query(`
    SELECT users.name 
    FROM sessions 
      JOIN users
      ON users.id = sessions."userId"
    WHERE token = $1
  ;`, [token]);
}
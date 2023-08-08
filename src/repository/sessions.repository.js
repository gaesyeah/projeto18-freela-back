import { db } from '../database/database.js';

export const selectSessionByToken = (token) => {
  return db.query('SELECT * FROM sessions WHERE token = $1', [token]);
};

export const insertSessions = (token, id) => {
  return db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2);', [token, id]);
}
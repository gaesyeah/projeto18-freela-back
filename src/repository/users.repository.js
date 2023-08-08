import { db } from '../database/database.js';

export const insertUsers = (name, email, cellphone, cpf, password) => {
  return db.query('INSERT INTO users (name, email, cellphone, cpf, password) VALUES ($1, $2, $3, $4, $5);', [name, email, cellphone, cpf, password]);
};

export const selectUsersByEmail = (email) => {
  return db.query('SELECT id, password FROM users WHERE email = $1;', [email]);
};
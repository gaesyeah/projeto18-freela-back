import { db } from '../database/database.js';

export const insertUsers = (body, password) => {
  const { name, email, cellphone, cpf, imageUrl} = body;
  return db.query(`
    INSERT INTO users 
    (name, email, cellphone, cpf, "imageUrl", password) 
    VALUES ($1, $2, $3, $4, $5, $6)
    ;`, [name, email, cellphone, cpf, imageUrl ,password]
  );
};

export const selectUsersByEmail = (email) => {
  return db.query('SELECT id, password FROM users WHERE email = $1;', [email]);
};
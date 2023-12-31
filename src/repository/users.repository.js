import { db } from "../database/database.js";

const insertUsers = (body, password) => {
  const { name, email, cellphone, cpf, imageUrl } = body;
  return db.query(
    `
    INSERT INTO users 
    (name, email, cellphone, cpf, "imageUrl", password) 
    VALUES ($1, $2, $3, $4, $5, $6)
    ;`,
    [name, email, cellphone, cpf, imageUrl, password]
  );
};

const selectUsersByEmail = (email) => {
  return db.query(`SELECT id, password FROM users WHERE email = $1;`, [email]);
};

export const usersRepository = { insertUsers, selectUsersByEmail };

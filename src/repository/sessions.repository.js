import { db } from "../database/database.js";

const insertSession = (token, id) => {
  return db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2);', [
    token,
    id,
  ]);
};

const selectName = (token) => {
  return db.query(
    `
    SELECT users.name 
    FROM sessions 
      JOIN users
      ON users.id = sessions."userId"
    WHERE token = $1
  ;`,
    [token]
  );
};

const deleteSessionByToken = (token) => {
  return db.query("DELETE FROM sessions WHERE token = $1;", [token]);
};

const selectSessionByToken = (token) => {
  return db.query("SELECT * FROM sessions WHERE token = $1;", [token]);
};

export const sessionsRepository = {
  insertSession,
  selectName,
  deleteSessionByToken,
  selectSessionByToken,
};

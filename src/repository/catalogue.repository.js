import { db } from "../database/database.js";

export const insertBreeds = (name) => {
  return db.query('INSERT INTO breeds (name) VALUES ($1);', [name]);
}
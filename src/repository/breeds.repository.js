import { db } from "../database/database.js";

export const insertBreeds = (name) => {
  return db.query('INSERT INTO breeds (name) VALUES ($1);', [name]);
};

export const selectBreeds = () => {
  return db.query('SELECT breeds.id, breeds.name FROM breeds;');
};
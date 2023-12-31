import { db } from "../database/database.js";

const insertBreeds = (body) => {
  const { name, imageUrl } = body;
  return db.query('INSERT INTO breeds (name, "imageUrl") VALUES ($1, $2);', [
    name,
    imageUrl,
  ]);
};

const selectBreeds = () => {
  return db.query(
    'SELECT breeds.id, breeds.name, breeds."imageUrl" FROM breeds;'
  );
};

export const breedsRepository = { insertBreeds, selectBreeds };

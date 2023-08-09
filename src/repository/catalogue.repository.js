import { db } from "../database/database.js";

export const insertCatalogue = (body) => {
  const { title, description, breedId, userId, mainPhotoId, avaliable } = body;
  return db.query(`
    INSERT INTO catalogue (title, description, "breedId", "userId", "mainPhotoId", avaliable) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
    ;`, [title, description, breedId, userId, mainPhotoId, avaliable]
  );
};

export const insertPhotos = async (photos, catalogueId) => {
  photos.forEach(({ url }, i) => {
    if (i > 0) return db.query('INSERT INTO photos (url, "catalogueId") VALUES ($1, $2);', [url, catalogueId]);
  });
  const { rows } = await db.query('INSERT INTO photos (url, "catalogueId") VALUES ($1, $2) RETURNING id;', [photos[0].url, catalogueId]);

  db.query('UPDATE catalogue SET "mainPhotoId" = $1 WHERE id = $2;', [rows[0].id, catalogueId]);

  return;
};
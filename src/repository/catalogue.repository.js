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

export const selectCatalogueByBreedNoUser = async (breedId, token) => {
  return db.query(`
    SELECT 
      catalogue.id, catalogue.title, catalogue.description, catalogue.avaliable, 
      breeds.name AS "breedName",
      JSON_BUILD_OBJECT(
        'name', users.name,
        'cellphone', users.cellphone
      ) AS "userData"
    FROM breeds
      JOIN catalogue 
      ON catalogue."breedId" = breeds.id 
      JOIN users 
      ON catalogue."userId" = users.id
    WHERE 
      catalogue."userId" != (SELECT "userId" FROM sessions WHERE token = $1) 
        AND "breedId" = $2  
      OR $1 IS NULL 
        AND "breedId" = $2
    GROUP BY catalogue.id, breeds.id, users.id
  ;`, [token, breedId]);
}
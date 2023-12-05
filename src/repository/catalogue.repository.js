import { db } from "../database/database.js";

export const insertCatalogue = async (body, token) => {
  const { title, description, breedId, mainPhotoId, avaliable } = body;

  const { rows } = await db.query(
    'SELECT sessions."userId" FROM sessions WHERE token = $1;',
    [token]
  );

  return db.query(
    `
    INSERT INTO catalogue (title, description, "breedId", "userId", "mainPhotoId", avaliable) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
    ;`,
    [title, description, breedId, rows[0].userId, mainPhotoId, avaliable]
  );
};

export const insertPhotos = async (photos, catalogueId) => {
  photos.forEach(({ url }, i) => {
    if (i > 0)
      return db.query(
        'INSERT INTO photos (url, "catalogueId") VALUES ($1, $2);',
        [url, catalogueId]
      );
  });
  const { rows } = await db.query(
    'INSERT INTO photos (url, "catalogueId") VALUES ($1, $2) RETURNING id;',
    [photos[0].url, catalogueId]
  );

  db.query('UPDATE catalogue SET "mainPhotoId" = $1 WHERE id = $2;', [
    rows[0].id,
    catalogueId,
  ]);

  return;
};

export const selectCatalogueByBreedNoUser = (breedId, token) => {
  return db.query(
    `SELECT 
      catalogue.id, catalogue.title, catalogue.avaliable, 
      (SELECT photos.url FROM photos WHERE photos.id = catalogue."mainPhotoId") AS "imageUrl"
    FROM breeds
      JOIN catalogue 
      ON catalogue."breedId" = breeds.id 
    WHERE 
      (
        catalogue."userId" != (SELECT "userId" FROM sessions WHERE token = $1) 
        AND "breedId" = $2
      )
      OR 
      (
        $1 IS NULL 
        AND "breedId" = $2
      )
    GROUP BY catalogue.id, breeds.id
  ;`,
    [token, breedId]
  );
};

export const selectCatalogueByToken = (token) => {
  return db.query(
    `
    SELECT 
      breeds.id, breeds.name as "breedName",
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', catalogue.id,
        'title', catalogue.title,
        'avaliable', catalogue.avaliable,
        'imageUrl', (SELECT photos.url FROM photos WHERE photos.id = catalogue."mainPhotoId")
      )) AS models
    FROM breeds
      JOIN catalogue
      ON catalogue."breedId" = breeds.id
    WHERE catalogue."userId" = (SELECT "userId" FROM sessions WHERE token = $1)
    GROUP BY breeds.id
    ;`,
    [token]
  );
};

export const selectCatalogueById = (id) => {
  return db.query(
    `
    SELECT 
      catalogue.id, catalogue.title, catalogue.description, catalogue.avaliable, 
      breeds.name AS "breedName",
      (SELECT photos.url FROM photos WHERE photos.id = catalogue."mainPhotoId") AS "imageUrl",
      JSON_BUILD_OBJECT(
        'name', users.name,
        'cellphone', users.cellphone,
        'imageUrl', users."imageUrl"
      ) AS "userData"
    FROM breeds
      JOIN catalogue 
      ON catalogue."breedId" = breeds.id 
      JOIN users 
      ON catalogue."userId" = users.id
    WHERE catalogue.id = $1
  ;`,
    [id]
  );
};

export const updateCatalogueById = async (id, token) => {
  const { rowCount } = await db.query(
    `
    SELECT *
    FROM catalogue
    WHERE id = $1 AND catalogue."userId" = (SELECT "userId" FROM sessions WHERE token = $2)
  ;`,
    [id, token]
  );
  if (rowCount === 0) return { rowCount };

  return db.query(
    `
    UPDATE catalogue
    SET avaliable = 
      CASE
        WHEN avaliable = true THEN false
        ELSE true
      END
    WHERE catalogue.id = $1
  ;`,
    [id]
  );
};

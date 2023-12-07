import { db } from "../database/database.js";

export const insertCatalogue = async (body, token) => {
  const { title, description, breedId, avaliable } = body;

  const { rows } = await db.query(
    'SELECT sessions."userId" FROM sessions WHERE token = $1;',
    [token]
  );

  return db.query(
    `
    INSERT INTO catalogue (title, description, "breedId", "userId", avaliable, "mainPhotoId") 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
    ;`,
    [title, description, breedId, rows[0].userId, avaliable, null]
  );
};

export const insertPhotos = async (
  photos,
  catalogueId,
  mainPhotoPositionFromPhotosArray
) => {
  const values = photos
    .map((_, i) => `($${i + 1}, $${photos.length + 1})`)
    .join(", ");
  const { rows, rowCount } = await db.query(
    `INSERT INTO photos (url, "catalogueId") VALUES ${values} RETURNING id;`,
    [...photos.map(({ url }) => url), catalogueId]
  );

  const mainPhotoId = rows.some(
    (_, i) => i === mainPhotoPositionFromPhotosArray
  )
    ? rows[mainPhotoPositionFromPhotosArray].id
    : rows[0].id;
  const update = await db.query(
    'UPDATE catalogue SET "mainPhotoId" = $1 WHERE id = $2;',
    [mainPhotoId, catalogueId]
  );

  return { insert: { rows, rowCount }, update: { rowCount: update.rowCount } };
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
      catalogue.id, catalogue.title, catalogue.description, catalogue.avaliable, catalogue."mainPhotoId", 
      breeds.name AS "breedName",
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', photos.id,
        'url', photos.url
      )) AS photos,
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
      JOIN photos
      ON catalogue.id = photos."catalogueId"
    WHERE catalogue.id = $1
    GROUP BY breeds.id, catalogue.id, users.id
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

import { db } from "../database/database.js";

const insertPetModel = async (client, body, userId) => {
  const { title, description, breedId, avaliable } = body;
  const { rows } = await client.query(
    `
    INSERT INTO catalogue (title, description, "breedId", "userId", avaliable, "mainPhotoId") 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id
    ;`,
    [title, description, breedId, userId, avaliable, null]
  );
  return rows[0].id;
};
const insertPhotos = async (client, photos, catalogueId) => {
  const values = photos
    .map((_, i) => `($${i + 1}, $${photos.length + 1})`)
    .join(", ");
  const { rows } = await client.query(
    `INSERT INTO photos (url, "catalogueId") VALUES ${values} RETURNING id;`,
    [...photos.map(({ url }) => url), catalogueId]
  );
  return rows;
};
const updateMainPhoto = (
  client,
  mainPhotoPositionFromPhotosArray,
  insertedPhotos,
  catalogueId
) => {
  const mainPhotoId = insertedPhotos.some(
    (_, i) => i === mainPhotoPositionFromPhotosArray
  )
    ? insertedPhotos[mainPhotoPositionFromPhotosArray].id
    : insertedPhotos[0].id;
  return client.query(
    'UPDATE catalogue SET "mainPhotoId" = $1 WHERE id = $2;',
    [mainPhotoId, catalogueId]
  );
};
const insertCatalogue = async ({ client, body, userId }) => {
  //insert the petModel on the catalogue, returning the id
  const catalogueId = await insertPetModel(client, body, userId);

  //create the query and insert the photos related to the petModel
  const insertedPhotos = await insertPhotos(client, body.photos, catalogueId);

  //update the mainPhoto on the petModel based on the body sent by the user
  await updateMainPhoto(
    client,
    body.mainPhotoPositionFromPhotosArray,
    insertedPhotos,
    catalogueId
  );

  return;
};

const selectCatalogueByBreedExceptOnesFromTutor = (breedId, token) => {
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

const selectCatalogueByToken = (token) => {
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

const selectCatalogueById = (id) => {
  return db.query(
    `
    SELECT 
      catalogue.id, catalogue.title, catalogue.description, catalogue.avaliable, catalogue."mainPhotoId", 
      breeds.name AS "breedName",
      JSON_AGG(JSON_BUILD_OBJECT(
        'id', photos.id,
        'url', photos.url
      ) ORDER BY photos.id = catalogue."mainPhotoId" DESC ) AS photos,
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

const checkCatalogueById = (id, token) => {
  return db.query(
    `
    SELECT *
    FROM catalogue
    WHERE id = $1 AND catalogue."userId" = (SELECT "userId" FROM sessions WHERE token = $2)
  ;`,
    [id, token]
  );
};
const updateCatalogueById = (id) => {
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

export const catalogueRepository = {
  insertCatalogue,
  selectCatalogueByBreedExceptOnesFromTutor,
  selectCatalogueByToken,
  selectCatalogueById,
  checkCatalogueById,
  updateCatalogueById,
};

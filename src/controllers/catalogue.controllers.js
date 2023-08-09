import { insertCatalogue, insertPhotos, selectCatalogueByBreedNoUser, selectCatalogueById, updateCatalogueById } from "../repository/catalogue.repository.js";

export const postCatalogue = async (req, res) => {
  const { photos } = req.body;
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const { rows } = await insertCatalogue(req.body, authorization.replace('Bearer ', ''));

    await insertPhotos(photos, rows[0].id);

    res.sendStatus(201);
  } catch ({ code, detail }) {
    if (code === "23503") return res.status(404).send(detail);
    res.status(500).send(detail);
  }
};

export const getCatalogueByBreedNoUser = async (req, res) => {
  const { breedId } = req.params;
  const { token } = req.query;

  try {
    const { rows, rowCount } = await selectCatalogueByBreedNoUser(parseInt(breedId), token);

    if (rowCount === 0) res.sendStatus(404);

    res.send(rows);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
};

export const getCatalogueById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await selectCatalogueById(parseInt(id));

    if (rowCount === 0) res.sendStatus(404);

    res.send(rows[0]);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
};

export const putCatalogueById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const { rowCount } = await updateCatalogueById(id, authorization.replace('Bearer ', ''));
    if (rowCount === 0) return res.status(400).send('Model not found, or you do not have authorization to change it');

    res.sendStatus(204);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
}
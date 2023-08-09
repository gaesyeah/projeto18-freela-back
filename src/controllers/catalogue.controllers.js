import { insertCatalogue, insertPhotos, selectCatalogueByBreedNoUser, selectCatalogueById } from "../repository/catalogue.repository.js";

export const postCatalogue = async (req, res) => {
  const { photos } = req.body;
  try {
    const { rows } = await insertCatalogue(req.body);

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
    const { rows } = await selectCatalogueByBreedNoUser(parseInt(breedId), token);

    res.send(rows);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
};

export const getCatalogueById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await selectCatalogueById(parseInt(id));

    res.send(rows[0]);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
};
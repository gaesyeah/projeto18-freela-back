import { insertBreeds, insertCatalogue, insertPhotos } from "../repository/catalogue.repository.js";

export const postBreed = async (req, res) => {
  try {
    await insertBreeds(req.body.name);
    res.sendStatus(201);
  } catch ({ code, detail }) {
    if (code === "23505") return res.status(409).send(detail);
    res.status(500).send(detail);
  }
};

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
}
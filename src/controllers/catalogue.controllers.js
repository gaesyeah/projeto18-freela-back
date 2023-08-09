import { insertCatalogue, insertPhotos } from "../repository/catalogue.repository.js";

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
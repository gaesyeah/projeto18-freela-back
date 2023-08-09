import { insertBreeds } from "../repository/catalogue.repository.js";

export const postBreed = async (req, res) => {
  try {
    await insertBreeds(req.body.name);
    res.sendStatus(201);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
}
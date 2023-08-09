import { insertBreeds } from "../repository/breeds.repository.js";

export const postBreed = async (req, res) => {
  try {
    await insertBreeds(req.body.name);
    res.sendStatus(201);
  } catch ({ code, detail }) {
    if (code === "23505") return res.status(409).send(detail);
    res.status(500).send(detail);
  }
};
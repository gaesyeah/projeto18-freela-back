import { insertBreeds, selectBreeds } from "../repository/breeds.repository.js";

export const postBreed = async (req, res) => {
  try {
    await insertBreeds(req.body.name);
    res.sendStatus(201);
  } catch ({ code, detail }) {
    if (code === "23505") return res.status(409).send(detail);
    res.status(500).send(detail);
  }
};

export const getBreeds = async (req, res) => {
  try {
    const { rows } = await selectBreeds();
    res.send(rows);
  } catch ({ detail }) {
    res.status(500).send(detail);
  }
}
import { breedsService } from "../services/breeds.service.js";

export const postBreed = async (req, res) => {
  await breedsService.insertBreeds(req.body);
  res.sendStatus(201);
};

export const getBreeds = async (_req, res) => {
  const { rows } = await breedsService.selectBreeds();
  res.send(rows);
};

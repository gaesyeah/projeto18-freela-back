import httpStatus from "http-status";
import { breedsService } from "../services/breeds.service.js";

const postBreed = async (req, res) => {
  await breedsService.insertBreeds(req.body);
  res.sendStatus(httpStatus.CREATED);
};

const getBreeds = async (_req, res) => {
  const { rows } = await breedsService.selectBreeds();
  res.send(rows);
};

export const breedsController = { postBreed, getBreeds };

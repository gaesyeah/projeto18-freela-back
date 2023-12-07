import { breedsRepository } from "../repository/breeds.repository.js";

const insertBreeds = (body) => {
  return breedsRepository.insertBreeds(body);
};

const selectBreeds = () => {
  return breedsRepository.selectBreeds();
};

export const breedsService = { insertBreeds, selectBreeds };

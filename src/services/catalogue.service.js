import { error } from "../errors/errors.js";
import { catalogueRepository } from "../repository/catalogue.repository.js";
import { sessionsRepository } from "../repository/sessions.repository.js";
import { transactionHandler } from "../utils/functions/transactionHandler.js";

const postCatalogue = async (body, token) => {
  const { rows } = await sessionsRepository.selectNameAndToken(token);

  await transactionHandler(async (client) => {
    await catalogueRepository.insertCatalogue({
      client,
      body,
      userId: rows[0].userId,
    });
  });
};

const selectCatalogueByBreedExceptOnesFromTutor = async (breedId, token) => {
  const { rows, rowCount } =
    await catalogueRepository.selectCatalogueByBreedExceptOnesFromTutor(
      breedId,
      token
    );

  if (rowCount === 0) throw error.notFound();

  return { rows };
};

const selectCatalogueByToken = (token) => {
  return catalogueRepository.selectCatalogueByToken(token);
};

const selectCatalogueById = async (id) => {
  const { rows, rowCount } = await catalogueRepository.selectCatalogueById(id);
  if (rowCount === 0) throw error.notFound();
  return { rows };
};

export const updateCatalogueById = async (id, token) => {
  const { rowCount } = await catalogueRepository.checkCatalogueById(id, token);
  if (rowCount === 0)
    throw error.notFound(
      "Model not found, or you do not have authorization to change it"
    );

  return catalogueRepository.updateCatalogueById(id);
};

export const catalogueService = {
  postCatalogue,
  selectCatalogueByBreedExceptOnesFromTutor,
  selectCatalogueByToken,
  selectCatalogueById,
  updateCatalogueById,
};

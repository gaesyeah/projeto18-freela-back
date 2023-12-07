import httpStatus from "http-status";
import { catalogueService } from "../services/catalogue.service.js";

const postCatalogue = async (req, res) => {
  await catalogueService.postCatalogue(
    req.body,
    req.headers.authorization.replace("Bearer ", "")
  );
  res.sendStatus(httpStatus.CREATED);
};

const selectCatalogueByBreedExceptOnesFromTutor = async (req, res) => {
  const { breedId } = req.params;
  const { token } = req.query;
  const { rows } =
    await catalogueService.selectCatalogueByBreedExceptOnesFromTutor(
      parseInt(breedId),
      token?.replace("Bearer ", "")
    );

  res.send(rows);
};

const getCatalogueByToken = async (req, res) => {
  const { authorization } = req.headers;
  const { rows } = await catalogueService.selectCatalogueByToken(
    authorization.replace("Bearer ", "")
  );
  res.send(rows);
};

const getCatalogueById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await catalogueService.selectCatalogueById(parseInt(id));
  res.send(rows[0]);
};

const patchCatalogueById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  await catalogueService.updateCatalogueById(
    id,
    authorization.replace("Bearer ", "")
  );
  res.sendStatus(httpStatus.NO_CONTENT);
};

export const catalogueController = {
  postCatalogue,
  selectCatalogueByBreedExceptOnesFromTutor,
  getCatalogueById,
  getCatalogueByToken,
  patchCatalogueById,
};

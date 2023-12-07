import {
  selectCatalogueByBreedNoUser,
  selectCatalogueById,
  selectCatalogueByToken,
  updateCatalogueById,
} from "../repository/catalogue.repository.js";
import { catalogueService } from "../services/catalogue.service.js";

export const postCatalogue = async (req, res) => {
  try {
    await catalogueService.postCatalogue(
      req.body,
      req.headers.authorization.replace("Bearer ", "")
    );
    res.sendStatus(201);
  } catch ({ code, detail }) {
    if (code === "23503") return res.status(404).send({ message: detail });
    res.status(500).send({ message: detail });
  }
};

export const getCatalogueByBreedNoUser = async (req, res) => {
  const { breedId } = req.params;
  const { token } = req.query;
  try {
    const { rows, rowCount } = await selectCatalogueByBreedNoUser(
      parseInt(breedId),
      token
    );

    if (rowCount === 0) return res.sendStatus(404);

    res.send(rows);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

export const getCatalogueByToken = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const { rows } = await selectCatalogueByToken(
      authorization.replace("Bearer ", "")
    );
    res.send(rows);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

export const getCatalogueById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await selectCatalogueById(parseInt(id));

    if (rowCount === 0) res.sendStatus(404);

    res.send(rows[0]);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

export const patchCatalogueById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const { rowCount } = await updateCatalogueById(
      id,
      authorization.replace("Bearer ", "")
    );
    if (rowCount === 0)
      return res
        .status(400)
        .send("Model not found, or you do not have authorization to change it");

    res.sendStatus(204);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

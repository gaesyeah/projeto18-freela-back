import { Router } from "express";
import {
  getCatalogueByBreedNoUser,
  getCatalogueById,
  getCatalogueByToken,
  patchCatalogueById,
  postCatalogue,
} from "../controllers/catalogue.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { catalogueSchema } from "../schemas/catalogue.schemas.js";

const catalogueRouter = Router();

catalogueRouter.post(
  "/",
  userAuth,
  schemaValidation(catalogueSchema),
  postCatalogue
);
catalogueRouter.get("/mine/", userAuth, getCatalogueByToken);
catalogueRouter.get("/breed/:breedId", getCatalogueByBreedNoUser);
catalogueRouter.get("/unique/:id", getCatalogueById);
catalogueRouter.patch("/vacation/:id", userAuth, patchCatalogueById);

export default catalogueRouter;

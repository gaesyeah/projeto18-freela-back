import { Router } from "express";
import { catalogueController } from "../controllers/catalogue.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { catalogueSchema } from "../schemas/catalogue.schemas.js";

const catalogueRouter = Router();

catalogueRouter.post(
  "/",
  userAuth,
  schemaValidation(catalogueSchema),
  catalogueController.postCatalogue
);
catalogueRouter.get(
  "/mine/",
  userAuth,
  catalogueController.getCatalogueByToken
);
catalogueRouter.get(
  "/breed/:breedId",
  catalogueController.selectCatalogueByBreedExceptOnesFromTutor
);
catalogueRouter.get("/unique/:id", catalogueController.getCatalogueById);
catalogueRouter.patch(
  "/vacation/:id",
  userAuth,
  catalogueController.patchCatalogueById
);

export default catalogueRouter;

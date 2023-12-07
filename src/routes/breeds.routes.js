import { Router } from "express";
import { breedsController } from "../controllers/breeds.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { breedSchema } from "../schemas/breeds.schemas.js";

const breedRouter = Router();

breedRouter.post(
  "/",
  schemaValidation(breedSchema),
  breedsController.postBreed
);
breedRouter.get("/", breedsController.getBreeds);

export default breedRouter;

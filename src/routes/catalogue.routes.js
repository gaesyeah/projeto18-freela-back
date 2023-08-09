import { Router } from 'express';
import { postBreed } from '../controllers/catalogue.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { breedSchema } from '../schemas/catalogue.schemas.js';

const catalogueRouter = Router();

catalogueRouter.post('/postBreed', schemaValidation(breedSchema), postBreed);

export default catalogueRouter;

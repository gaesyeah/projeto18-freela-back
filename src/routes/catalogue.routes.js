import { Router } from 'express';
import { postBreed, postCatalogue } from '../controllers/catalogue.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { breedSchema, catalogueSchema } from '../schemas/catalogue.schemas.js';

const catalogueRouter = Router();

catalogueRouter.post('/postBreed', schemaValidation(breedSchema), postBreed);
catalogueRouter.post('/postCatalogue', userAuth ,schemaValidation(catalogueSchema), postCatalogue);

export default catalogueRouter;

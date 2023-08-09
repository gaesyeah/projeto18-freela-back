import { Router } from 'express';
import { getCatalogueByBreedNoUser, getCatalogueById, postCatalogue } from '../controllers/catalogue.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { catalogueSchema } from '../schemas/catalogue.schemas.js';

const catalogueRouter = Router();

catalogueRouter.post('/postCatalogue', userAuth ,schemaValidation(catalogueSchema), postCatalogue);
catalogueRouter.get('/getCatalogue/:breedId', getCatalogueByBreedNoUser);
catalogueRouter.get('/getCatalogue/unique/:id', getCatalogueById);

export default catalogueRouter;

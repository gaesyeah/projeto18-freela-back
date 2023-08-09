import { Router } from 'express';
import { getCatalogueByBreedNoUser, getCatalogueById, getCatalogueByToken, postCatalogue, putCatalogueById } from '../controllers/catalogue.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { catalogueSchema } from '../schemas/catalogue.schemas.js';

const catalogueRouter = Router();

catalogueRouter.post('/postCatalogue', userAuth ,schemaValidation(catalogueSchema), postCatalogue);
catalogueRouter.get('/getCatalogue/all/:breedId', getCatalogueByBreedNoUser);
catalogueRouter.get('/getCatalogue/mine', userAuth, getCatalogueByToken);
catalogueRouter.get('/getCatalogue/unique/:id', getCatalogueById);
catalogueRouter.put('/putCatalogueOnVacation/:id', userAuth, putCatalogueById);

export default catalogueRouter;

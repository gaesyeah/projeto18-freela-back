import { Router } from 'express';
import { postCatalogue } from '../controllers/catalogue.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { catalogueSchema } from '../schemas/catalogue.schemas.js';

const catalogueRouter = Router();

catalogueRouter.post('/postCatalogue', userAuth ,schemaValidation(catalogueSchema), postCatalogue);

export default catalogueRouter;

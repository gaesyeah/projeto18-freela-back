import { Router } from 'express';
import { getBreeds, postBreed } from '../controllers/breeds.controller.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { breedSchema } from '../schemas/breeds.schemas.js';

const breedRouter = Router();

breedRouter.post('/postBreed', schemaValidation(breedSchema), postBreed);
breedRouter.get('/getBreeds', getBreeds);

export default breedRouter;

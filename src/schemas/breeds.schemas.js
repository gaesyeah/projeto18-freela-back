import joi from 'joi';

export const breedSchema = joi.object({
  name: joi.string().required(),
  imageUrl: joi.string().uri()
});
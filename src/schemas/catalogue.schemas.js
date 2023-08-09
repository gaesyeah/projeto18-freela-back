import joi from 'joi';

export const catalogueSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  breedId:joi.number().integer().required(),
	userId: joi.number().integer().required(),
  mainPhotoId: joi.number().integer(),
	avaliable: joi.boolean().required(),
  photos: joi.array().min(1).items(
    joi.object({ 
      url: joi.string().uri().required()
    })
  ).required()
});

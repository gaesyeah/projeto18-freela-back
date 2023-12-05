import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  cellphone: joi.string().length(11).required(),
  cpf: joi.string().length(11).required(),
  imageUrl: joi.string().uri().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

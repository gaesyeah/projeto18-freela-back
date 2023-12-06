import { error } from "../errors/errors.js";

export const schemaValidation = (schema) => {
  return (req, _res, next) => {
    const { body } = req;

    const result = schema.validate({ ...body }, { abortEarly: false });
    if (result.error)
      throw error.unprocessableEntity(
        result.error.details.map(({ message }) => message).join(", ")
      );

    next();
  };
};

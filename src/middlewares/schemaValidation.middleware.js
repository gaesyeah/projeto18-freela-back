export const schemaValidation = (schema) => {
  return (req, res, next) => {
    const { body } = req;

    const { error } = schema.validate({ ...body }, { abortEarly: false });
    if (error) return res.status(422).send({ message: error.details.map(({ message }) => message) });

    next();
  }
};
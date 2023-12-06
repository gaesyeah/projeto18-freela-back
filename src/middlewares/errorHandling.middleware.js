import httpStatus from "http-status";

export const errorHandling = (error, _req, res, _next) => {
  const { detail, message, status, code } = error;

  if (code === "23505")
    return res.status(httpStatus.CONFLICT).send({ message: detail || message });

  if (status) return res.status(status).send({ message: detail || message });

  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: detail || message });
};

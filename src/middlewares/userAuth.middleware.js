import { error } from "../errors/errors.js";
import { sessionsRepository } from "../repository/sessions.repository.js";
import { validate } from "uuid";
import { removeBearerFromToken } from "../utils/functions/removeBearerFromToken.js";

export const userAuth = async (req, _res, next) => {
  const { authorization } = req.headers;

  const token = removeBearerFromToken(authorization);

  if (!authorization) throw error.unauthorized("You need to send a token");

  if (!validate(token)) throw error.unauthorized("Invalid token");

  const { rowCount } = await sessionsRepository.selectSessionByToken(token);
  if (rowCount === 0) throw error.unauthorized("Session not found");

  next();
};

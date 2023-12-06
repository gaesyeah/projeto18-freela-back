import { error } from "../errors/errors.js";
import { sessionsRepository } from "../repository/sessions.repository.js";

export const userAuth = async (req, _res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!authorization || token === "Bearer")
    throw error.unauthorized("Invalid token");

  const { rowCount } = await sessionsRepository.selectSessionByToken(token);
  if (rowCount === 0) throw error.unauthorized("Session not found");

  next();
};

import httpStatus from "http-status";
import { sessionsService } from "../services/sessions.service.js";
import { usersService } from "../services/users.service.js";
import { removeBearerFromToken } from "../utils/functions/removeBearerFromToken.js";

const signUp = async (req, res) => {
  await usersService.insertUsers(req.body);
  res.sendStatus(httpStatus.CREATED);
};

const signIn = async (req, res) => {
  const { rows } = await sessionsService.insertSessionAndSelectName(req.body);
  res.send(rows[0]);
};

const signOut = async (req, res) => {
  await sessionsService.deleteSessionByToken(
    removeBearerFromToken(req.headers.authorization)
  );
  res.sendStatus(httpStatus.NO_CONTENT);
};

export const usersController = { signIn, signOut, signUp };

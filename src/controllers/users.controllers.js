import { sessionsService } from "../services/sessions.service.js";
import { usersService } from "../services/users.service.js";

export const signUp = async (req, res) => {
  await usersService.insertUsers(req.body);
  res.sendStatus(201);
};

export const signIn = async (req, res) => {
  const { rows } = await sessionsService.insertSessionAndSelectName(req.body);
  res.status(200).send(rows[0]);
};

export const signOut = async (req, res) => {
  await sessionsService.deleteSessionByToken(
    req.headers.authorization.replace("Bearer ", "")
  );
  res.sendStatus(204);
};

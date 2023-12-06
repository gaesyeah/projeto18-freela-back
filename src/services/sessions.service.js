import { error } from "../errors/errors.js";
import { sessionsRepository } from "../repository/sessions.repository.js";
import { usersRepository } from "../repository/users.repository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const insertSessionAndSelectName = async (body) => {
  const { email, password } = body;

  const { rows, rowCount } = await usersRepository.selectUsersByEmail(email);
  if (rowCount === 0) throw error.unauthorized("The email is not registered");

  const rightPassword = bcrypt.compareSync(password, rows[0].password);
  if (!rightPassword) throw error.unauthorized("Incorrect password");

  const token = uuid();

  await sessionsRepository.insertSession(token, rows[0].id);

  return sessionsRepository.selectNameAndToken(token);
};

const deleteSessionByToken = (token) => {
  return sessionsRepository.deleteSessionByToken(token);
};

export const sessionsService = {
  insertSessionAndSelectName,
  deleteSessionByToken,
};

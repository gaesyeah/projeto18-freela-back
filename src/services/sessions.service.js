import { sessionsRepository } from "../repository/sessions.repository.js";

const insertSessionAndSelectName = async (token, id) => {
  await sessionsRepository.insertSession(token, id);

  return sessionsRepository.selectName(token);
};

const deleteSessionByToken = (token) => {
  return sessionsRepository.deleteSessionByToken(token);
};

export const sessionsService = {
  insertSessionAndSelectName,
  deleteSessionByToken,
};

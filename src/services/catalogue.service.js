import { catalogueRepository } from "../repository/catalogue.repository.js";
import { sessionsRepository } from "../repository/sessions.repository.js";
import { transactionHandler } from "../utils/functions/transactionHandler.js";

const postCatalogue = async (body, token) => {
  const { rows } = await sessionsRepository.selectNameAndToken(token);

  await transactionHandler(async (client) => {
    await catalogueRepository.insertCatalogue({
      client,
      body,
      userId: rows[0].userId,
    });
  });
};

export const catalogueService = { postCatalogue };

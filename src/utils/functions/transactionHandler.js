import httpStatus from "http-status";
import { db } from "../../database/database.js";

export const transactionHandler = async (callback) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await callback(client);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

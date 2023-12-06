import { error } from "../errors/errors.js";
import { usersRepository } from "../repository/users.repository.js";
import bcrypt from "bcrypt";

const insertUsers = (body) => {
  const { password, confirmPassword } = body;

  if (password !== confirmPassword)
    throw error.unprocessableEntity("The passwords do not match");
  return usersRepository.insertUsers(body, bcrypt.hashSync(password, 10));
};

const selectUsersByEmail = (email) => {
  return usersRepository.selectUsersByEmail(email);
};

export const usersService = { insertUsers, selectUsersByEmail };

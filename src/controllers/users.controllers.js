import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sessionsService } from "../services/sessions.service.js";
import { usersService } from "../services/users.service.js";

export const signUp = async (req, res) => {
  const { password, confirmPassword } = req.body;

  await usersService.insertUsers(req.body, password, confirmPassword);
  res.sendStatus(201);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows, rowCount } = await usersService.selectUsersByEmail(email);
    if (rowCount === 0)
      return res.status(401).send({ message: "The email is not registered" });

    const rightPassword = bcrypt.compareSync(password, rows[0].password);
    if (!rightPassword)
      return res.status(401).send({ message: "Incorrect password" });

    const token = uuid();
    const user = await sessionsService.insertSessionAndSelectName(
      token,
      rows[0].id
    );
    res.status(200).send({ token, name: user.rows[0].name });
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

export const signOut = async (req, res) => {
  const { authorization } = req.headers;
  try {
    await sessionsService.deleteSessionByToken(
      authorization.replace("Bearer ", "")
    );
    res.sendStatus(204);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

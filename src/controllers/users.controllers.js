import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { insertSessions } from '../repository/sessions.repository.js';
import { deleteSessionByToken, insertUsers, selectUsersByEmail } from '../repository/users.repository.js';

export const signUp = async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(422).send({ message: 'The passwords do not match' });
  try{
    await insertUsers(req.body, bcrypt.hashSync(password, 10));
    res.sendStatus(201);

  } catch ({ code, detail }) {
    if (code === "23505") return res.status(409).send({ message: detail });
    res.status(500).send({ message: detail });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try{
    const { rows, rowCount } = await selectUsersByEmail(email);
    if (rowCount === 0) return res.status(401).send({ message: 'The email is not registered' });

    const rightPassword = bcrypt.compareSync(password, rows[0].password);
    if (!rightPassword) return res.status(401).send({ message: 'Incorrect password' });

    const token = uuid();
    const user = await insertSessions(token, rows[0].id);
    res.status(200).send({ token, name: user.rows[0].name });

  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
};

export const signOut = async (req, res) => {
  const { authorization } = req.headers;
  try {
    await deleteSessionByToken(authorization.replace('Bearer ', ''));
    res.sendStatus(204);
  } catch ({ detail }) {
    res.status(500).send({ message: detail });
  }
}
import { selectSessionByToken } from '../repository/sessions.repository.js';

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  if (!authorization || token === 'Bearer') return res.status(401).send({ message: 'Invalid token' });

  try{
    const { rowCount } = await selectSessionByToken(token);
    if (rowCount === 0) return res.status(401).send({ message: 'Session not found' });

    next();
    
  } catch ({ message }) {
    res.status(500).send(message);
  }

};

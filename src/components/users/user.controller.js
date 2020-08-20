import { createUser, authenticateUser } from './index.js';

export const createUserCont = async({ body }, res) => {
  const response = await createUser({ body });
  if (response === true) {
    res.status(200).send('Account created...')
  } else {
    res.status(500).send('Error creating account...')
  }
};

export const authenticateCont = async(req, res) => {
  const host = req.headers.host;
  const response = await authenticateUser(req.body);
  if (response && response.error === true) {
    res.status(response.status).json({ error: response.msg });
  } else {
    if (host.includes('localhost')) {
      res.cookie('token', response.token, { httpOnly: true }).sendStatus(200);
    } else {
      res.cookie('token', response.token, { httpOnly: true, sameSite: 'None', secure: true }).sendStatus(200);
    }
  }
}

export const signOutCont = async ({ headers }, res) => {
  const host = headers.host;
  if (host.includes('localhost')) {
      res.cookie("token", "deleted", { httpOnly: true, maxAge: 0, expires: "Thu, 01 Jan 1970 00:00:00 GMT"  }).sendStatus(200);
  } else {
      res.cookie("token", "deleted", { httpOnly: true, sameSite: "None", secure: true, maxAge: 0, expires: "Thu, 01 Jan 1970 00:00:00 GMT"  }).sendStatus(200);
  }
};

export default {
  createUserCont,
  authenticateCont,
  signOutCont
};
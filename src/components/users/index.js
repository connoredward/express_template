import UserModel from "./model.js";

import jwt from "jsonwebtoken";

const secret = "mysecretsshhh";

const intError = {
  error: true,
  status: 500,
  msg: "Internal error please try again"
};

const incDetails = {
  error: true,
  status: 401,
  msg: "Incorrect email or password"
};

export async function createUser({ body }) {
  const { firstName, lastName, email, password } = body;
  const user = new UserModel({ firstName, lastName, email, password });
  return await new Promise((res, rej) => {
    user.save((err) => {
      if (err) {
        res(err)
      } else {
        res(true)
      }
    });
  });
};

export async function authenticateUser(body) {
  const { email, password } = body;
  return await new Promise((res, rej) => {
    UserModel.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err);
        res(intError);
      } else if (!user) {
        res(incDetails);
      } else {
        user.isCorrectPassword(password, (err, same) => {
          if (err) {
            res(intError);
          } else if (!same) {
            res(incDetails)
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '24h'
            });
            res({
              error: false,
              token
            });
          }
        })
      }
    });
  });
};

export default {
  createUser,
  authenticateUser
};
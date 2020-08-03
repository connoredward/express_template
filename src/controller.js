import { getAllProjects, createProject } from "./components/projects/index.js";
import { createUser, authenticateUser } from "./components/users/index.js";

export const handler = (req, res) => {
  res.send('hello world')
}

export const getAllProjectsCont = async(req, res) => {
  const response = await getAllProjects();
  res.send(response);
};

export const createProjectCont = async({ body }, res) => {
  const { item } = body;
  const response = await createProject(item);
  res.send(response);
};



export const createUserCont = async({ body }, res) => {
  const response = await createUser({ body });
  if (response === true) {
    res.status(200).send("Account created...")
  } else {
    res.status(500).send("Error creating account...")
  }
};

export const authenticateCont = async({ body }, res) => {
  const response = await authenticateUser({ body });
  if (response && response.error === true) {
    res.status(response.status).json({ error: response.msg });
  } else {
    res.cookie("token", response.token, { httpOnly: true }).sendStatus(200);
  }
}

export default {
  handler,
  getAllProjectsCont,
  createProjectCont,

  createUserCont,
  authenticateCont
};
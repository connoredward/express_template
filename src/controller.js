import { getAllProjects, getProjectSing, createProject, updateProject, deleteProject } from "./components/projects/index.js";
import { createUser, authenticateUser } from "./components/users/index.js";
import uploadMedia from './components/upload';

export const getProjectCont = async (req, res) => {
  const response = await getAllProjects();
  res.send(response);
};

export const getProjectSingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getProjectSing(id));
}

export const createProjectCont = async ({ body, files }, res) => {
  const response = await createProject({
    img: await uploadMedia(files),
    title: body.title
  });
  res.send(response);
};

export const updateProjectCont = async ({ body, files }, res) => {
  const response = await updateProject({
    ...body,
    img: files ? await uploadMedia(files) : body.img,
  });
  res.send(response);
};

export const deleteProjectCont = async(req, res) => {
  const { id } = req.params
  const response = await deleteProject(id);
  if (response === true) {
    res.status(200).send("deleted");
  } else {
    res.status(500).send("Error...")
  }
};



export const createUserCont = async({ body }, res) => {
  const response = await createUser({ body });
  if (response === true) {
    res.status(200).send("Account created...")
  } else {
    res.status(500).send("Error creating account...")
  }
};

export const authenticateCont = async(req, res) => {
  const host = req.headers.host;
  const response = await authenticateUser(req.body);
  if (response && response.error === true) {
    res.status(response.status).json({ error: response.msg });
  } else {
    if (host.includes('localhost')) {
      res.cookie("token", response.token, { httpOnly: true }).sendStatus(200);
    } else {
      res.cookie("token", response.token, { httpOnly: true, sameSite: "None", secure: true }).sendStatus(200);
    }
  }
}

export default {
  getProjectCont,
  getProjectSingCont,

  createProjectCont,
  updateProjectCont,
  deleteProjectCont,

  createUserCont,
  authenticateCont
};
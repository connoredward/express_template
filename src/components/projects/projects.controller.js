import { 
  getAllProjects, 
  getProjectSing, 
  createProject, 
  updateProject, 
  deleteProject 
} from "./index.js";

import uploadMedia from '../upload';

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
    ...body,
    img: await uploadMedia(files),
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
    res.status(200).send(true);
  } else {
    res.status(500).send(false)
  }
};

export default {
  getProjectCont,
  getProjectSingCont,
  createProjectCont,
  updateProjectCont,
  deleteProjectCont
};
import { Storage } from "@google-cloud/storage";
import path from "path";
import stream from "stream";
import { uuid } from "uuidv4";

import { getAllProjects, getProjectSing, createProject, updateProject, deleteProject } from "./components/projects/index.js";

import { createUser, authenticateUser } from "./components/users/index.js";

const gc = new Storage({
  keyFilename: path.join(__dirname, "../pristine-nomad-277506-f44132b72d13.json"),
  projectId: "pristine-nomad-277506"
});

const googleBucket = gc.bucket("cms_test_files");

export const getProjectCont = async (req, res) => {
  const response = await getAllProjects();
  res.send(response);
};


export const getProjectSingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getProjectSing(id));

}

export const createProjectCont = async (req, res) => {
  const { files } = req;
  let readStream = new stream.PassThrough();
  readStream.end(Buffer.from(files.myFile.data));

  const fileName = uuid();

  await new Promise((res, rej) => {
    readStream.pipe(
      googleBucket.file(`${fileName}.png`).createWriteStream({
        resumable: false,
        gzip: true
      })
    )
    .on("finish", res)
  }); 

  const img = `https://storage.cloud.google.com/cms_test_files/${fileName}.png`

  const item = {
    img,
    title: req.body.title
  }
  const response = await createProject(item);
  res.send(response);
};

export const updateProjectCont = async ({ body }, res) => {
  const response = await updateProject(body);
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

export const authenticateCont = async({ body }, res) => {
  const response = await authenticateUser({ body });
  if (response && response.error === true) {
    res.status(response.status).json({ error: response.msg });
  } else {
    res.cookie("token", response.token, { httpOnly: true, sameSite: 'None', secure: true }).sendStatus(200);
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
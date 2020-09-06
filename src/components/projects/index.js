import ProjectModel from "./model.js";

import { deleteMedia } from '../media';

export async function getAllProjects() {
  return await ProjectModel.find({});
};

export async function getProjectSing (id) {
  return await ProjectModel.findById(id);
};

export function createProject(item) {
  ProjectModel.create(item);
  return true;
};

export async function updateProject(item) {
  await ProjectModel.findByIdAndUpdate(item._id, item, { new: true });
  return true;
};

export function deleteProject(id) {
  ProjectModel.findByIdAndRemove(id, (err, post) => {
      const { img, video } = post;
      if (img) deleteMedia(img).catch(console.error)
      if (video) deleteMedia(video).catch(console.error)
  });
  return true;
}

export default {
  getAllProjects,
  getProjectSing,
  createProject,
  updateProject,
  deleteProject
};
import ProjectModel from "./model.js";

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

export function deleteProject(id) {
  ProjectModel.findByIdAndRemove(id, function(err) {
    console.log(err)
  });
  return true;
}

export default {
  getAllProjects,
  getProjectSing,
  createProject,
  deleteProject
};
import PostModel from "./model.js";

import { deleteMedia } from '../media';

export async function getAllPosts() {
  return await PostModel.find({});
};

export async function getPostSing (id) {
  return await PostModel.findById(id);
};

export function createPost(item) {
  PostModel.create(item);
  return true;
};

export async function updatePost(item) {
  await PostModel.findByIdAndUpdate(item._id, item, { new: true });
  return true;
};

export function deletePost(id) {
  PostModel.findByIdAndRemove(id, (err, post) => {
      const { img, video } = post;
      if (img) deleteMedia(img).catch(console.error)
      if (video) deleteMedia(video).catch(console.error)
  });
  return true;
}

export default {
  getAllPosts,
  getPostSing,
  createPost,
  updatePost,
  deletePost
};
import ContentModel from './model.js';

import { deleteMedia } from '../media';

export async function getAllContent() {
  return await ContentModel.find({});
};

export async function getContentSing(id) {
  return await ContentModel.findById(id);
};

export async function getPostContent(post) {

};

export function createContent(item) {
  ContentModel.create(item);
  return true;
};

export async function updateContent(item) {
  await ContentModel.findByIdAndUpdate(item._id, item, { new: true });
  return true;
};

export function deleteContent(id) {
  ContentModel.findByIdAndRemove(id, (err, content) => {
    const { img } = content;
    if (img) deleteMedia(img).catch(console.error);
  });
  return true;
};

export default {
  getAllContent,
  getContentSing,
  getPostContent,
  createContent,
  updateContent,
  deleteContent
};
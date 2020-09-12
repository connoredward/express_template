import {
  getAllContent,
  getContentSing,
  getPostContent,
  createContent,
  updateContent,
  deleteContent
} from './index.js';

import { uploadMedia } from '../media';

export const getContentCont = async (req, res) => {
  const response = await getAllContent();
  res.send(response);
};

export const getContentSingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getContentSing(id));
};

export const createContentCont = async ({ body, files }, res) => {
  const response = await createContent({
    ...body,
    img: files && files.img ? await uploadMedia(files.img, 'png') : body.img
  });
  res.send(response);
};

export const updateContentCont = async ({ body, files }, res) => {
  const response = await updateContent({
    ...body,
    img: files && files.img ? await uploadMedia(img, 'png') : body.img
  });
  res.send(response);
};

export const deleteContentCont = async (req, res) => {
  const { id } = req.params;
  const response = await deleteContent(id);
  if (response === true) res.status(200).send(true);
  else res.status(500).send(false);
};

export default {
  getContentCont,
  getContentSingCont,
  createContentCont,
  updateContentCont,
  deleteContentCont
};
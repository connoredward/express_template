import { 
  getAllPosts, 
  getPostSing, 
  createPost, 
  updatePost, 
  deletePost 
} from "./index.js";

import { uploadMedia } from '../media';

export const getPostCont = async (req, res) => {
  const response = await getAllPosts();
  res.send(response);
};

export const getPostSingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getPostSing(id));
}

export const createPostCont = async ({ body, files }, res) => {
  const { img, video } = files;
  const response = await createPost({
    ...body,
    img: await uploadMedia(img, 'png'),
    video: await uploadMedia(video, 'mp4')
  });
  res.send(response);
};

export const updatePostCont = async ({ body, files }, res) => {
  const response = await updatePost({
    ...body,
    img: files && files.img ? await uploadMedia(img, 'png') : body.img,
    video: files && files.video ? await uploadMedia(video, 'mp4') : body.video
  });
  res.send(response);
};

export const deletePostCont = async(req, res) => {
  const { id } = req.params
  const response = await deletePost(id);
  if (response === true) {
    res.status(200).send(true);
  } else {
    res.status(500).send(false)
  }
};

export default {
  getPostCont,
  getPostSingCont,
  createPostCont,
  updatePostCont,
  deletePostCont
};
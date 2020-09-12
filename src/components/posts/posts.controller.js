import { 
  getAllPosts, 
  getPostSing, 
  createPost, 
  updatePost, 
  deletePost 
} from "./index.js";

import progressUpload from '../progress';

import { uploadMedia } from '../media';

const STEPS = ['CREATING', 'UPLOADING_IMAGE', 'UPLOADING_VIDEO', 'COMPLETE', 'ERROR'];

export const getPostCont = async (req, res) => {
  const response = await getAllPosts();
  res.send(response);
};

export const getPostSingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getPostSing(id));
}

export const createPostCont = async ({ body, files }, res) => {
  let savedPost = await createPost({ ...body, status: 'unpublished' });
  let savedSub = await progressUpload(savedPost, STEPS[0], 'post');
  if (files && files.img) {
    progressUpload(savedSub, STEPS[1]);
    savedPost = {...savedPost, img: await uploadMedia(files.img, 'png')};
  }
  if (files && files.video) {
    progressUpload(savedSub, STEPS[2]);
    savedPost = {...savedPost, video: await uploadMedia(files.video, 'mp4')};
  }
  savedPost = await updatePost({ ...savedPost, status: body.status });
  progressUpload(savedSub, STEPS[3]);
  res.send(true); 
};

export const updatePostCont = async ({ body, files }, res) => {
  // let savedPost = await updatePost({ ...body, status: 'unpublished' });
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
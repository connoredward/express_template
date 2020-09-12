import {
  getAllSubs,
  deleteSub
} from './index';

export const getSubCont = async (req, res) => {
  const response = await getAllSubs();
  res.send(response);
}

export const deleteSubCont = async (req, res) => {
  const { _id } = req.params;
  const response = await deleteSub(_id);
  if (response) res.status(200).send(true);
  else res.status(500).send(false);
};

export default {
  getSubCont,
  deleteSubCont
};
import { 
  getAllCategories,
  getCategorySing,
  createCategory,
  updateCategory,
  deleteCatergory
} from './index.js';

export const getAllCategoriesCont = async (req, res) => {
  const response = await getAllCategories();
  res.send(response);
};

export const getCategorySingCont = async (req, res) => {
  const { id } = req.params;
  res.send(await getCategorySing(id));
};

export const createCategoryCont = async ({ body }, res) => {
  const response = await createCategory(body);
  res.send(response);
};

export const updateCategoryCont = async ({ body }, res) => {
  const response = await updateCategory(body);
  res.send(response);
};

export const deleteCatergoryCont = async (req, res) => {
  const { id } = req.params;
  const response = await deleteCatergory(id);
  if (response) res.status(200).send(true);
  else res.status(500).send(false);
};

export default {
  getAllCategoriesCont,
  getCategorySingCont,
  createCategoryCont,
  updateCategoryCont,
  deleteCatergoryCont
};
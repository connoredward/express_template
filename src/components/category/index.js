import CategoryModel from './model.js';

export async function getAllCategories() {
  return await CategoryModel.find({});
};

export async function getCategorySing(id) {
  return await CategoryModel.findById(id);
};

export function createCategory(item) {
  CategoryModel.create(item);
  return true;
}

export async function updateCategory(item) {
  await CategoryModel.findByIdAndUpdate(item._id, item, { new: true });
  return true;
};

export function deleteCatergory(id) {
  CategoryModel.findByIdAndRemove(id, function(err) {
    console.log(err)
  });
  return true;;
};

export default {
  getAllCategories,
  getCategorySing,
  createCategory,
  updateCategory,
  deleteCatergory
};
import SubscribeModel from './model.js';

export async function getAllSubs() {
  return await SubscribeModel.find({});
};

export async function createSub(sub) {
  return (await SubscribeModel.create(sub)).toObject();
};

export async function updateSub(sub) {
  return (await SubscribeModel.findByIdAndUpdate(sub._id, sub, { new: true })).toObject();
}

export function deleteSub(_id) {
  SubscribeModel.findByIdAndRemove(_id, (err, sub) => {
    if (err) console.log(err);
  });
  return true
};

export default {
  getAllSubs,
  createSub,
  updateSub,
  deleteSub
};
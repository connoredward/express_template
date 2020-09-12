import {
  createSub,
  updateSub
} from '../subscribe';

export async function progressUpload(item, step, type) {
  const { title, _id } = item;
  let sub;

  if (step === 'CREATING') {
    const newSub = {
      title,
      type: { title: type, _id },
      status: step
    };
    sub = await createSub(newSub);
  }
  else sub = updateSub({ ...item, status: step });
  return sub;
};

export default progressUpload;
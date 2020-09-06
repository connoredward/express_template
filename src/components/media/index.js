import { Storage } from '@google-cloud/storage';
import path from 'path';
import stream from 'stream';
import { uuid } from 'uuidv4';

const gc = new Storage({
  keyFilename: path.join(__dirname, '../../../pristine-nomad-277506-f44132b72d13.json'),
  projectId: 'pristine-nomad-277506'
});

const googleBucket = gc.bucket('cms_test_files');

export async function uploadMedia(file, mimetype) {
  let readStream = new stream.PassThrough();
  readStream.end(Buffer.from(file.data));

  const fileName = uuid();

  await new Promise((res, rej) => {
    readStream.pipe(
      googleBucket.file(`${fileName}.${mimetype}`).createWriteStream({
        resumable: false,
        gzip: true
      })
    )
    .on('finish', res);
  }); 
  
  return `https://storage.cloud.google.com/cms_test_files/${fileName}.${mimetype}`;
};

export async function deleteMedia(filename) {
  await googleBucket.file(filename.split('/')[4]).delete();
}

export default {
  uploadMedia,
  deleteMedia
};
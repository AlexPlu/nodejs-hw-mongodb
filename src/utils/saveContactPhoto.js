import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';
import { env } from './env.js';

export async function saveContactPhoto(photo) {
  if (!photo) return null;

  if (env('ENABLE_CLOUDINARY') === 'true') {
    return await saveFileToCloudinary(photo);
  } else {
    return await saveFileToUploadDir(photo);
  }
}

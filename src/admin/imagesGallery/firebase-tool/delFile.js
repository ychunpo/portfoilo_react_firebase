import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../../utils/firebase';

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef)
    .then(imageRef => {
      console.log('Successfully')
    })
    .catch(error => {
      console.log('Error: ', error)
    });
};

export default deleteFile;
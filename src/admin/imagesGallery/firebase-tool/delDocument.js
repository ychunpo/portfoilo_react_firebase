import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const deleteDocument = (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId))
    .then(() => {
      console.log('Successfully')
    })
    .catch(error => {
      console.log('Error: ', error)
    });
};

export default deleteDocument;
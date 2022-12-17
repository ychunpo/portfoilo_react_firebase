import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';

const addDocument = (collectionName, documentObj, id) => {
  const docRef = doc(collection(db, collectionName), id);
  return setDoc(docRef, {
    ...documentObj,
    timestamp: serverTimestamp(),
  }).then(docRef => {
    console.log('Added Successfully')
  })
    .catch(error => {
      console.log('Error: ', error)
    });
};

export default addDocument;
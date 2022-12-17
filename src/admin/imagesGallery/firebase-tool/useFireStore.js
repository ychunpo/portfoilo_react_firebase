import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';

const useFireStore = (collectionName = 'imageLibrary') => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(
      q, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (error) => {
        //alert(error.message);
        console.log(error.message);
      }
    );
    return () => unsubscribe();
  }, [collectionName]);

  return { documents };
};

export default useFireStore;
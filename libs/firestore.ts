// Import the functions you need from the SDKs you need
import firebaseConfig from "../firebase.json" assert { type: "json" };
import { initializeApp } from "https://cdn.skypack.dev/firebase@9.12.1/app";
import {
  doc,
  DocumentSnapshot,
  FieldValue,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "https://cdn.skypack.dev/@firebase/firestore";
// import { getAnalytics } from "https://cdn.skypack.dev/@firebase/analytics";
import { useEffect, useState } from "preact/hooks";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

interface Dict {
  [key: string]: number | string | Date | FieldValue;
}
export const useLiveDocument = (path: string, defaultValue?: Dict) => {
  const [data, setData] = useState<Dict>(defaultValue || {});
  const docRef = doc(firestore, ...path.split("/"));

  useEffect(() => {
    return onSnapshot(docRef, (doc: DocumentSnapshot) => {
      if (doc.exists()) {
        setData(doc.data());
      }
    });
  }, []);

  return {
    data,
    update: async (updatedData: Dict) => {
        await updateDoc(docRef, updatedData);
    },
  };
};

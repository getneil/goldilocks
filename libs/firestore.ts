// Import the functions you need from the SDKs you need
import firebaseConfig from "../firebase.json" assert { type: "json" };
import { initializeApp } from "https://cdn.skypack.dev/firebase@9.12.1/app";
import {
  doc,
  getDoc,
  DocumentSnapshot,
  FieldValue,
  getFirestore,
  onSnapshot,
  updateDoc,
  serverTimestamp,
setDoc,
} from "https://cdn.skypack.dev/@firebase/firestore";
// import { getAnalytics } from "https://cdn.skypack.dev/@firebase/analytics";
import { useEffect, useState } from "preact/hooks";

import type { Team } from "../types.ts";
import { serve } from "https://deno.land/std@0.150.0/http/server.ts";

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

export const getTeam = async (slug: string) : Promise<Team | null> => {
  const docRef = doc(firestore, `/teams/${slug}`);
  const teamDoc = await getDoc(docRef);
  return teamDoc.exists() ? teamDoc.data() as Team : null;
}

export const createTeam = async (name: string, slug: string): Promise<Team> => {
  const docRef = doc(firestore, `/teams/${slug}`);
  const data: Team = {
    name,
    slug,
    created_at: serverTimestamp(),
  }
  await setDoc(docRef, data);
  return data;
}
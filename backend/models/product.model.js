import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../config/firebase.config.js";

const COLLECTION_NAME = "products";
const collectionRef = collection(db, COLLECTION_NAME);

export const getAllProducts = async () => {
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data()
  }));
};

export const getProductById = async (id) => {
  const productRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
};

export const createProduct = async (productData) => {
  const newProduct = {
    title: productData.title,
    price: Number(productData.price),
    category: productData.category,
    description: productData.description || "",
    image: productData.image || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collectionRef, newProduct);
  const createdSnapshot = await getDoc(docRef);

  return {
    id: docRef.id,
    ...createdSnapshot.data()
  };
};

export const deleteProduct = async (id) => {
  const productRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  const deletedProduct = {
    id: snapshot.id,
    ...snapshot.data()
  };

  await deleteDoc(productRef);

  return deletedProduct;
};

export const updateProduct = async (id, productData) => {
  const productRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  const updatedFields = {
    title: productData.title,
    price: Number(productData.price),
    category: productData.category,
    description: productData.description || "",
    image: productData.image || "",
    updatedAt: serverTimestamp()
  };

  await updateDoc(productRef, updatedFields);
  const updatedSnapshot = await getDoc(productRef);

  return {
    id: updatedSnapshot.id,
    ...updatedSnapshot.data()
  };
};

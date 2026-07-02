import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const { db } = await import("../config/firebase.config.js");

const COLLECTION_NAME = "products";
const DEFAULT_PRODUCTS_FILE = resolve(__dirname, "../data/products.json");

const mapProduct = (product) => ({
  title: product.nombre,
  price: Number(product.precio),
  category: product.categoria,
  description:
    product.descripcion || "Producto disponible en Facherit@s.",
  image: product.imagen || "/img/logo.png",
  legacyId: product.id,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});

const loadProducts = () => {
  const productsPath =
    process.env.FACHERITOS_PRODUCTS_PATH || DEFAULT_PRODUCTS_FILE;

  const raw = readFileSync(productsPath, "utf-8");
  const products = JSON.parse(raw);

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("No se encontraron productos para importar.");
  }

  return products;
};

const seedProducts = async () => {
  const forceImport = process.argv.includes("--force");
  const collectionRef = collection(db, COLLECTION_NAME);
  const existing = await getDocs(collectionRef);

  if (!existing.empty && !forceImport) {
    console.log(
      `Ya hay ${existing.size} productos en Firestore. Usa --force para volver a importar.`
    );
    process.exit(0);
  }

  const products = loadProducts();
  let imported = 0;

  for (const product of products) {
    const documentId = String(product.id);
    const productRef = doc(db, COLLECTION_NAME, documentId);

    await setDoc(productRef, mapProduct(product), { merge: true });
    imported += 1;
    console.log(`Importado: ${product.nombre}`);
  }

  console.log(`\nListo. ${imported} productos pasados a Firestore.`);
  process.exit(0);
};

seedProducts().catch((error) => {
  console.error("Error importando productos:", error.message);
  process.exit(1);
});

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from "../models/product.model.js";

export const fetchAllProducts = async () => {
  return getAllProducts();
};

export const fetchProductById = async (id) => {
  if (!id) {
    const error = new Error("El ID del producto es obligatorio.");
    error.statusCode = 400;
    throw error;
  }

  const product = await getProductById(id);

  if (!product) {
    const error = new Error("Producto no encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const addProduct = async (productData) => {
  const { title, price, category } = productData;

  if (!title || price === undefined || !category) {
    const error = new Error("Debes enviar title, price y category.");
    error.statusCode = 400;
    throw error;
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    const error = new Error("El price debe ser un numero mayor a 0.");
    error.statusCode = 400;
    throw error;
  }

  return createProduct({
    ...productData,
    price: numericPrice
  });
};

export const removeProduct = async (id) => {
  if (!id) {
    const error = new Error("El ID del producto es obligatorio.");
    error.statusCode = 400;
    throw error;
  }

  const deletedProduct = await deleteProduct(id);

  if (!deletedProduct) {
    const error = new Error("Producto no encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return deletedProduct;
};

export const editProduct = async (id, productData) => {
  const { title, price, category } = productData;

  if (!title || price === undefined || !category) {
    const error = new Error("Debes enviar title, price y category.");
    error.statusCode = 400;
    throw error;
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    const error = new Error("El price debe ser un numero mayor a 0.");
    error.statusCode = 400;
    throw error;
  }

  const updatedProduct = await updateProduct(id, {
    ...productData,
    price: numericPrice
  });

  if (!updatedProduct) {
    const error = new Error("Producto no encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return updatedProduct;
};

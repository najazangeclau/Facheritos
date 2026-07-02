import {
  addProduct,
  editProduct,
  fetchAllProducts,
  fetchProductById,
  removeProduct
} from "../services/products.service.js";

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Error interno del servidor."
  });
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await fetchAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await fetchProductById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await removeProduct(req.params.id);

    return res.status(200).json({
      message: "Producto eliminado correctamente.",
      product: deletedProduct
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await editProduct(req.params.id, req.body);
    return res.status(200).json(product);
  } catch (error) {
    return handleError(res, error);
  }
};

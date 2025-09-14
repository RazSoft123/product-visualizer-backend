import express from "express"
import { getAllProducts, getProductById } from "../controllers/productController.js"

const productRoutes = express.Router();

// Public routes
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);

// For later implementation of admin routes
// productRoutes.post('/', createProduct);
// productRoutes.put('/:id', updateProduct);
// productRoutes.delete('/:id', deleteProduct);

export default productRoutes;

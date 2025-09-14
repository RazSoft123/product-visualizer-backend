import express from "express"
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js"
import { imageUpload } from "../middleware/imageUpload.js";

const productRoutes = express.Router();

// Public routes
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);

// For later implementation of admin routes
productRoutes.post('/', imageUpload.single("image"), createProduct);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);


export default productRoutes;
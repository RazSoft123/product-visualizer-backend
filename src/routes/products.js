import express from "express"
import { getAllProducts, getProductById } from "../controllers/productController.js"

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// For later implementation of admin routes
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

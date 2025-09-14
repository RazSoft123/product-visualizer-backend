import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();

// Configring multer for file uploads

// Get all products "GET /api/products"
export const getAllProducts = async (req, res) => {
    try {
        // res.status(200).json({ message: "List of all products" });
        const products = await prisma.product.findMany({ orderBy: { created_at: 'desc' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve products", details: error.message });
    }
};

// Get product by ID "GET /api/products/:id"
export const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        // res.status(200).json({ message: `Product details for ID: ${id}` });
        const product = await prisma.product.findUnique({
            where: { id: id }
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve product", details: error.message });
    }
};


// Create a new product "POST /api/products"
export const createProduct = async (req, res) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: req.body.name,
                image: "public/product/img/" + req.file.filename,
                category: req.body.category,
                price: parseFloat(req.body.price),
            }
        });
        res.status(201).json({
            status: "Success",
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create product", details: error.message });
    }
}

// Update a product "PUT /api/products/:id"
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                name: req.body.name,
                category: req.body.category,
                price: parseFloat(req.body.price),
                image: req.file ? "public/product/img/" + req.file.filename : undefined,
            }
        });
        res.status(200).json({
            status: "Success",
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update product", details: error.message });
    }
}

// Delete a product "DELETE /api/products/:id"
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: id }
        });
        res.status(204).json({
            status: "Success",
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product", details: error.message });
    }
};
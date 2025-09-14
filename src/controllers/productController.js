import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

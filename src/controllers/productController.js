import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products "GET /api/products"
export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve products" });
    }
};

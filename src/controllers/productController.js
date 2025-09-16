import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products "GET /api/products"
export const getAllProducts = async (req, res) => {
    try {
        // res.status(200).json({ message: "List of all products" });
        console.log("Request body is : ", req);
        const products = await prisma.product.findMany({ orderBy: { created_at: 'desc' } });
        const data = products.map((product) => { return { id: product.id, name: product.name, image: `${req.protocol}://${req.get("host")}/storage/product/img/` + product.image } })
        res.status(200).json({
            status: "success",
            count: data.length,
            data: data,

        });
    } catch (error) {
        res.status(500).json({ status: "fail", error: "Failed to retrieve products" });
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
            return res.status(404).json({ status: "fail", error: "Failed to retrieve product" });
        }

        const data = {
            id: product.id,
            name: product.name,
            image: `${req.protocol}://${req.get("host")}/storage/product/img/` + product.image,
            model: `${req.protocol}://${req.get("host")}/storage/product/models/` + product.model,
            price: product.price,
            category: product.category,
            description: product.desc
        }
        res.status(200).json({
            status: "success",
            count: 1,
            data: data
        });
    } catch (error) {
        res.status(500).json({ status: "fail", error: "Failed to retrieve product" });
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
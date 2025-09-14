import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/products.js";

// Import routes
// import productRoutes from "./routes/products.js";
// import uploadRoutes from "./routes/upload.js";
// import authRoutes from "./routes/auth.js"; // optional

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is healthy",
        status: "OK",
    });
});

// Routes
app.use("/api/products", productRoutes);
// app.use("/api/upload-model", uploadRoutes);
// app.use("/api/auth", authRoutes);

export default app;

import "dotenv/config"
import express from "express"

const app = new express();

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
    console.log(`Stated listing to http://${HOST}:${PORT}`)
})

// Checking health of the server
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is healthy",
        status: "OK",
    })
});

export default app;
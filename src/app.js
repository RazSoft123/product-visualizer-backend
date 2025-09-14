import app from "./server.js";

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Stated listing to port 8080"
    })
})
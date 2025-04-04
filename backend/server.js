require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend conectado")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Servidor en funcionamiento en Host Local: http://localhost:5000/")
});

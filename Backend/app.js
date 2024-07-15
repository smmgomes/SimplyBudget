require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello World");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Jude mean${port}`);
    mongoose
        .connect(process.env.DB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error: ", err.message);
        });
});

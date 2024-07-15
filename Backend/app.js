require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userLogin = require("./routes/userLogin");
const userSignup = require("./routes/userSignup");
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/login", userLogin);
app.use("/signup", userSignup);

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`I LOVE SARA ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

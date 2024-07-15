require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((err) => {
		console.log(err.message);
	});

const port = 3000;

app.get("/", (_, res) => {
	res.send({ status: "ok", message: "Hello World!" });
});

app.listen(port, () => {
	console.log(`I LOVE SARA ${port}`);
});

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/user");
const User = mongoose.model("User");

router.post("/", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const oldUser = User.findOne({ email: email });
		if (oldUser)
			return res.status(409).send({
				status: "error",
				message: "User with this email already exists",
			});
		const hashedPassword = bcrypt.hash(password, 10);
		await User.create({
			name: name,
			email: email,
			password: hashedPassword,
		});
		res.status(200).send({
			status: "success",
			message: "User created successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Something went wrong",
		});
	}
});

module.exports = router;

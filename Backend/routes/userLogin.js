const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/user");
const User = mongoose.model("User");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "A user with this email does not exist",
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({
                status: "error",
                message: "Incorrect Password",
            });
        }
        res.status(200).send({
            status: "success",
            message: "User logged in successfully",
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
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

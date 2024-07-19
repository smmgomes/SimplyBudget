const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");

router.get("/allUsers", async (_, res) => {
    try {
        const users = User.find({});
        return res.status(200).send({
            status: "ok",
            message: "Users retrieved",
            users: users[0],
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: "error", message: err.message });
    }
});

router
    .route("/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const user = User.findById(id);
            if (!user) {
                return res
                    .status(404)
                    .send({ status: "error", message: "User not found" });
            }
            return res.status(200).send({
                status: "ok",
                message: "User retrieved",
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } catch (err) {
            console.log(err.message);
            return res.status(500).send({ status: "error", message: err.message });
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        try {
            const user = User.findByIdAndUpdate(id, req.body);
            if (!user) {
                return res
                    .status(404)
                    .send({ status: "error", message: "User not found" });
            }
            return res.status(200).send({
                status: "ok",
                message: "User updated",
                user: user,
            });
        } catch (err) {
            console.log(err.message);
            return res.status(500).send({ status: "error", message: err.message });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const user = User.findByIdAndDelete(id);
            if (!user) {
                return res
                    .status(404)
                    .send({ status: "error", message: "User not found" });
            }
            return res.status(200).send({
                status: "ok",
                message: "User deleted",
            });
        } catch (err) {
            console.log(err.message);
            return res.status(500).send({ status: "error", message: err.message });
        }
    });

module.exports = router;

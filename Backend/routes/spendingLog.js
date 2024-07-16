const express = require("express");
const router = express.Router();
require("../models/spendingLog");
const mongoose = require("mongoose");
const SpendingLog = mongoose.model("SpendingLog");

router.post("/", async (req, res) => {
    try {
        const spendingLog = await SpendingLog.create(req.body);
        return res.status(201).send({
            status: "ok",
            message: "Spending log created",
            spendingLog: spendingLog,
        });
    } catch (err) {
        return res.status(400).send({
            status: "error",
            message: err.message,
        });
    }
});

router.get("/allSpendingLogs", async (_, res) => {
    try {
        const spendingLogs = await SpendingLog.find({});
        return res.status(200).send({
            status: "ok",
            message: "Spending logs retrieved",
            spendingLogs: spendingLogs,
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: err.message,
        });
    }
});

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const spendingLog = await SpendingLog.findById(id);
            return res.status(200).send({
                status: "ok",
                message: "Spending log selected",
                spendingLog: spendingLog,
            });
        } catch (err) {
            return res.status(400).send({
                status: "error",
                message: err.message,
            });
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        try {
            const spendingLog = await SpendingLog.findByIdAndUpdate(id, req.body);
            if (!spendingLog) {
                return res.status(404).send({
                    status: "error",
                    message: "Spending log not found",
                });
            }
            return res.status(200).send({
                status: "ok",
                message: "Spending log updated",
            });
        } catch (err) {
            return res.status(400).send({
                status: "error",
                message: err.message,
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const spendingLog = await SpendingLog.findByIdAndDelete(id);
            if (!spendingLog) {
                return res.status(404).send({
                    status: "error",
                    message: "Spending log not found",
                });
            }
            return res.status(200).send({
                status: "ok",
                message: "Spending log deleted",
            });
        } catch (err) {
            return res.status(400).send({
                status: "error",
                message: err.message,
            });
        }
    });

module.exports = router;

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/spendingLog");
const SpendingLog = mongoose.model("SpendingLog");

const port = 3000;

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(express.json());
app.use(cors());

app.post(`/addlog`, async (req, res) => {
    try {
        const { budget, income, duration_from, duration_to } = req.body;
        const logs = await SpendingLog.findOne({
            duration_date: [duration_from, duration_to],
        });
        if (logs) {
            return res.status(400).json({
                status: "error",
                message: "Log already exists",
            });
        }
        await SpendingLog.create({
            budget,
            income,
            duration_date: [duration_from, duration_to],
            spent: 0,
            left: budget,
        });
        return res.status(200).json({
            status: "ok",
            message: "Spending log created",
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
});

app.get(`/alllogs`, async (_, res) => {
    try {
        const logs = await SpendingLog.find({});
        return res.status(200).json({
            status: "ok",
            message: `Spending Logs retrieved`,
            logs,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
});

app
    .route(`/log/:id`)
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const log = await SpendingLog.findById(id);
            return res.status(200).json({
                status: "ok",
                message: `Spending log retrieved`,
                _id: log._id,
                budget: log.budget,
                income: log.income,
                duration_date: log.duration_date,
                spent: log.spent,
                left: log.budget - log.spent,
            });
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        try {
            const log = await SpendingLog.findByIdAndUpdate(id, req.body);
            if (!log) {
                return res.status(404).json({
                    status: "error",
                    message: `Spending log not found`,
                });
            }
            return res.status(200).json({
                status: "ok",
                message: "Spending log updated",
                _id: log._id,
                budget: log.budget,
                income: log.income,
                duration_date: log.duration_date,
                spent: log.spent,
                left: log.left,
            });
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const log = await SpendingLog.findByIdAndDelete(id);
            if (!log) {
                return res.status(404).json({
                    status: "error",
                    message: `Spending Log not found`,
                });
            }
            return res.status(200).json({
                status: "ok",
                message: `Spending Log deleted`,
                _id: log._id,
                budget: log.budget,
                income: log.income,
                duration_date: log.duration_date,
                spent: log.spent,
                left: log.left,
            });
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }
    });

app.get("/getvalues", async (req, res) => {
    try {
        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

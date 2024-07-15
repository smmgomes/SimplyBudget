const mongoose = require("mongoose");

const spendingLogSchema = new mongoose.Schema(
    {
        budget: { type: Number, required: true },
        expected_income: { type: Number, required: true },
        duration_date: [{ type: Date, required: true }],
        spent: { type: Number },
    },
    {
        collection: "SpendingLog",
    },
);

module.exports = mongoose.model("SpendingLog", spendingLogSchema);

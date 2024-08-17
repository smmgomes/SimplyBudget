const mongoose = require("mongoose");

const spendingLogSchema = new mongoose.Schema(
    {
        budget: { type: Number },
        income: { type: Number },
        duration_date: [{ type: String }],
        spent: { type: Number },
        left: { type: Number },
    },
    {
        collection: "SpendingLog",
    },
);

module.exports = mongoose.model("SpendingLog", spendingLogSchema);

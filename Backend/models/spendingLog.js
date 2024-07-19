const mongoose = require("mongoose");

const spendingLogSchema = new mongoose.Schema(
  {
    budget: { type: Number },
    expected_income: { type: Number },
    duration_date: [{ type: Date }],
    spent: { type: Number },
    left: { type: Number },
  },
  {
    collection: "SpendingLog",
  }
);

module.exports = mongoose.model("SpendingLog", spendingLogSchema);

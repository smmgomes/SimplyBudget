const mongoose = require("mongoose");

const budget = new mongoose.Schema(
  {
    budget: { type: Number },
    expected_income: { type: Number },
    duration_from: [{ type: Date }],
    duration_to: [{ type: Date }],
  },
  {
    collection: "Budget",
  }
);

module.exports = mongoose.model("Budget", budget);

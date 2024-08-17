const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema(
	{
		savings: { type: Number },
	},
	{ collection: "Savings" },
);

module.exports = mongoose.model("Savings", SavingsSchema);

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

require("./models/user");
const User = mongoose.model("User");

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

const getAllData = async (Model, name, res) => {
	try {
		const data = await Model.find({});
		return res.status(200).json({
			status: "ok",
			message: `${name} retrieved`,
			data: data,
		});
	} catch (err) {
		return res.status(500).json({
			status: "error",
			message: err.message,
		});
	}
};

const getData = async (id, Model, name, res) => {
	try {
		const data = await Model.findById(id);
		return res.status(200).json({
			status: "ok",
			message: `${name} selected`,
			data: data,
		});
	} catch (err) {
		return res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

const updateData = async (id, Model, name, req, res) => {
	try {
		const data = await Model.findByIdAndUpdate(id, req.body);
		if (!data) {
			return res.status(404).json({
				status: "error",
				message: `${name} not found`,
			});
		}
		return res.status(200).json({
			status: "ok",
			message: "Spending log updated",
		});
	} catch (err) {
		return res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

const deleteData = async (id, Model, name, res) => {
	try {
		const data = await Model.findByIdAndDelete(id);
		if (!data) {
			return res.status(404).json({
				status: "error",
				message: `${name} not found`,
			});
		}
		return res.status(200).json({
			status: "ok",
			message: `${name} deleted`,
		});
	} catch (err) {
		return res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
};

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
		optionsSuccessStatus: 200,
		methods: "GET, POST, PUT, DELETE",
	}),
);

app.post("/signup", async (_, res) => {
	try {
		const email = "sara@mail.com";
		const password = "password";
		const firstname = "Sara";
		const lastname = "Gomes";
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({
			email: email,
			password: hashedPassword,
			firstname: firstname,
			lastname: lastname,
		});
		return res.status(200).json({
			status: "success",
			message: "User created successfully",
			firstname: firstname,
			lastname: lastname,
			email: email,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			status: "error",
			message: "Something went wrong",
		});
	}
});

app.post("/login", async (_, res) => {
	try {
		const email = "sara@mail.com";
		const password = "password";
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				status: "error",
				message: "User with this email does not exist",
			});
		}
		const matchedPassword = await bcrypt.compare(password, user.password);
		if (!matchedPassword) {
			return res.status(401).json({
				status: "error",
				message: "Invalid password",
			});
		}
		return res.status(200).json({
			status: "success",
			message: "User created successfully",
			_id: user._id,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			status: "error",
			message: "Something went wrong",
		});
	}
});

app.get("/allusers", async (res) => await getAllData(User, "Users", res));

app
	.route("/users/:id")
	.get(async (req, res) => await getData(req.params.id, User, "User", res))
	.put(
		async (req, res) => await updateData(req.params.id, User, "User", req, res),
	)
	.delete(
		async (req, res) => await deleteData(req.params.id, User, "User", res),
	);

app.post("/logadd", async (req, res) => {
	try {
		const spendingLog = await SpendingLog.create(req.body);
		return res.status(201).json({
			status: "ok",
			message: "Spending log created",
			spendingLog: spendingLog,
		});
	} catch (err) {
		return res.status(400).json({
			status: "error",
			message: err.message,
		});
	}
});

app.get(
	"/allspendinglogs",
	async (res) => await getAllData(SpendingLog, "Spending logs", res),
);

app
	.route("spendinglog/:id")
	.get(
		async (req, res) =>
			await getData(req.params.id, SpendingLog, "Spending log", res),
	)
	.put(
		async (req, res) =>
			await updateData(req.params.id, SpendingLog, "Spending log", req, res),
	)
	.delete(
		async (req, res) =>
			await deleteData(req.params.id, SpendingLog, "Spending log", res),
	);

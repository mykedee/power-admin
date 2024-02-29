const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "./.././frontend/public/uploads")));
// app.use(express.static(path.join(__dirname, "../frontend/publics/uploads"))); //  "public" off of current is root

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
	app.use("/uploads", express.static("/var/data/uploads"));
	app.use(express.static(path.join(__dirname, "/uploads")));
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	const __dirname = path.resolve();
	app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => {
		console.log("db connected");
	})
	.catch((error) => {
		console.log(error);
	});

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => console.log(`app runing on ${PORT}`));

// lakes99

// Jl9Aoob7yOBT8a24

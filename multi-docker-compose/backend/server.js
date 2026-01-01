import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
// Default to 5000 so the app works when run with docker-compose or locally
const PORT = process.env.PORT || 5000;
// Accept either MONGODB_URL or MONGO_URL (docker-compose sometimes uses MONGO_URL)
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGO_URL;

// Middlewares
app.use(cors());
app.use(express.json()); // <-- built-in JSON parser

// Database connection
mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// Listen on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port: ${PORT}`);
});

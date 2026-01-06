// javascript
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/", (req, res) => res.json({ message: "Server Working !" }));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
});

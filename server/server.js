require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use((error, _request, response, _next) => {
  console.error("Request failed:", error);
  response.status(500).json({ error: "Internal server error" });
});

connectDB().catch((error) => {
  console.error("Database connection failed:", error.message);
});

app.listen(port, () => {
  console.log(`Apex Hunter API listening on http://localhost:${port}`);
});

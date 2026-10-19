require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { connectToMongoDB, disconnectFromMongoDB } = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/ai", aiRoutes);

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use((error, _request, response, _next) => {
  if (error.status === 400 && error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Request body must be valid JSON." });
  }

  console.error("Request failed:", error.message);
  response.status(500).json({ error: "Internal server error" });
});

connectToMongoDB().catch((error) => {
  console.error("Database connection failed:", error.message);
});

const server = app.listen(port, () => {
  console.log(`Apex Hunter API listening on http://localhost:${port}`);
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received; closing server.`);

  server.close(async (error) => {
    if (error) {
      console.error("HTTP server shutdown failed:", error.message);
      process.exitCode = 1;
    }

    try {
      await disconnectFromMongoDB();
    } catch (disconnectError) {
      console.error("MongoDB shutdown failed:", disconnectError.message);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

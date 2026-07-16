import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.status(200).json({
      status: "healthy",
      service: "taskflow-api",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: err.message,
    });
  }
});

export default router;
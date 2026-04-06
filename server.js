const express = require('express');
require('dotenv').config();
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const app = express();

// Database connection
require('./config/database');
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Bridge Backend Running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
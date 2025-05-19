const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://dynamicecom-f.vercel.app",
      "http://127.0.0.1:3002",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3000",
      "https://ddc9833g-5173.inc1.devtunnels.ms"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://aniketniet:aniketniet@cluster0.jiyqg98.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

// Connect DB
connectDB();

const app = express();


// ================= MIDDLEWARE =================
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);


// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully 🚀"
  });
});


// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
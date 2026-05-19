const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");

const { redirectUrl } = require("./controllers/urlController");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);


// REDIRECT ROUTE
app.get("/:shortCode", redirectUrl);


app.get("/", (req, res) => {
  res.send("LinkPulse API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
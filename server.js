const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./config/db");
const router = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
const PORT = process.env.PORT || 3001;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

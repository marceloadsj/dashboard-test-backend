const express = require("express");
const cors = require("cors");
const packageJson = require("./package.json");
require("dotenv").config();

const userRoutes = require("./domains/user/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    version: packageJson.version,
    uptime: process.uptime()
  });
});

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Dashboard Test Backend listening on http://localhost:${process.env.PORT}`
  );
});

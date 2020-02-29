const express = require("express");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send("Dashboard Test"));

app.listen(process.env.PORT, () => {
  console.log(
    `Dashboard Test Backend listening on http://localhost:${process.env.PORT}`
  );
});

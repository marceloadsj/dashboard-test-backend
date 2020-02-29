const express = require("express");

const { PORT } = require("./config");

const app = express();

app.get("/", (req, res) => res.send("Dashboard Test"));

app.listen(PORT, () => {
  console.log(`Dashboard Test Backend listening on http://localhost:${PORT}`);
});

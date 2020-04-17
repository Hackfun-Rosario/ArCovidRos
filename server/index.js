const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  db = require("./db"),
  jwtkey = process.env.JWTKEY,
  port = process.env.PORT || 7000,
  StatsRouter = require("./routes/covid/stats-routes"),
  UsersRouter = require("./routes/auth-routes"),
  BarriosRouter = require("./routes/almacenes/barrios-routes"),
  AlmacenesRouter = require("./routes/almacenes/almacenes-routes");

app.set("jwtkey", jwtkey);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", StatsRouter);
app.use("/api/auth", UsersRouter);
app.use("/api/almacenes", BarriosRouter);
app.use("/api/almacenes", AlmacenesRouter);
app.listen(port, () => console.log(`Server listening on port ${port}`));

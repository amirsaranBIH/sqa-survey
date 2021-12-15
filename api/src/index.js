const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/survey");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "123412341234", resave: false, saveUninitialized: false }));

app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});

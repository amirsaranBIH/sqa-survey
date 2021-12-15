const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/survey");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}));
app.use(session({
  secret: "123412341234",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false
  }, 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});

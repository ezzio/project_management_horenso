const express = require("express");
const path = require("path");
const cors = require("cors");
const indexRouter = require("./routes/index");
const login_github = require("./login_github");
const login = require("./routes/login");
const session = require("express-session");
const passport = require("passport");
const loginData = require("./public/db/User_Schema");
const register = require("./routes/register");
const Project = require ('./routes/Project')
const Store = require("./routes/Store")
const app = express();

const mongoose = require("mongoose");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "zxzxczcasd",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 100000 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose
  .connect("mongodb://localhost:27017/Horenso_Manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

app.use("/login", login);
app.use("/index", indexRouter);
app.use("/login_github", login_github);
app.use('/register' , register);
app.use('/project' , Project);
app.use('/Store' , Store)
app.listen(4000, () => {
  console.log("server is running on port 4000");
});

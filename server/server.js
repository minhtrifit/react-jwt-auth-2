const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5500;

const JWT_SECRET_KEY = "minhtrideptrai";

const CLIENT_URL = "http://localhost:3000";

const user = {
  username: "user1",
  password: "123",
  id: "abc123",
  role: "user",
};

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "Server run successfully!",
    });
  } catch (error) {
    next(error);
  }
});

app.post("/login", (req, res, next) => {
  try {
    // Get username, password from client
    const username = req.body.username;
    const password = req.body.password;

    // Check account
    if (username === user.username && password === user.password) {
      const payload = {
        username: user.username,
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "60s" });

      req.session.token = token;

      //   console.log(req.session.token);

      res.status(200).json({
        message: "success",
        account: user,
        token: token,
      });
    } else {
      console.log("Username or password incorrect");
      res.status(200).json({
        message: "Username or password incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/token", (req, res, next) => {
  try {
    const token = req.session.token;

    console.log(token);
    return res.status(200).json({ token: req.session.token });
  } catch (error) {
    next(error);
  }
});

app.post("/verify", (req, res, next) => {
  try {
    // Get token from express session
    // const token = req.session.token;

    // Get token from localstorage
    const token = req.body.token;

    // console.log("Check token from server: ", token2);

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const verify = jwt.verify(token, JWT_SECRET_KEY);

      if (!verify) {
        res.status(401).json({
          message: "Unauthorized",
        });
      } else {
        res.status(200).json({
          message: "Authorized",
          user: user,
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
    next(error);
  }
});

app.post("/logout", (req, res, next) => {
  try {
    req.session.destroy((err) => {
      return res.status(200).json({ message: "Log out successfully" });
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, function (error) {
  console.log(`Server is running at: http://localhost:${port}`);
});

var cookieParser = require("cookie-parser");
var session = requite("express-session");
var morgan = requite("morgan");
var User = require("./models/user");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

var app = express();
app.set("port", 3001);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somesecret",
    resave: false,
    saveUninitalized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout",
  })
);
app.set("view engine", "hbs");

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookies("user_sid");
  }
  next();
});

var hbsContent = {
  userName: "",
  loggedin: false,
  title: "You are not logged in today",
  body: "Hello World",
};

//middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

// route for Home-Page
app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

// route for signup page
app
  .route("/signup")
  .get((req, res) => {
    //res.sendFile(__dirname + '/public/signup.html');
    res.render("signup", hbsContent);
  })
  .post((req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((user) => {
        req.session.user = user.dataValues;
        res.redirect("/dashboard");
      })
      .catch((error) => {
        res.redirect("/signup");
      });
  });

//route for user login
app
  .route("/login")
  .get((req, res) => {
    //res.sendFile(__dirname + '/public/login.html);
    res.render("login", hbsContent);
  })
  .post((req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        res.redirect("/login");
      } else if (!user.validPassword(password)) {
        res.redirect("/login");
      } else {
        req.session.user = user.dataValues;
        res.redirect("/dashboard");
      }
    });
  });

//route for user's dashboard
app.et("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    hbsContent.loggedin = true;
    hbsContent.userName = req.session.user.username;
    hbsContent.title = "You are logged in";
    //res.sendFile(__dirname + '/public/dashboard.html');
    res.render("index", hbsContent);
  } else {
    res.redirect("/login");
  }
});

//route for user logout
app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    hbsContent.loggedin = false;
    hbsContent.title = "You are logged out!";
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(app.get("port"), () =>
  console.log(`App started on port ${app.get("port")}`)
);

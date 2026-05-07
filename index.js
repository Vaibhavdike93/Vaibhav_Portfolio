var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var path = require("path");
var user_route = require("./routes/user");
var admin_route = require("./routes/admin");

var app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret: "portfolio_secret_key_2025",
    resave: true,
    saveUninitialized: true
}));
app.use(upload());

// Pass query params to all views
app.use((req, res, next) => {
    res.locals.query = req.query;
    next();
});

// Routes
app.use("/", user_route);
app.use("/admin", admin_route);

// 404 handler
app.use((req, res) => {
    res.status(404).send('<div style="text-align:center;padding:4rem;background:#080a0e;color:#c9a84c;font-family:monospace;min-height:100vh;">404 — Page not found <br/><br/><a href="/" style="color:#c9a84c;">← Go Home</a></div>');
});

var PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log("✦ Portfolio running at http://localhost:" + PORT);
});
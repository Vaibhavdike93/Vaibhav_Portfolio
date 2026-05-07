var express = require("express");
var router = express.Router();
var exe = require("../conn");

// Home / Portfolio page
router.get("/", async (req, res) => {
    try {
        var profile = await exe("SELECT * FROM profile ORDER BY id DESC LIMIT 1");
        var skills = await exe("SELECT * FROM skills ORDER BY id ASC");
        var projects = await exe("SELECT * FROM projects ORDER BY id DESC");
        var education = await exe("SELECT * FROM education ORDER BY id DESC");
        res.render("user/index", { profile: profile[0] || {}, skills, projects, education });
    } catch (e) {
        console.error(e);
        res.render("user/index", { profile: {}, skills: [], projects: [], education: [] });
    }
});

// Contact form submit
router.post("/contact", async (req, res) => {
    try {
        var { name, email, message } = req.body;
        await exe("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
        res.redirect("/?msg=sent");
    } catch (e) {
        console.error(e);
        res.redirect("/?msg=error");
    }
});

module.exports = router;

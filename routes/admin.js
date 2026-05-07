var express = require("express");
var router = express.Router();
var exe = require("../conn");
var upload = require("express-fileupload");
var path = require("path");
var fs = require("fs");
 

// Middleware: check admin login
function isAdmin(req, res, next) {
    if (req.session && req.session.admin) return next();
    res.redirect("/admin/login");
}

// ---------- AUTH ----------
router.get("/login", (req, res) => {
    res.render("admin/login", { error: null });
});

router.post("/login", async (req, res) => {
    try {
        var { username, password } = req.body;
        var user = await exe("SELECT * FROM admin_users WHERE username = ?", [username]);

        if (user.length === 0) {
            return res.render("admin/login", { error: "Invalid credentials" });
        }

        // Compare plaintext password from request to password stored in DB
        if (password === user[0].password) {
            req.session.admin = true;
            res.redirect("/admin/dashboard");
        } else {
            res.render("admin/login", { error: "Invalid credentials" });
        }
    } catch (e) {
        console.error(e);
        res.render("admin/login", { error: "Login error" });
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
});

// ---------- DASHBOARD ----------
router.get("/dashboard", isAdmin, async (req, res) => {
    try {
        var profile = await exe("SELECT * FROM profile ORDER BY id DESC LIMIT 1");
        var skills = await exe("SELECT * FROM skills ORDER BY id ASC");
        var projects = await exe("SELECT * FROM projects ORDER BY id DESC");
        var education = await exe("SELECT * FROM education ORDER BY id DESC");
        var messages = await exe("SELECT * FROM messages ORDER BY id DESC LIMIT 10");
        res.render("admin/dashboard", { profile: profile[0] || {}, skills, projects, education, messages });
    } catch (e) {
        console.error(e);
        res.render("admin/dashboard", { profile: {}, skills: [], projects: [], education: [], messages: [] });
    }
});

// ---------- PROFILE ----------
router.post("/profile/save", isAdmin, async (req, res) => {
    try {
        var { name, title, bio, email, phone, github, linkedin } = req.body;
        var photo = null;
        if (req.files && req.files.photo) {
            var f = req.files.photo;
            var fname = Date.now() + path.extname(f.name);
            await f.mv("./public/" + fname);
            photo = fname;
        }
        var existing = await exe("SELECT * FROM profile LIMIT 1");
        if (existing.length > 0) {
            if (photo) {
                await exe("UPDATE profile SET name=?, title=?, bio=?, email=?, phone=?, github=?, linkedin=?, photo=? WHERE id=?",
                    [name, title, bio, email, phone, github, linkedin, photo, existing[0].id]);
            } else {
                await exe("UPDATE profile SET name=?, title=?, bio=?, email=?, phone=?, github=?, linkedin=? WHERE id=?",
                    [name, title, bio, email, phone, github, linkedin, existing[0].id]);
            }
        } else {
            await exe("INSERT INTO profile (name, title, bio, email, phone, github, linkedin, photo) VALUES (?,?,?,?,?,?,?,?)",
                [name, title, bio, email, phone, github, linkedin, photo]);
        }
        res.redirect("/admin/dashboard?tab=profile&success=1");
    } catch (e) {
        console.error(e);
        res.redirect("/admin/dashboard?tab=profile&error=1");
    }
});

// ---------- SKILLS ----------
router.post("/skill/add", isAdmin, async (req, res) => {
    try {
        var { name, level, category } = req.body;
        var icon = null;
        if (req.files && req.files.icon) {
            var f = req.files.icon;
            var fname = Date.now() + path.extname(f.name);
            await f.mv("./public/" + fname);
            icon = fname;
        }
        await exe("INSERT INTO skills (name, level, category, icon) VALUES (?,?,?,?)", [name, level || 80, category || "Other", icon]);
        res.redirect("/admin/dashboard?tab=skills&success=1");
    } catch (e) {
        console.error(e);
        res.redirect("/admin/dashboard?tab=skills&error=1");
    }
});

router.post("/skill/delete/:id", isAdmin, async (req, res) => {
    await exe("DELETE FROM skills WHERE id=?", [req.params.id]);
    res.redirect("/admin/dashboard?tab=skills");
});

// ---------- PROJECTS ----------
router.post("/project/add", isAdmin, async (req, res) => {
    try {
        var { title, description, tech, github_url, live_url } = req.body;
        var image = null;
        if (req.files && req.files.image) {
            var f = req.files.image;
            var fname = Date.now() + path.extname(f.name);
            await f.mv("./public/" + fname);
            image = fname;
        }
        await exe("INSERT INTO projects (title, description, tech, github_url, live_url, image) VALUES (?,?,?,?,?,?)",
            [title, description, tech, github_url, live_url, image]);
        res.redirect("/admin/dashboard?tab=projects&success=1");
    } catch (e) {
        console.error(e);
        res.redirect("/admin/dashboard?tab=projects&error=1");
    }
});

router.post("/project/delete/:id", isAdmin, async (req, res) => {
    await exe("DELETE FROM projects WHERE id=?", [req.params.id]);
    res.redirect("/admin/dashboard?tab=projects");
});

// ---------- EDUCATION ----------
router.post("/education/add", isAdmin, async (req, res) => {
    try {
        var { degree, institution, year, grade } = req.body;
        await exe("INSERT INTO education (degree, institution, year, grade) VALUES (?,?,?,?)",
            [degree, institution, year, grade]);
        res.redirect("/admin/dashboard?tab=education&success=1");
    } catch (e) {
        res.redirect("/admin/dashboard?tab=education&error=1");
    }
});

router.post("/education/delete/:id", isAdmin, async (req, res) => {
    await exe("DELETE FROM education WHERE id=?", [req.params.id]);
    res.redirect("/admin/dashboard?tab=education");
});

// ---------- MESSAGES ----------
router.post("/message/delete/:id", isAdmin, async (req, res) => {
    await exe("DELETE FROM messages WHERE id=?", [req.params.id]);
    res.redirect("/admin/dashboard?tab=messages");
});

module.exports = router;

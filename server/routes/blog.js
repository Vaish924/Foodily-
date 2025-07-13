const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2 MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Only image files are allowed (jpg, png, gif)");
        }
    }
});


// GET blogs
router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blog", { blogs, title: "Blogs" });
});

// POST blog
router.post("/add", (req, res) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Upload error: " + err);
        }

        try {
            const { title, content } = req.body;
            let image = "";

            if (req.file) {
                image = req.file.filename;
            }

            await Blog.create({ title, content, image });
            res.redirect("/blog");
        } catch (dbErr) {
            console.error(dbErr);
            res.status(500).send("Database error: " + dbErr);
        }
    });
});


module.exports = router;

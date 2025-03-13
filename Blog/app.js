// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const Blog = require("./models/Blog");
require("dotenv").config({ path: "config/.env" });

// Constants
const app = express();
const PORT = process.env.PORT || 3000;
const admin = { username: "admin", password: "password" };

// Express configuration
app.set("view engine", "pug");

// Middleware
app.use(express.static("public"));  // Static files (CSS, JS, images)
app.use(express.urlencoded({ extended: true }));  // URL encoding for form submissions
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // In production, set to true with HTTPS
  })
);

// Blog routes
app.get("/", async (req, res) => {
  const projection = { _id: 1, title: 1, body: 1, author: 1, date: 1 };
  const blogs = await Blog.find({}, projection).sort({ date: -1 });

  const context = { blogs };
  if (req.session.user) {
    context.user = req.session.user;
  }

  res.render("index", context);
});

app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (blog) {
    // Sorting comments and replies
    blog.comments.sort((a, b) => b.date - a.date);
    blog.comments.forEach((comment) => {
      comment.replies.sort((a, b) => b.date - a.date);
    });

    res.render("blog", { blog });
  } else {
    res.redirect("/");
  }
});

app.get("/create", (req, res) => {
  if (req.session.user) {
    res.render("post");
  } else {
    res.redirect("/");
  }
});

app.post("/create", async (req, res) => {
  const author = req.session.user.charAt(0).toUpperCase() + req.session.user.slice(1);
  const blog = { title: req.body.title, body: req.body.body, author };

  await Blog.create(blog);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (blog) {
      res.render("edit", { blog });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  const { id, title, body } = req.body;
  await Blog.updateOne({ _id: id }, { $set: { title, body } });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    await Blog.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

// Authentication routes
app.get("/login", (req, res) => res.render("log-in"));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (admin.username === username && admin.password === password) {
    req.session.user = admin.username;
    res.redirect("/");
  } else {
    res.render("log-in", { message: "Invalid credentials" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Catch-all route
app.use((req, res) => {
  res.redirect("/");
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

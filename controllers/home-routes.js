const router = require("express").Router();
const sequelize = require("");
const { Post, User, Comment } = require("../models");

// TODO: get all posts
router.get("/", async (req, res) => {
  try {
    // Retrive all post from db
    const dbPostData = await Post.findAll({
      include: [User],
    });
    // Serialize data retrieved
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Respond with template to render along with data retrieved
    res.render("homepage", { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: get single post
router.get("/post/:id", async (req, res) => {
  res.send(
    `Render single-posts view along with post id ${req.params.id} retrieved from the db.`
  );
});

// TODO: login
router.get("/", async (req, res) => {
  res.send("Render login view.");
});

// TODO: signup
router.get("/", async (req, res) => {
  res.send("Render signup view.");
});

module.exports = router;

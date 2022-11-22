const router = require("express").Router();
const { User } = require("../../models");

// login user ('/api/user/login)
router.post("/login", async (req, res) => {
  console.log("*******", req.body);
  try {
    // Retrive user from db based on username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // Exit if no user found
    if (!userData) {
      return res.status(400).json("Invalid credentials.");
    }

    // Check password
    const pwValidated = await userData.checkPassword(req.body.password);
    if (!pwValidated) {
      return res.status(400).json("Invalid credentials.");
    }

    // Create session and send response back
    req.session.save(() => {
      // declare session variables
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      // send response to client
      res.status(200).json("You are now logged in.");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

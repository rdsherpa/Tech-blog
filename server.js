const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up session
const sess = {
  secret: "Super secret secret",
  cookie: {
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  },
};

app.use(session(sess));

const helpers = require("./utils/helpers");

// Set Handlebars as the default template engine
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up body & url parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static middleware
app.use(express.static(path.join(__dirname, "public")));

// Set up route middleware

app.get("/", (req, res) => {
  // res.send("Testing ")   // --> This works
  res.render("homepage"); // --> render() doesnt work
});

app.use(routes);
//Sync with db, then start server

sequelize.sync({ force: false }).then(() => {
  console.log("connected to Databse");
  app.listen(PORT, () => {
    console.log(`Server listenng on port ${PORT}`);
  });
});

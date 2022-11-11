const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const image = require("../API/models/Image");
const expressSession = require("express-session"),
  flash = require("connect-flash");

router.use(expressSession({
  secret:"secret",
  cookie: {
    maxAge: 40000000000000000000000
  },
  resave: false,
  saveUninitialized: false
}))

router.use(flash())

router.get("/", (req, res) => {
  // TODO: render actual rekenweb page (user is logged in)
  console.log("Test");
  return res.status(200).render("folder", { user: req.auth, title: "folder" });
});

router.post("/:id", (req, res) => {
  const id = req.params.id; //get the id of the text
  //find the model in the database and delete it
  image.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }
    req.flash('image', 'Image succesfully deleted!')
    res.redirect("/folder/" + req.body.page);
  });
});

router.get("/buildings", (req, res) => {
  //building folder and find all the images
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("buildings", {
        items: items,
        user: req.auth,
        title: "buildings folder",
        errMsg: req.flash('image')
      });
    }
  });
});

router.get("/items", (req, res) => {
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("items", {
        items: items,
        user: req.auth,
        title: "items folder",
        errMsg: req.flash('image')
      });
    }
  });
});

router.get("/vehicles", (req, res) => {
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("vehicles", {
        items: items,
        user: req.auth,
        title: "vehicles folder",
        errMsg: req.flash('image')
      });
    }
  });
});

router.get("/weapons", (req, res) => {
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("weapons", {
        items: items,
        user: req.auth,
        title: "weapons folder",
        errMsg: req.flash('image')
      });
    }
  });
});

module.exports = router;

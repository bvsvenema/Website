const express = require("express");
const router = express.Router();
const multer = require("multer");
router.use(express.urlencoded({ extended: true }));
const image = require("../API/models/Image");
var fs = require("fs");
const path = require("path");
const sanitize = require("mongo-sanitize");
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

const { debug } = require("console");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });

router.use(flash())

router.get("/create", (req, res) => {
  res.render("uploadPicture", {
    items: items,
    user: req.auth,
    title: "Upload",
  });
});

router.get("/", (req, res) => {
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("uploadPicture", {
        errMsg: req.flash('image'),
        items: items,
        user: req.auth,
        title: "pictures",
      });
    }
  });
});

router.post("/edit/:id", upload.single("image"), async (req, res, next) => {
  const id = req.params.id;
  const { folder } = sanitize(req.body);
  console.log(folder);
  if(req.file == null){
    console.log("text")
    try{
      const res = await image.findOneAndUpdate({_id:id}, {name: req.body.name,folder: req.body.folder})
      console.log(res.name + " " + res.folder + " " + res._id);
  }
  catch(err){
    console.log(err);
  }
  req.flash('imageView', 'ImageText succesfully to upload!');
  res.redirect("/view/" + req.params.id);
  }else{
    console.log("edit picture")
    try{
      const res = await image.findOneAndUpdate({_id:id}, {name: req.body.name,folder: req.body.folder, img: {data: fs.readFileSync(
      path.join(__dirname, "../uploads/" + req.file.filename )
    ),
      contentType: "image/png",
    }, })
      console.log(res.name + " " + res.folder + " " + res._id);
  }
  catch(err){
    req.flash('imageView', 'Image and text failed to upload!')
    res.redirect("/view/" + req.params.id)
    console.log(err);
  }
  req.flash('imageView', 'ImageText succesfully upload!');
  res.redirect("/view/" + req.params.id);
  }
})

router.post("/upload", upload.single("image"), async (req, res, next) => {
  //const userid = await user.findById({_id : userid});
  //console.log(userid);'
  console.log(req.file.filename)
  const { folder } = sanitize(req.body);
  var obj = {
    name: req.body.name,
    userId: req.auth.userId,
    folder: req.body.folder,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads/" + req.file.filename )
      ),
      contentType: "image/png",
    },
  };
  image.create(obj, (err, items) => {
    if (err) {
      console.log("Test")
      console.log(err);
      req.flash('image', 'Image failed to upload!')
      res.redirect("/picture")
    } else {
      console.log(obj);
      items.save();
      req.flash('image', 'Image succesfully uploaded!')
      res.redirect("/picture")
    }
  });
});

module.exports = router;

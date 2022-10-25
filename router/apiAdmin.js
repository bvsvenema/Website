const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const sanitize = require("mongo-sanitize");
const model = require("../API/models/user");
const bcrypt = require("bcryptjs");
const user = require("../API/models/user");
const Api = require("./api");

router.use(async (req, res, next) => {
  if (!req.auth || req.admin <= 2)
    return res.status(401).render("login", { errMsg: "Unauthorized!" });
  else next();
});


router.route("/user/:action").post((req, res) => {
  switch (req.params.action) {
    case "register":
      userRegister(req, res);
      break;
    default:
      res.sendStatus(419);
      break;
  }
});


module.exports = router;
async function userDelete(req,res){
  const id = req.params.id;//get the id of the text
  //find the model in the database and delete it
  user.findByIdAndRemove(id, (err) =>{
      if(err){
          console.log(err)
          return res.json({ success: false });
      }
      res.redirect('/admin');
  })
}
// Functions
async function userRegister(req, res) {
  //check if all things has been filled in


  const { userMail, password, firstName, lastName, admin } = sanitize(req.body);
  if (!(userMail && password && firstName && lastName && !(isNaN(admin)))) {
      console.log('Test 1')
      return  user.find().sort({CreatedAt: -1 })
      .then((result) =>{ res.status(400).render('admin', {user: result, admin: req.auth.admin, errMsg: "Incomplete request!" })
  }).catch((err)=>{
      console.log(err);
  });
  }

  //check if 
  //check if user already exist
  const email = `${userMail}`;
  const oldUser = await user.findOne({ email: email });
  if (oldUser) return user.find().sort({CreatedAt: -1 })
  .then((result) =>{ res.status(400).render('admin', {user: result, admin: req.auth.admin, errMsg: "User already exist" })
  }).catch((err)=>{
      console.log(err);
  });

  //create the model
  const fullName = `${firstName} ${lastName}`;
  const passHash = bcrypt.hashSync(password, 10);
  model.create({
      firstName, lastName, fullName,
      admin, email, passHash
  });

  user.find().sort({CreatedAt: -1 })
  .then((result) =>{
      res.render('admin', {admin: result, user: req.auth, title: "Admin", errMsg: "User succesfully registered!" })
  }).catch((err)=>{
      console.log(err);
  });
}
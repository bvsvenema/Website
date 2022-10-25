const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const User = require("../API/models/user");

router.get("/admin", async (req, res) => {
  if (!req.auth) return res.status(401).render("login", { title: "login" });
  // TODO: handle authentication (move to apiAuth)
  //res.status(200).render('admin', {title: 'Admin'});
  console.log(req.auth.admin);
  if (req.auth.admin <= 1) return res.status(400).redirect("/");
  User.find()
    .sort({ CreatedAt: -1 })
    .then((result) => {
      res.render("admin", {
        admin: result,
        user: req.auth,
        title: "Admin"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/admin/:id', (req, res) =>{
  const id = req.params.id;//get the id of the text
  //find the model in the database and delete it
  User.findByIdAndRemove(id, (err) =>{
      if(err){
          console.log(err)
          return res.json({ success: false });
      }
      res.redirect('/admin');
  })

})

router.get("/", async (req, res) => {
  // Verify user is logged in using req.auth
  if (!req.auth) return res.status(401).render("login", { title: "login" });
  console.log("test");
  // TODO: render actual rekenweb page (user is logged in)
  return res.status(200).render("index", { user: req.auth, title: "Home" });
});

module.exports = router;

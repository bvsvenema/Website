const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const Image = require("../API/models/Image");
const itemsBig = require("../API/models/informationBig");
const itemsSmall = require("../API/models/informationSmall");

//picture page
router.get("/:id", (req, res) => {
  const id = req.params.id;
  //find the 3 models (images and information)
  Image.findById(id)
    .then((result) => {
      itemsBig.find().sort({ CreatedAt: -1 }).then((itemsBig) => {
          itemsSmall.find().sort({ CreatedAt: -1 }).then((itemsSmall) => {
              //render picturedetail and send all this information with
              res.render("pictureDetail", {
                itemsSmall: itemsSmall,
                itemsBig: itemsBig,
                image: result,
                picture: id,
                user: req.auth,
                title: "Details",
              });
            }).catch((err) => {console.log(err); });
        }).catch((err) => { console.log(err);});
    }).catch((err) => {console.log(err);});
});

//create the big information blocks
router.post("/uploadBig", (req, res) => {
  const id = req.params.id; //set the id from the page
  //create the image
  itemsBig
    .findById(id)
    .then((result) => {
      //set the image in een obj
      var obj = {
        title: req.body.Title,
        bigInformation: req.body.bigInformationText,
        userId: req.auth.userId,
        imageId: req.body.imageId,
      };
      //all the thing of the obj set to the model
      itemsBig.create(obj, (err, items) => {
        if (err) {
          console.log(err);
        } else {
          //upload the model
          items.save();
          res.redirect("/view/" + req.body.imageId);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//create the small information blocks
router.post("/uploadSmall", (req, res) => {
  const id = req.params.id; //set the id from the page
  //create the image
  itemsSmall
    .findById(id)
    .then((result) => {
      //set the image in een obj
      var obj = {
        title: req.body.Title,
        smallInformation: req.body.smallInformation,
        userId: req.auth.userId,
        imageId: req.body.imageId,
      };
      //all the thing of the obj set to the model
      itemsSmall.create(obj, (err, items) => {
        if (err) {
          console.log(err);
        } else {
          items.save(); //upload the model
          res.redirect("/view/" + req.body.imageId);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/editSmall/:id", (req, res) => {
  const id = req.params.id; //get the id of the text

  itemsSmall.findByIdAndUpdate(id, {title: req.body.Title, smallInformation: req.body.smallInformation}, function(err, docs){
    if(err){
      console.log(err);
    }else{
      res.redirect("/view/" + req.body.imageId);
      console.log("update text: ", docs)
    }
  })
})

router.post("/editBig/:id", (req, res) => {
  console.log('Test');
  const id = req.params.id; //get the id of the text

  itemsBig.findByIdAndUpdate(id, {title: req.body.Title, bigInformation: req.body.bigInformationText}, function(err, docs){
    if(err){
      console.log(err);
    }else{
      res.redirect("/view/" + req.body.imageId);
      console.log("update text: ", docs)
    }
  })
})


router.post("/deleteSmall/:id", (req, res) => {
  const id = req.params.id; //get the id of the text
  //find the model in the database and delete it
  itemsSmall.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }
    res.redirect("/view/" + req.body.imageId);
  });
});

router.post("/deleteBig/:id", (req, res) => {
  const id = req.params.id; //get the id of the text
  //find the model in the database and delete it
  itemsBig.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }
    res.redirect("/view/" + req.body.imageId);
  });
});

module.exports = router;

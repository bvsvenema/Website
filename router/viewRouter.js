const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const Image = require('../API/models/Image');
const itemsBig = require('../API/models/informationBig');
const itemsSmall = require('../API/models/informationSmall');


router.get('/:id', (req, res) =>{
    const id = req.params.id;

    Image.findById(id)
    .then(result =>{
    itemsBig.find().sort({CreatedAt: -1})
    .then((itemsBig)=>{
        itemsSmall.find().sort({CreatedAt: -1})
    .then((itemsSmall)=>{
        res.render('pictureDetail', {itemsSmall: itemsSmall, itemsBig: itemsBig, image: result,
             picture: id ,user: req.auth ,title: "Details"})
    }).catch(err =>{console.log(err);});
    }).catch(err =>{console.log(err);});
    }).catch(err =>{console.log(err);});
})

router.post('/uploadBig', (req,res) =>{
    const id = req.params.id;

    itemsBig.findById(id)
    .then(result =>{
    var obj = { 
        title: req.body.Title,
        bigInformation: req.body.bigInformationText,
        userId: req.auth.userId,
        imageId: req.body.imageId,
    }
    itemsBig.create(obj, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(obj);
            items.save();
            res.redirect('/view/' + req.body.imageId);
        }
    });
    }).catch(err =>{
    console.log(err);
    });
})

router.post('/uploadSmall', (req,res) =>{
    const id = req.params.id;

    itemsSmall.findById(id)
    .then(result =>{
    var obj = { 
        title: req.body.Title,
        smallInformation: req.body.smallInformation,
        userId: req.auth.userId,
        imageId: req.body.imageId,
    }
    itemsSmall.create(obj, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(obj);
            items.save();
            res.redirect('/view/' + req.body.imageId);
        }
    });
    }).catch(err =>{
    console.log(err);
    });
})

router.post('/deleteSmall/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);
    itemsSmall.findByIdAndRemove(id, (err) =>{
        if(err){
            console.log(err)
            return res.json({ success: false });
        }
        res.redirect('/view/' + req.body.imageId);
    })

})

router.post('/deleteBig/:id', (req, res) =>{
    const id = req.params.id;
    console.log('test12312');
    itemsBig.findByIdAndRemove(id, (err) =>{
        if(err){
            console.log(err)
            return res.json({ success: false });
        }
        res.redirect('/view/' + req.body.imageId);
    })

})

module.exports = router;
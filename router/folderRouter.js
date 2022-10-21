const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const image = require('../API/models/Image');


router.get('/', (req,res) =>{   
    // TODO: render actual rekenweb page (user is logged in)
     return res.status(200).render("folder", {user: req.auth, title: 'folder'});
});


router.get('/buildings', (req,res) =>{
    //building folder and find all the images
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('buildings', { items: items, user: req.auth ,title: 'buildings folder'});
        }
    });
});

router.get('/items', (req,res) =>{
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('items', { items: items, user: req.auth, title: 'items folder'});
        }
    });
});

router.get('/vehicles', (req,res) =>{
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('vehicles', { items: items, user: req.auth, title: 'vehicles folder'});
        }
    });
});

router.get('/weapons', (req,res) =>{
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('weapons', { items: items, user: req.auth , title: 'weapons folder'});
        }
    });
});




module.exports = router;
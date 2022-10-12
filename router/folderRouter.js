const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const image = require('../API/models/Image');


router.get('/', (req,res) =>{   
    // TODO: render actual rekenweb page (user is logged in)
     return res.status(200).render("folder", {title: 'folder'});
});

router.get('/buildings', (req,res) =>{
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('buildings', { items: items , title: 'buildings folder'});
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
            res.render('items', { items: items , title: 'items folder'});
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
            res.render('vehicles', { items: items , title: 'vehicles folder'});
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
            res.render('weapons', { items: items , title: 'weapons folder'});
        }
    });
});


module.exports = router;
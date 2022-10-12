const express = require('express');
const router = express.Router();
const multer = require("multer");
router.use(express.urlencoded({ extended: true }));
const image = require('../API/models/Image');
var fs = require('fs');
const path = require('path');

const { debug } = require('console');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/create', (req, res) => {

    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('uploadPicture', { items: items , title: 'Upload'});
        }
    });
});

router.get('/', (req,res) =>{
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('uploadPicture', { items: items , title: 'pictures'});
        }
    });
});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    //const userid = await user.findById({_id : userid});
    //console.log(userid);'
    var obj = { 
        name: req.body.name,
        userId: req.auth.userId,
        img: {
            data: fs.readFileSync(path.join(__dirname,  '../uploads/' + req.file.filename)),
            contentType: 'image/png',
        }
    }
    image.create(obj, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            
            items.save();
            res.redirect('/');
        }
    });
});

module.exports = router;
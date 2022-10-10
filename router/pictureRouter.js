const express = require('express');
const router = express.Router();
const multer = require("multer");
router.use(express.urlencoded({ extended: true }));
const Image = require('../API/models/Image');
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

router.get('/', (req, res) => {

    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('uploadPicture', { items: items });
        }
    });
});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    //const userid = await user.findById({_id : userid});
    //console.log(userid);'
    var user = req.user;
    console.log(user);
    var obj = { 
        name: req.body.name,
        userId: user,
        img: {
            data: fs.readFileSync(path.join(__dirname,  '../uploads/' + req.file.filename)),
            contentType: 'image/png',
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            
            item.save();
            res.redirect('/', {user: user});
        }
    });
});

module.exports = router;
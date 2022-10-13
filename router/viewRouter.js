const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const Image = require('../API/models/Image');


router.get('/:id', (req, res) =>{
    const id = req.params.id;
    console.log('romig')

    Image.findById(id)
    .then(result =>{
        res.render('pictureDetail', {image: result, title: 'bonkus'})
        console.log('test')
    }).catch(err =>{
        console.log(err);
    });
})

module.exports = router;
const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const User = require('../API/models/user');

router.get('/admin', async (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'})
    // TODO: handle authentication (move to apiAuth)
    //res.status(200).render('admin', {title: 'Admin'});

    User.find().sort({CreatedAt: -1 })
    .then((result) =>{
        res.render('admin', {user: result, title: 'All blogs'})
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/', async (req, res) => {
    // Verify user is logged in using req.auth
    if (!req.auth) return res.status(401).render('login', {title: 'login'});

    // TODO: render actual rekenweb page (user is logged in)
    res.status(200).send("Hello world!");
});

module.exports = router;
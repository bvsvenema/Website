const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const User = require('../API/models/user');

router.get('/admin', async (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'})
    // TODO: handle authentication (move to apiAuth)
    //res.status(200).render('admin', {title: 'Admin'});
    console.log(req.auth.admin);
    if(req.auth.admin <= 1) return res.status(400).redirect('/')
    User.find().sort({CreatedAt: -1 })
    .then((result) =>{
        res.render('admin', {user: result, user: req.auth , title: 'All blogs'})
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/', async (req, res) => {
    // Verify user is logged in using req.auth
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    console.log('test');
    // TODO: render actual rekenweb page (user is logged in)
     return res.status(200).render("index", {user: req.auth, title: 'Home'});
});


module.exports = router;
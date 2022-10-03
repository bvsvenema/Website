const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const model = require('../API/models/user');

router.get('/admin', async (req, res) => {
    // TODO: handle authentication (move to apiAuth)
    res.status(200).render('admin', {title: 'Admin'});
});

router.get('/', async (req, res) => {
    // Verify user is logged in using req.auth
    if (!req.auth) return res.status(401).render('login', {title: 'login'});

    // TODO: render actual rekenweb page (user is logged in)
    res.status(200).send("Hello world!");
});

module.exports = router;
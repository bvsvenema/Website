const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../API/models/user');
const sanitize = require('mongo-sanitize');
const cookieOptions = {
    strict: {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    },
    lax: {
       httpOnly: false,
        secure: false,
        sameSite: "Lax"
    }
}

router.route('/login')
    .post(async (req, res) => {
        console.log('test')
        const { userMail, password } = sanitize(req.body);
        if (!(userMail && password)){
            console.log('Test 1')
            return res.status(400).render('login', { errMsg: "Incomplete request!" });
        }

        // Verify email and password
        const user = await model.findOne({ email: `${userMail}` });
        if (user && (await bcrypt.compare(password, user.passHash))) {
            // Sign new token for this user
            console.log('Test 2')
            const token = jwt.sign({ userId: user._id, admin: user.admin }, 'blubblub', { expiresIn: '24h' });

            // Store token in strict cookie
            res.cookie('token', token, cookieOptions.strict);
            console.log('Test 3')
            // Redirect user to root, where the token will be verified
            res.status(200).redirect('/');
        } if (!user) {
            console.log('Test 4')
            return res.status(400).render('login', { errMsg: "User not found!" });
        } else {
            console.log('Test 5')
            return res.status(400).render('login', { errMsg: "Invalid password!" });
        }
    });

module.exports = router;
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
        if (!(userMail && password))
            return res.status(400).render('login', { errMsg: "Incomplete request!" });

        // Verify email and password
        const user = await model.findOne({ email: `${userMail}` });
        if (user && (await bcrypt.compare(password, user.passHash))) {
            // Sign new token for this user
            const token = jwt.sign({ userId: user._id, admin: user.admin }, "secret_this_should_be_longer", { expiresIn: "12h" });

            // Store token in strict cookie
            res.cookie('token', token, cookieOptions.strict);

            // Redirect user to root, where the token will be verified
            res.status(200).redirect('/blogs');
        } if (!user) {
            return res.status(400).render('login', { errMsg: "User not found!" });
        } else {
            return res.status(400).render('login', { errMsg: "Invalid password!" });
        }
    });

module.exports = router;
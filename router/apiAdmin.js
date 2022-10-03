const express = require('express');
const router = express.Router();

const sanitize = require('mongo-sanitize');
const model = require('../API/models/user');
const bcrypt = require('bcryptjs');

/*router.use(async (req, res, next) => {
    const domains = await model.Domain.find();
    if (!req.auth) return res.status(401).render('login', { domains: domains, errMsg: "Unauthorized!" });
    else next();
});*/

router.route('/user/:action')
    .post((req, res) => {
        switch (req.params.action) {
            case "register":
                console.log('Test');
                userRegister(req, res);
                break;
            default:
                console.log('Test');
                res.sendStatus(419);
                break;

        }
    });


module.exports = router;

// Functions
async function userRegister(req, res) {

    const { userMail, password, firstName, lastName, admin } = sanitize(req.body);
    if (!(userMail && password && firstName && lastName && !(isNaN(admin)))) {
        return res.status(400).render('admin', { errMsg: "Incomplete request!" });
    }
    const email = `${userMail}`;

    const fullName = `${firstName} ${lastName}`;
    const passHash = bcrypt.hashSync(password, 10);
    model.create({
        firstName, lastName, fullName,
        admin, email, passHash
    });

    return res.status(200).render('admin', { errMsg: "User succesfully registered!" });
}
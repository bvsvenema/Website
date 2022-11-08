const requestLogger = require('./custom_modules/requestLogger');

const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
//express app
const app = express();
var flash = require('connect-flash');

//connect to mongodb
const dbURI = 'mongodb+srv://Bvsvenema:bCyOWJX9siLU7lcs@website.lqtups4.mongodb.net/Test?retryWrites=true&w=majority' 
mongoose.connect(dbURI).then((result) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));

app.use(requestLogger);

//app use middleware

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+ '/public'));

const apiAdminRouter = require('./router/apiAdmin.js');
const apiRouter = require('./router/api.js');
const publicRouter = require('./router/public.js');
const pictureRouter = require('./router/pictureRouter.js');
const folderRouter = require('./router/folderRouter.js');
const viewRouter = require('./router/viewRouter.js')


const jwtOptions = {
      secure: {
        secret: 'blubblub' ,
        getToken: (req) => {
            return req.cookies['token'];
        },
        credentialsRequired: true,
        algorithms: ["HS256"]
    },
    lax: {
        secret: 'blubblub' ,
        credentialsRequired: false,
        getToken: (req) => {
            return req.cookies['token'];
        },
        algorithms: ["HS256"]
    }
}

app.use('/api/admin', jwt(jwtOptions.secure) ,apiAdminRouter);

app.use('/api', jwt(jwtOptions.lax), apiRouter);

app.use('/', jwt(jwtOptions.lax), publicRouter);

app.use('/folder', jwt(jwtOptions.secure),  folderRouter);

app.use('/view', jwt(jwtOptions.secure), viewRouter)

app.use('/picture', jwt(jwtOptions.secure), pictureRouter);

app.use(flash());
//when the token is expired delete the token and send back to the login page
app.use((err, req, res, next) => {  if (err.name === 'UnauthorizedError') { 
    res.clearCookie('token');
    return res.status(400).redirect('/');
}})
 
  // 404 page
app.use((req, res) => {
    res.status(404).render('404');
});



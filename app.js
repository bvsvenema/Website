const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Bvsvenema:bCyOWJX9siLU7lcs@website.lqtups4.mongodb.net/Test?retryWrites=true&w=majority' 
mongoose.connect(dbURI).then((result) => app.listen(3000))
.catch((err) => console.log(err));
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'))

const blogRoutes = require('./router/blogRouter')
const apiAdminRouter = require('./router/apiAdmin.js');
const apiRouter = require('./router/api.js');
const publicRouter = require('./router/public.js');

/*app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/login', (req, res) =>{
    res.render('login', {title: 'Login'});
});

app.get('/admin', (req, res) =>{
    res.render('admin', {title: 'Admin'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});
*/
app.use('/blogs', blogRoutes);



const jwtOptions = {
    secure: {
        getToken: (req) => {
            return req.cookies['token'];
        },
        credentialsRequired: true,
        algorithms: ["HS256"]
    },
    lax: {
        getToken: (req) => {
            return req.cookies['token'];
        },
        credentialsRequired: false,
        algorithms: ["HS256"]
    }
}

app.use('/api/admin', jwt(jwtOptions.secure), apiAdminRouter);

app.use('/api', jwt(jwtOptions.secure), apiRouter);

app.use('/', jwt(jwtOptions.secure), publicRouter);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

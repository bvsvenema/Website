const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Bvsvenema:bCyOWJX9siLU7lcs@website.lqtups4.mongodb.net/Test?retryWrites=true&w=majority' 
mongoose.connect(dbURI).then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use('/blogs', blogRoutes);

  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404');
});
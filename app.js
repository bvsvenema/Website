const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
const { render } = require('ejs');


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

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});


app.get('/blogs', (req, res) =>{
    Blog.find().sort({CreatedAt: -1 })
    .then((result) =>{
        res.render('index', {blogs: result})
    }).catch((err)=>{
        console.log(err);
    });
});

app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body)

    blog.save()
    .then((result) =>{
        res.redirect('/blogs')
    })
    .catch((err) =>{
        console.log(err);
    });
});

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details', {blog: result})
    }).catch(err =>{
        console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect: '/blogs'})
    })
    .catch(err=>{
        console.log(err);
    })
})
  
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404');
});
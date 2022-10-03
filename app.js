const express = require('express');
const morgan = require('morgan');

//express app
const app = express();


app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.get('/blogs/create', (req, res) => {
    res.render('create');
  });
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404');
  });
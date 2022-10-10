// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../API/models/blog');

const blog_index = (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    Blog.find().sort({CreatedAt: -1 })
    .then((result) =>{
        res.render('index', {blogs: result, title: 'All blogs'})
    }).catch((err)=>{
        console.log(err);
    });
}

const blog_details = (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details', {blog: result, title: 'Blog Details'})
    }).catch(err =>{
        console.log(err);
    });
}

const blog_create_get = (req , res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    res.render('create', {title: "Create a new blog"});
}

const blog_create_post = (req , res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    const blog = new Blog(req.body)

    blog.save()
    .then((result) =>{
        res.redirect('/')
    })
    .catch((err) =>{
        console.log(err);
    });
}

const blog_delete = (req, res) =>{
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
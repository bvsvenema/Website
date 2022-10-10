// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Picture = require('../API/models/picture');

/*const picture_index = (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    Blog.find().sort({CreatedAt: -1 })
    .then((result) =>{
        res.render('index', {blogs: result, title: 'All blogs'})
    }).catch((err)=>{
        console.log(err);
    });
}

const picture_details = (req, res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details', {blog: result, title: 'Blog Details'})
    }).catch(err =>{
        console.log(err);
    });
}*/

const picture_create_get = (req , res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    res.render('pictureUpload', {title: "Create a new blog"});
}

const picture_create_post = (req , res) => {
    if (!req.auth) return res.status(401).render('login', {title: 'login'});
    const picture = new Picture(req.body)

    picture.save()
    .then((result) =>{
        res.redirect('/')
    })
    .catch((err) =>{
        console.log(err);
    });
}



module.exports = {
    picture_create_post,
    picture_create_get
}
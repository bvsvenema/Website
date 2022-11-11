const mongoose = require('mongoose');

module.export.connect = () => {
    const dbURI = 'mongodb+srv://Bvsvenema:bCyOWJX9siLU7lcs@website.lqtups4.mongodb.net/Test?retryWrites=true&w=majority' 
    mongoose.connect(dbURI).then((result))
    .catch((err) => console.log(err));
}
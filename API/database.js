const mongoose = require('mongoose');

exports.connect = () => {
    const dbURI = 'mongodb+srv://Bvsvenema:bCyOWJX9siLU7lcs@website.lqtups4.mongodb.net/Test?retryWrites=true&w=majority' 
    mongoose.connect(dbURI).then(() => {
        console.log(`Connected to database on `);
    }).catch((err) => {
        console.log(`Failed to connect to database on`);
        console.error(err);
        process.exit(1);
    });
}
const mongoose = require('mongoose');
const { MONGO_URI, MONGO_DB, MONGO_USER, MONGO_PASSWORD } = process.env;

exports.connect = () => {
    const dbURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority` 
    mongoose.connect(dbURI).then(() => {
        console.log(`Connected to database on `);
    }).catch((err) => {
        console.log(`Failed to connect to database on`);
        console.error(err);
        process.exit(1);
    });
}
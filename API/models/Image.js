var mongoose = require('mongoose');
const userSchema = require('./user.js')
  
var imageSchema = new mongoose.Schema({
    name: String,
    userId: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);
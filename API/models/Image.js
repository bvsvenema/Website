var mongoose = require('mongoose');
const userSchema = require('./user.js')
  
var imageSchema = new mongoose.Schema({
    name: String,
    userId: mongoose.Types.ObjectId,
    folder: { type: Number, default: 0}, // 0 = Buidlings, 1 = Items, 2 = Vehicles IT, 3 = Weapons
    img:
    {
        data: Buffer,
        contentType: String
    },
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);
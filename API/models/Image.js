var mongoose = require('mongoose');
const userSchema = require('./user.js')
  
var imageSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        require: true
    },
    folder: { type: Number, default: 0, require: true}, // 0 = Buidlings, 1 = Items, 2 = Vehicles IT, 3 = Weapons
    img:
    {
        data: Buffer,
        contentType: String,
    },
    createdAt: { type: Date, default: Date.now, require: true}
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);
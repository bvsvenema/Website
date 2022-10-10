const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picuteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    img:
    {
        data: Buffer,
        contentType: String,
        require: true
    },
    Userid:[mongoose.ObjectId]
}, {timestamps: true});

const Picture = mongoose.model('picture', picuteSchema);
module.exports = Picture;
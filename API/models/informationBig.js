const mongoose = require('mongoose');

const informationBigSchema = new mongoose.Schema({
    title:{ 
        type: String,
        require: true
    },
    bigInformation: { 
        type: String,
        require: true
    },
    userId: mongoose.Types.ObjectId,
    imageId: mongoose.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("informationBig", informationBigSchema);
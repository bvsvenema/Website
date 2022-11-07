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
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    imageId:{
        type: mongoose.Types.ObjectId,
        require: true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("informationBig", informationBigSchema);
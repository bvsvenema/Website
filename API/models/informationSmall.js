const mongoose = require('mongoose');

const informationSmallSchema = new mongoose.Schema({
    title:{ 
        type: String,
        require: true
    },
    smallInformation: { 
        type: String,
        require: true
    },
    userId: mongoose.Types.ObjectId,
    imageId: mongoose.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("informationSmall", informationSmallSchema);
const { repeat } = require('lodash');
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
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    imageId:{
        type: mongoose.Types.ObjectId,
        require: true
    },
    createdAt: { type: Date, default: Date.now, require: true}
});

module.exports = mongoose.model("informationSmall", informationSmallSchema);

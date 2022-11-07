const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    admin: { type: Number, default: 0, require: true}, // 0 = student, 1 = teacher, 2 = school IT, 3 = developer
    email: {
        type: String,
        require: true
    },
    passHash: {
        type: String,
        require: true
    },
    createdAt: { type: Date, default: Date.now, require: true }
});

module.exports = mongoose.model("user", userSchema);
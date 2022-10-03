const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    admin: { type: Number, default: 0}, // 0 = student, 1 = teacher, 2 = school IT, 3 = developer
    email: String,
    passHash: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);
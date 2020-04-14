const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: { type: String, unique: true, required: true, index: true }
});

mongoose.model('users', userSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    general:{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
    ,groups:{
        type: Array
        ,ref: "group"
    }
    , roles:{
        type: Array
        ,ref: "role"
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
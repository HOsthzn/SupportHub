const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    }
});

const UserRole = mongoose.model("UserRole", UserRoleSchema);

module.exports = UserRole;
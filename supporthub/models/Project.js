const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
    , Code:{
        type: String,
        maxlength: 5,
    }
    , description:{
        type: String,
    }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
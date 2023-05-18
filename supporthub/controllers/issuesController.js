const Issue = require("../models/Issue");

const issuesController = {
    index: (req, res) => {

        return res.render("issues/index", {title: "Issues"})
    }
}

module.exports = issuesController;
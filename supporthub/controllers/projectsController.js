//TODO: Implement rolesController
const projectsController = {
    index: (req, res) => {
        return res.render("projects/index", {title: "Projects"})
    }
}

module.exports = projectsController;
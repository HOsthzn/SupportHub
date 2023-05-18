const Group = require('../../models/Group');

const groupsController = {
    index: (req, res) => {
        Group.find({})
            .then(groups => {
                res.render('accessManagement/groups/index', {title: "Groups", data: groups});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , details: (req, res) => {
        const {id} = req.params;
        Group.findById(id)
            .then(group => {
                res.render('accessManagement/groups/details', {title: "Group", data: group});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , create: {
        get(req, res) {
            return res.render('accessManagement/groups/create', {title: "Create Group", error: null});
        }
        , post(req, res) {
            const {name, description} = req.body;
            const group = new Group({settings: {name, description}});
            group.save()
                .then(() => {
                    return res.redirect('/accessManagement/groups/details/' + group.id);
                })
                .catch(err => {
                    console.log(err);
                    return res.render('accessManagement/groups/create', {
                        title: "Create Group",
                        error: err
                    });
                });
        }
    }
}

module.exports = groupsController;
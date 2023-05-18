const Role = require('../../models/Role');

const rolesController = {
    index: (req, res) => {
        Role.find({})
            .then(roles => {
                res.render('accessManagement/roles/index', {title: "Roles", data: roles});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , details: (req, res) => {
        const {id} = req.params;
        Role.findById(id)
            .then(role => {
                res.render('accessManagement/roles/details', {title: "Role", data: role});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , create: {
        get(req, res) {
            return res.render('accessManagement/roles/create', {title: "Create Role", error: null});
        }
        , post(req, res) {
            const {name, code, description} = req.body;
            const role = new Role({settings: {name, code, description}});
            role.save()
                .then(() => {
                    return res.redirect('/accessManagement/roles/details/' + role.id);
                })
                .catch(err => {
                    console.log(err);
                    return res.render('accessManagement/roles/create', {
                        title: "Create Role",
                        error: err
                    });
                });
        }
    }
    , update(req, res) {
        const {name, code, description} = req.body;
    }
    , updatePermissions(req, res) {
        const {id} = req.body;
        Role.findById(id)
            .then(role => {
                for (let keyGroup in role.permissions) {
                    for (let keyPermission in role.permissions[keyGroup]) {
                        role.permissions[keyGroup][keyPermission] = !!req.body[`${keyGroup}.${keyPermission}`];
                    }
                }
                role.save()
                    .then(() => {
                        return res.redirect('/accessManagement/roles/details/' + role.id);
                    })
                    .catch(err => {
                        console.log(err);
                        return res.render("error", {error: err});
                    });
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
}

module.exports = rolesController;
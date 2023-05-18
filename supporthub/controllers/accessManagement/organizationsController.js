const Organization = require('../../models/Organization');

const organizationsController = {
    index: (req, res) => {
        Organization.find({})
            .then(organizations => {
                res.render('accessManagement/organizations/index', {title: "Organizations", data: organizations});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , details: (req, res) => {
        const {id} = req.params;
        Organization.findById(id)
            .then(organization => {
                res.render('accessManagement/organizations/details', {title: "Organization", data: organization});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , create: {
        get(req, res) {
            return res.render('accessManagement/organizations/create', {title: "Create Organization", error: null});
        }
        , post(req, res) {
            const {name, description} = req.body;
            const organization = new Organization({settings: {name, description}});
            organization.save()
                .then(() => {
                    return res.redirect('/accessManagement/organizations/details/' + organization.id);
                })
                .catch(err => {
                    console.log(err);
                    return res.render('accessManagement/organizations/create', {
                        title: "Create Organization",
                        error: err
                    });
                });
        }
    }
}

module.exports = organizationsController;
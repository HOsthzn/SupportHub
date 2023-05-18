const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const Groups = require('../../models/Group');

const usersController = {
    index: (req, res) => {
        User.find({})
            .then(users => {
                res.render('accessManagement/users/index', {title: "Users", data: users});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , details: (req, res) => {
        const {id} = req.params;
        User.findById(id)
            .then(user => {
                res.render('accessManagement/users/details', {title: "User", data: user});
            })
            .catch(err => {
                console.log(err);
                return res.render("error", {error: err});
            });
    }
    , create: {
        get(req, res) {
            return res.render('accessManagement/users/create', {title: "Create User", error: null});
        }
        , post(req, res) {
            const {name, email, password} = req.body;

            const user = new User({general: {name, email, password}});

            Groups.find({"settings.name": {$in: ["All Users", "Registered Users"]}})
                .then(groups => {
                    user.groups = groups.map(group => group.id);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.general.password, salt, async (err, hash) => {
                            if (err) throw err;
                            user.general.password = hash;
                            await user.save();
                            return res.redirect('/accessManagement/users/details/' + user.id);
                        });
                    });
                });
        }
    }
}

module.exports = usersController;
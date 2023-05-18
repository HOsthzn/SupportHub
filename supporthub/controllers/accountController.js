const config = require('../appconfig');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Groups = require('../models/Group');
const jwt = require("jsonwebtoken");

const emailService = require('../services/email');

const accountController = {};

accountController.register = {
    get(req, res) {
        res.render('account/register', {title: 'Register', errors: null});
    },
    async post(req, res) {
        const {name, email, password, confirmPassword} = req.body;

        // Validate user input
        let errors = [];
        if (!name || !email || !password || !confirmPassword) {
            errors.push({msg: 'Please fill in all fields'});
        }
        if (password !== confirmPassword) {
            errors.push({msg: 'Passwords do not match'});
        }
        if (password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
        }
        if (errors.length > 0) {
            return res.render('account/register', {
                title: 'Register',
                errors,
                name,
                email,
                password,
                confirmPassword
            });
        }

        // Check if user with same email already exists
        const user = await User.findOne({"general.email": email.toLowerCase()});
        if (user) {
            errors.push({msg: 'Email already registered'});
            return res.render('account/register', {
                title: 'Register',
                errors,
                name,
                email,
                password,
                confirmPassword
            });

        }

        // Create new user
        const newUser = new User({
            general: {
                name,
                email: email.toLowerCase(),
                password
            }
        });

        Groups.find({"settings.name": {$in: ["All Users", "Registered Users"]}})
            .then(groups => {
                newUser.groups = groups.map(group => group.id);
                // Hash password before saving user
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.general.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.general.password = hash;
                        await newUser.save();
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/account/login');
                    });
                });
            });
    }
};

accountController.login = {
    get(req, res) {
        res.render('account/login.ejs', {title: 'Login', message: null});
    },
    post(req, res, next) {
        passport.authenticate('local', async (err, user, info) => {
            try {
                if (err || !user.general) {
                    req.flash('error_msg', 'Invalid credentials');
                    return res.redirect('/account/login');
                }

                req.login(user, async (error) => {
                    if (error) throw error;

                    const token = jwt.sign({sub: user.id}, config.secret);
                    res.cookie('token', token, {httpOnly: true});
                    req.flash('success_msg', 'You are now logged in');
                    return res.redirect('/');
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }
};

//deprecated use accessManagement\usersController.js
/*accountController.profile = {
    get(req, res) {
        res.render('account/profile', {title: 'Profile', errors: null});
    }
    , async post(req, res) {
        const {name, email, currentPassword, newPassword, confirmPassword} = req.body;

        let errors = [];
        if (!name || !email) {
            errors.push({msg: 'Please fill in all fields'});
        }
        if (newPassword) {
            if (newPassword !== confirmPassword) {
                errors.push({msg: 'Passwords do not match'});
            }
            if (newPassword.length < 6) {
                errors.push({msg: 'Password must be at least 6 characters'});
            }
        }
        if (errors.length > 0) {
            return res.render('account/profile', {
                title: 'Profile',
                errors,
                name,
                email
            });
        }

        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.general.password);
        if (isMatch) {
            if (name) {
                user.general.name = name;
                user.general.email = email;
            }

            if (newPassword) {
                //TODO check user password not updating
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, async (err, hash) => {
                        if (err) throw err;
                        user.general.password = hash;
                    });
                });
            }

            await user.save();
            req.flash('success_msg', 'Profile updated');
            res.redirect('/account/profile');
        } else {
            errors.push({msg: 'Current password is incorrect'});
            return res.render('account/profile', {
                title: 'Profile',
                errors,
                name,
                email
            });
        }
    }
}*/

accountController.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/account/login');
    });
};

accountController.forgotPassword = {
    get(req, res) {
        res.render('account/forgotPassword', {title: 'Forgot Password'})
    }
    , async post(req, res) {
        let {email} = req.body;
        //check if valid user with email exists
        let user = await User.findOne({"general.email": email.toLowerCase()});
        if (user.general) {
            const token = jwt.sign({sub: user.id}, config.secret);
            const message = `Please click on the following link to reset your password: ${config.baseUrl}/account/resetPassword/${token}`;
            await emailService.sendEmail(email, 'Password Reset', message);
            req.flash('success_msg', 'Email sent with password reset instructions');
            res.redirect('/account/login');
        } else {
            req.flash('error_msg', 'No account with that email address exists');
            res.redirect('/account/forgotPassword');
        }
    }
    , resetPassword: {
        get(req, res) {
            let token = req.params.token;
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    req.flash('error_msg', 'Invalid token');
                    res.redirect('/account/forgotPassword');
                } else {
                    res.render('account/resetPassword', {title: 'Reset Password', token, message: null});
                }
            });
        }
        , async post(req, res) {
            let {token, password, confirmPassword} = req.body;
            //use the token to get the valid user, and reset the password if the passwords match
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.render('account/resetPassword', {title: 'Reset Password', message: 'Invalid token', token});
                } else {
                    if (password !== confirmPassword) {
                        req.flash('error_msg', 'Passwords do not match');
                        res.render('account/resetPassword', {
                            title: 'Reset Password',
                            message: 'Passwords do not match',
                            token
                        });
                    } else {
                        let user = await User.findById(decoded.sub);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, async (err, hash) => {
                                if (err) throw err;
                                user.general.password = hash;
                                await user.save();
                                req.flash('success_msg', 'Password reset successfully. Please login with your new password');
                                res.redirect('/account/login');
                            });
                        });
                    }
                }
            });
        }
    }
}

module.exports = accountController;
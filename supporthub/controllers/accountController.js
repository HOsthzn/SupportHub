const config = require('../appconfig');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
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
        const user = await User.findOne({email: email.toLowerCase()});
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
            name,
            email: email.toLowerCase(),
            password
        });

        // Hash password before saving user
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                await newUser.save();
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/account/login');
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
                if (err || !user) {
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

accountController.profile = {
    get(req, res) {
        res.render('account/profile', {title: 'Profile'});
    }
    , async post(req, res) {

    }
}

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
        let user = await User.findOne({email: email.toLowerCase()});
        if (user) {
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
                    res.render('account/resetPassword', {title: 'Reset Password', message: 'Invalid token',token});
                } else {
                    if (password !== confirmPassword) {
                        req.flash('error_msg', 'Passwords do not match');
                        res.render('account/resetPassword',{title: 'Reset Password',message:'Passwords do not match',token});
                    } else {
                        let user = await User.findById( decoded.sub);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, async (err, hash) => {
                                if (err) throw err;
                                user.password = hash;
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

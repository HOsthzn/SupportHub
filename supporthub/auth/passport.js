//Dependencies
const config = require("../appconfig");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {Strategy: LocalStrategy} = require('passport-local');
const {ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt');

//Container & functions
const lib = {
    loginCheck: passport => {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password'
                },
                async (email, password, done) => {
                    try {
                        // Check customer
                        const user = await User.findOne({"general.email": email.toLowerCase()});
                        if (!user.general) {
                            return done(null, false, {message: 'Incorrect username/email.'});
                        }
                        bcrypt.compare(password, user.general.password, (err, res) => {
                            if (res) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: 'Incorrect password.'});
                            }
                        });
                    } catch (err) {
                        return done(err);
                    }
                }
            )
        );

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            User.findById(id)
                .then((user) => {
                    done(null, user);
                })
                .catch((error) => {
                    done(error, null);
                });
        });

        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.secret
        };

        passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
            try {
                // Find the user by ID from the payload
                const user = await User.findById(payload.sub);

                // If the user does not exist, return an error
                if (!user) {
                    return done(null, false, {message: 'Unauthorized'});
                }

                // If the user exists, return the user object
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));
    }
};

//Module export
module.exports = lib;

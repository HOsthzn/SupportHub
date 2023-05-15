const lib = {
    protectRoute: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('account/login');
    },
    allowIf: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
};

module.exports = lib;
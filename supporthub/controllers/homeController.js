const homeController = {}

homeController.index = (req, res) => {
    return res.render('home/index', {title: 'Home'});
}

module.exports = homeController;
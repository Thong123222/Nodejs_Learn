class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:tintuc
    show(req, res) {
        res.send('tin tuc!!!');
    }
}

module.exports = new NewsController;
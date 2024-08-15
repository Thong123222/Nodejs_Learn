const Course = require('../model/Courses')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    //[GET] /home
    home(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home' ,{ course: mutipleMongooseToObject(course) })
            })
            .catch((err) => {
                next(err)
            })
    }

    //[GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()

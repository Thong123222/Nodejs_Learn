const Course = require('../model/Courses')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
  //[GET] /me/store/courses
  storeCourses(req, res, next) {
    let courseQuery = Course.find({});

    if(req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
      .then(([course, deletedCount]) => 
        res.render('me/store-courses', {
          deletedCount,
          course: mutipleMongooseToObject(course),
        })
      )
      .catch(next)

    // Course.countDocumentsWithDeleted({ deleted: true }) 
    //   .then((deletedCount) => {
    //     console.log(deletedCount)
    //   })
    //   .catch(()=>{})

    // Course.find({})
    //   .then((course) =>
    //     res.render('me/store-courses', {
    //       course: mutipleMongooseToObject(course),
    //     })
    //   )
    //   .catch(next)
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted:true })
      .then((course) =>
        res.render('me/trash-courses', {
          course: mutipleMongooseToObject(course),
        })
      )
      .catch(next)
  }
}

module.exports = new MeController()

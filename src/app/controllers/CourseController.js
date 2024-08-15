const Course = require('../model/Courses')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
  //[GET] /coure
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('course/show', { course: mongooseToObject(course) })
      })
      .catch(next)
  }

  //[GET] /create
  create(req, res, next) {
    res.render('course/create')
  }

  //[POST] /create
  store(req, res, next) {
    // const formData = req.body;
    const course = new Course(req.body)
    course.save()
        .then(() => res.redirect('/me/store/course'))
  }

  //[GET] /id:/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('course/edit', {
        course: mongooseToObject(course)
      }))
      .catch(next)
  }

    //[PUT] /course/:id
    update(req, res, next) {
      Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/store/course'))
        .catch(next)
    }

    //[DELETE] /course/:id
    delete(req, res, next) {
      Course.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[DELETE] /course/:id/realDelete = Xóa thật
    realDelete(req, res, next) {
      Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[PATCH] /course/:id/restore
    restore(req, res, next) {
      Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[POST] /course/handle-form-action
    handleFormAction(req, res, next) {
      // res.json(req.body)
      switch (req.body.action) {
        case 'delete':
          Course.delete({_id: { $in: req.body.courseIds }})
            .then(() => res.redirect('back'))
            .catch(next)
          break
        case 'restore':
          Course.restore({_id: { $in: req.body.courseIds }})
            .then(() => res.redirect('back'))
            .catch(next)
          break
        case 'delete-real':
          Course.deleteOne({_id: { $in: req.body.courseIds }})
            .then(() => res.redirect('back'))
            .catch(next)
           break
        default:
          res.json({message: 'Invalid action!!!'})
      }
    }

}

module.exports = new CourseController()

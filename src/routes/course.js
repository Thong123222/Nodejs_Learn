const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.get('/create', CourseController.create)
router.post('/store', CourseController.store)
router.get('/:id/edit', CourseController.edit)
router.put('/:id', CourseController.update)
router.delete('/:id', CourseController.delete)
router.delete('/:id/real', CourseController.realDelete)
router.patch('/:id/restore', CourseController.restore)
router.get('/:slug', CourseController.show)
router.post('/handle-form-action', CourseController.handleFormAction)

module.exports = router

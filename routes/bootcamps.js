const express = require('express')
const {getBootcamp,getBootcamps,createBootcamp,updateBootcamp, deleteBootcamp,bootcampPhotoUpload} = require('../controllers/bootcamps')
const advanceResults = require('../middleware/advanceResult')

const Bootcamp = require('../models/Bootcamp')
// include other resource router

const courseRouter = require('./courses')
const router = express.Router()

//Re - route into other resource router

router.use('/:bootcampId/courses',courseRouter)

router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/').get(advanceResults(Bootcamp,'courses'),getBootcamps)
.post(createBootcamp)

router.route('/:id')
.put(updateBootcamp)
.get(getBootcamp)
.delete(deleteBootcamp)



module.exports = router;
const express = require('express')
const {getBootcamp,getBootcamps,createBootcamp,updateBootcamp, deleteBootcamp} = require('../controllers/bootcamps')

const router = express.Router()


router.route('/').get(getBootcamps)
.post(createBootcamp)

router.route('/:id')
.put(updateBootcamp)
.get(getBootcamp)
.delete(deleteBootcamp)



module.exports = router;
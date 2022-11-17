const ErrorRespone = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')

// @desc  get all bootcamp
// @route get/api/v1/bootcamps
//access public

exports.getBootcamps= asyncHandler ( async (req,res,next) => {
   
        const bootcamps = await  Bootcamp.find()
        res.status(200).json({success:true, data:bootcamps,count:bootcamps.length})
    
})

// @desc  get  bootcamp by id
// @route get/api/v1/bootcamps/:id
//access public

exports.getBootcamp= asyncHandler( async (req,res,next) => {
   
        const bootcamp = await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
            return next( new ErrorRespone(`Bootcamp not found with id ${req.params.id}`) 
            )
        }
        res.status(200).json({success:true, data:bootcamp})

    
})

// @desc  create ne bootcamp
// @route get/api/v1/bootcamps
//access public

exports.createBootcamp= asyncHandler ( async (req,res,next) => {

  
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success:true,
           data:bootcamp 
        })
})

// @desc  delete  bootcamp by id
// @route delete/api/v1/bootcamps/:id
//access public

exports.deleteBootcamp= asyncHandler( async (req,res,next) => {

  
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
           
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res.status(200).json({success:true, data:{}})
        
   
   
})

// @desc  put  bootcamp by id
// @route put/api/v1/bootcamps/:id
//access public

exports.updateBootcamp = asyncHandler ( async (req,res,next) => {
  
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        })
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res.status(200).json({success:true, data:bootcamp})
        
   
    
})
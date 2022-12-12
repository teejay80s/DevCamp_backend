const path = require('path')

const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp');
const { json } = require('express');
const ErrorResponse = require('../utils/errorResponse');

// @desc  get all bootcamp
// @route get/api/v1/bootcamps
//access public

exports.getBootcamps= asyncHandler ( async (req,res,next) => {

        res.status(200).json(res.advancedResults)
    
})

// @desc  get  bootcamp by id
// @route get/api/v1/bootcamps/:id
//access public

exports.getBootcamp= asyncHandler( async (req,res,next) => {
   
        const bootcamp = await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
            return next( new ErrorResponse(`Bootcamp not found with id ${req.params.id}`) 
            )
        }
        res.status(200).json({success:true, data:bootcamp})

    
})

// @desc  create new bootcamp
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

  
        const bootcamp = await Bootcamp.findById(req.params.id)
           
        if (!bootcamp) {
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }

        bootcamp.remove();
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

// @desc  upload photo for bootcamp by id
// @route put/api/v1/bootcamp
//access private


exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is bootcamp owner
    // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return next(
    //     new ErrorResponse(
    //       `User ${req.user.id} is not authorized to update this bootcamp`,
    //       401
    //     )
    //   );
    // }
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
  
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  });


const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            required:[ true, 'please add a courdr title']
        },
        description:{
            type:String,
            required:[true, 'Please add a description']
        },
        weeks:{
            type:String,
            required:[true, 'Please add number of weeks']
        },
        tuition:{
            type:String,
            required:[true, 'Please add a tuition']
        },
        minimumSkill:{
            type:String,
            required:[true, 'Please ad a minimumn skill'],
            enum:['beginner', 'intermediate', 'advanced']
        },
        scholarshipAvailable:{
            type:Boolean,
            default:false
        },
       createdAt:{
            type:Date,
           default:Date.now
        },
        bootcamp: {
            type: mongoose.Schema.ObjectId,
            ref:'Bootcamp',
            required:true
        }
    }
);

CourseSchema.statics.getAverageCost = async function(bootcampId){
    

    const obj = await  this.aggregate([
        {
            $match: {bootcamp:bootcampId}
        },
        {
            $group:{
                _id:'$bootcamp',
                averageCost:{ $avg : '$tuition'}
            }
        }
       
    ])

   
}



// Call getAverageCost after save
CourseSchema.post('save',function(){
    this.constructor.getAverageCost(this.bootcamp)

})

// Call getAverageCost before remove
CourseSchema.pre('remove',function(){
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course',CourseSchema)
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/error')

// const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const fileupload = require('express-fileupload')

//load env variables

dotenv.config({path:'./config/config.env'})

//connect to database

connectDB()

//Routesfiles

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const nodemon = require('nodemon')



const app = express()

// Body paser
app.use(express.json())

// dev logging middleware

if (process.env.NODE_ENV ==="development") {
    app.use((morgan('dev')))
}

// app.use(logger) custom logger

// mount routers

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
// file upload 

app.use(fileupload())

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
// handle unhandled rejections

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`.red)
    //close serve and exit process
    server.close(()=> process.exit(1))
})


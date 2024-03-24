const express = require('express');
const app = express();

const ErrorHandler = require('./utilis/ErrorHandler')
const cookieParser=require('cookie-parser');


app.use(cookieParser());
app.use(express.json());



//config

if (process.env.NODE_ENV !== "PRODUCTION") {

    require('dotenv').config({
        path: 'backend/config/.env'
    })
}



//it's for Error Handler

app.use(ErrorHandler)

module.exports = app;
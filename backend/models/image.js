const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({

   path:{
    type: String,
    required: true
   } 
})

module.exports = mongoose.model('Image', ImageSchema)
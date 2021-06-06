var mongoose = require("mongoose")
const quizschema = new mongoose.Schema({

    Title:String,

    Questions:[ ]

})

const model = mongoose.model('quizschema',quizschema)
module.exports = model
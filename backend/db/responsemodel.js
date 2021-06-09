const mongoose = require("mongoose")

const responseSchema = new mongoose.Schema({
    quizid:{type:String,required:true},
    responses:[
            {
                email: { type: String, required: true },
                score:{type:String,required:true}
            }
        ]
  });
  
  const Responses = mongoose.model("Response", responseSchema);
  
  module.exports = Responses;
var mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    created:[],
    attempted:[]
})

const User = mongoose.model('User',UserSchema)
module.exports = User
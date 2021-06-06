var mongoose = require("mongoose")

// const url2="mongodb+srv://goutham:goutham@sandbox.egdae.mongodb.net/Sandbox?retryWrites=true&w=majority"
// const url = "mongodb+srv://goutham:goutham@cluster0.d7wxb.mongodb.net/DB?retryWrites=true&w=majority"

mongoose.connect(process.env.URL,{
    useNewUrlParser :true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then( (err) => console.log("connected") ).catch( (err)=> console.log("err") )
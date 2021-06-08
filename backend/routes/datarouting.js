var express = require('express');
var router = express.Router()
var quiz = require("../db/datamodel")
var auth = require("../middileware/auth")

router.get('/get', function(req, res){
    res.send("<h1>Hello From Data Router!</h1>");
});

router.post('/get',auth,async (req, res) => {
    var id=req.body.id;
    var newquiz=[];
    try{
        newquiz = await quiz.find({_id:id})
        console.log("*******from db********");
        console.log(newquiz);
        if(newquiz === null || newquiz === []) 
            return res.json({"message":"Quiz Not Found"})
        else{
            console.log(newquiz);   
            return res.json({newquiz,message:"Quiz Found"});
        }
    }
    catch(err){
        res.json({"message":"Quiz Not Found"})
    }
});

router.post('/post',auth,async (req,res) =>{
    console.log("*********Request from CLient***********");
    console.log(req.body);
    var instance;
    try {

        const newquiz = new quiz({ 'Title': req.body.title, 'Questions': req.body.questions});

        console.log("*********Response from DB***********");
        instance = await newquiz.save(); //when fail its goes to catch

        console.log(instance); //when success it print.
      } catch (err) {
            console.log('err' + err);
            res.status(500).send("Quiz Not created");
      }

    res.json({id:instance.id})
})



module.exports = router
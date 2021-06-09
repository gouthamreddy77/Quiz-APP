var express = require('express');
var router = express.Router()
var User = require("../db/usermodal")
var Responses = require("../db/responsemodel")
var jwt  = require("jsonwebtoken")

router.post('/register',async (req,res)=>{

    // console.log("********request from client********\n",req.body);

    try {

        const {email,password,passwordVerify} = req.body

        if(email === "" || password === "" || passwordVerify === "")
            return res.send({message:"Plese enter all the fields"})

        var resdb = await User.findOne({email})

        if(resdb !== null)
            return res.send({message:"User with this email already exist"})

        if(password.length <= 6)
            return res.send({message:"Password length should be atleast 7"});

        if(password !== passwordVerify)
            return res.send({message:"Passwords Dosn't Match"})

        const newuser = new User({email,password});
        var resdb = await newuser.save(); //when fail its goes to catch

        console.log("*********Response from DB***********");
        console.log(resdb); //when success it print.

        const token = jwt.sign({user:resdb._id},process.env.JWT_SECRET);
        res.cookie("token",token,
        {
            httpOnly:true,
            secure: true,
            sameSite: "none",
        }).send({message:"User Registeration Sucessful"})
        
      } catch (err) {
            console.log('err' + err);
            res.status(500).send("Internal Error");
      }
})

router.post('/login',async (req,res)=>{

    console.log("********request from client********\n",req.body);

    try {

        const {email,password} = req.body

        if(email === "" || email === null || password === "" || password === null)
            return res.send({message:"Plese enter all the fields"})

        if(password.length <= 6)
            return res.send({message:"Password length should be atleast 7"});

        var resdb = await User.findOne({email})

        if(resdb === null)
            return res.send({message:"User doesn't exist"})

        if(resdb.password !== password)
        return res.send({message:"Email/Password Dosn't Match"})

        console.log("*********Response from DB***********");
        console.log(resdb); //when success it print.
        console.log(resdb._id);
        const token = jwt.sign({user:resdb._id},process.env.JWT_SECRET);
        res.cookie("token",token,
        {
            httpOnly:true,
            secure: true,
            sameSite: "none",
        }).send({message:"User Login Sucessful",_id:resdb._id})
        
      } catch (err) {
            console.log('err' + err);
            res.status(500).send("Internal Error");
      }
})

router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send({mesaage:"Logged out"});
});
  
router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({loggedin:false});
    
        jwt.verify(token, process.env.JWT_SECRET);
    
        res.json({loggedin:true});
    } catch (err) {
        res.json({loggedin:false});
    }
});

router.post("/createdquiz",async(req,res)=>{
    const {userid,quizid,quiztitle,questions} = req.body;
    var user
    try{
        user = await User.findOne({_id:userid})
        user.created.push({quizid,quiztitle,questions,responses:0})
        await user.save()
        console.log(user);
    }
    catch(err){
        console.log(err);
    }
    res.send(user)
})

router.post("/attempted",async(req,res)=>{

    const {_id,quizid,quiztitle,questions,score} = req.body;
    console.log("********Request from client********");
    console.log(req.body);

    var response ,updatedresponse ,user,tmp

    try{
        //user who attempted quiz
        user =  await User.findOne({_id})
        user.attempted.push({quizid,quiztitle,questions,score})
        await user.save()
        
        // console.log("Attempted user:",user.email);
        var exist = await Responses.findOne({quizid});   // adding to responses
        console.log(exist);
        if(exist == null){
            response = new Responses({quizid , responses:[{"email":user.email,score}]})
            response = await response.save()
            console.log("Response:",response);
        }
        else{
            exist.responses.push({email:user.email,score});
            response = await exist.save()
        }
        
        //user who created quiz
        updatedresponse = await User.updateOne({"created.quizid":quizid},{$inc:{"created.$.responses":1}}) 
    }
    catch(err){
        console.log("err",err);
    }
    console.log("added to Responses");
    res.send({message:"Updated",attempted:user.email,response})
})

router.post("/viewquiz",async (req,res)=>{
    const _id = req.body.userid
    var user
    try{
        if(_id==null || _id=== "")
            return res.send({message:"User not found"})
        user = await User.findOne({_id})

    }catch(err){
        console.log(err);
    }
    console.log(user);
    res.send({created:user.created,attempted:user.attempted})
})

router.post("/responses",async (req,res)=>{
    const {quizid} = req.body
    var responses
    try{
        if(quizid == null || quizid == "")
            return res.send({message:"404"})
        responses = await Responses.findOne({quizid})
        if(responses==null || responses == undefined){
            return res.send({message:"404"})
        }
    }catch(err){
        console.log("err");
    }
    console.log(responses);
    res.send({responses:responses.responses})
})
module.exports = router
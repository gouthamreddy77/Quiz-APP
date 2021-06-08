var express = require('express');
var router = express.Router()
var User = require("../db/usermodal")
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
    const {userid,quizid,quiztitle,questions,score} = req.body;
    var user
    try{
        user = await User.findOne({_id:userid})
        user.attempted.push({quizid,quiztitle,questions,score})
        await user.save()
        console.log(user);
    }
    catch(err){
        console.log(err);
    }
    res.send(user)
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

router.post("/updateresponse", async (req,res)=>{

})
module.exports = router
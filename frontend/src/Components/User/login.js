import React,{useState,useContext} from 'react'
import {Link} from "react-router-dom"
import { AuthContext } from "../Home"
import {useHistory} from "react-router-dom"

const Login = () => {
    
    const {getLoggedIn,setuserid} = useContext(AuthContext) 
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const history = useHistory()

    const login = async ()=>{
        try{
            const loggedInRes = await fetch("/user/login",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            })

            const res = await loggedInRes.json()
            alert(res.message)
            if(res.message==="User Login Sucessful"){
                await getLoggedIn()
                setuserid(res._id)
                localStorage.setItem("user-id",JSON.stringify({_id:res._id}))
                history.push("/home")
            }
        }
        catch(err){
            console.log(err);
            alert("Login Not Sucessful")
        }
    }
    return (
        <>
            <div className="login-container border">
                <div className="conatiner login1 ">
                    <div className="innerlogin1 border">
                        <h1>Login to your Account</h1>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e)=> setemail(e.target.value)}></input>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)}></input>
                        <button className="btn btn-primary" onClick={login}>Login</button>
                        <Link to="/">New Here? Register</Link>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Login

import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
const Register = () => {

    const history = useHistory()
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const[passwordVerify,setpasswordVerify] = useState("")

    const register = async ()=>{
        console.log(email,password,passwordVerify);
        try{
            const loggedInRes = await fetch("/user/register",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    email,password,passwordVerify
                })
            })
            const res = await loggedInRes.json()

            alert(res.message)
            if(res.message === 'User Registeration Sucessful')
            history.push("/login")
        }
        catch(err){
            console.log(err);
            alert("Login Not Sucessful")
        }
    }
    return (
        <>
            <div className="row d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
                <div className="col-sm-12 col-md-5  d-flex flex-column border p-5 justify-content-between register1" style={{"height":"60vh"}}>

                    <h1 style={{"textAlign":"center"}}>Create New Account</h1>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e)=> setemail(e.target.value)}></input>
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e)=> setpassword(e.target.value)}></input>
                    <label>Verify Password:</label>
                    <input type="text" value={passwordVerify} onChange={(e)=> setpasswordVerify(e.target.value)}></input>
                    <button className="btn btn-primary" onClick={register}>Register</button>
                    <Link to='/login'>Have an account?Log in</Link>
        
                </div>
            </div> 
        </>
    )
}

export default Register

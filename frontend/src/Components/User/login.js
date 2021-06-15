import React,{useState,useContext} from 'react'
import {Link} from "react-router-dom"
import { AuthContext } from "../Pages/Home"
import {useHistory} from "react-router-dom"

const Login = () => {
    
    const {getLoggedIn,setuserid,setuseremail} = useContext(AuthContext) 
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const history = useHistory()
    const [loading,setloading] =useState(false)

    const login = async ()=>{
        setloading(true);
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
            // alert(res.message)
            if(res.message==="User Login Sucessful"){
                await getLoggedIn()
                setuserid(res._id)
                setuseremail(email)
                localStorage.setItem("user-id",JSON.stringify({_id:res._id}))
                localStorage.setItem("email-id",JSON.stringify({email}))
                history.push("/home")
            }
            else{
                await setloading(false);
                alert(res.message)
            }
        }
        catch(err){
            console.log(err);
            setloading(false);
            alert("Login Not Sucessful")
        }
    }

    return (
        <>
            {loading === true ? <>
                    <div className="d-flex justify-content-center m-5">
                            <h1>Loading...</h1>
                            <div className="spinner-border m-3" role="status">
                                <span className="sr-only "></span>
                            </div>
                    </div>
            </> :
                <>
                    {/* <div className="row d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
                        <div className="col-sm-12 col-md-11 col-lg-6   d-flex flex-column border p-5 justify-content-between login1" style={{"height":"67vh"}}>
                                <h1 style={{"textAlign":"center"}}>Login to your Account</h1>
                                <label>Email:</label>
                                <input type="email" value={email} onChange={(e)=> setemail(e.target.value)}></input>
                                <label>Password:</label>
                                <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)}></input>
                                <button className="btn btn-primary" onClick={login}>Login</button>
                                <Link to="/">New Here? Register</Link>
                        </div>
                    </div> */}
                    <div>
                        <div className="row" style={{"marginTop":"5%","marginLeft":"9%","marginRight":"5%","height":"83vh"}}>
                        
                            <div className="col-sm-12 col-md-6 col-lg-6   d-flex justify-content-center align-items-start p-5 " >
                                <div className="" style={{"textAlign":"center"}}>
                                    <p className="" style={{"fontSize":"98px"}}><strong>Quiz</strong><span  style={{"fontSize":"68px"}}>App</span></p>
                                    <p>
                                        Now create and join quiz at a single platform.You can create trivia quizzes, personality test, polls and survays. Share out your quiz with your students with a unique code.
                                    </p>
                                </div>
                            </div>
                        
                            <div className="col-sm-12 col-md-6 col-lg-4  d-flex flex-column justify-content-around p-5  shadow text-white " style={{"backgroundColor":"#23395b","borderRadius":"29px","marginBottom":"2%"}}>
                            
                                <h3 style={{"textAlign":"center"}}>Login to your Account</h3>
                                <label>Email:</label>
                                <input type="email" value={email} onChange={(e)=> setemail(e.target.value)}></input>
                                <label>Password:</label>
                                <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)}></input>
                                <button className="btn btn-primary mt-3" onClick={login}>Login</button>
                                <Link to="/">New Here? Register</Link>
                            
                            </div>
                            <div className="col-sm-12">
                                    <br/>
                                    <br/>
                            </div>
                    </div>

                    </div>
                </>
            }
        </>
    )
}

export default Login

import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
const Register = () => {

    const history = useHistory()
    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const[passwordVerify,setpasswordVerify] = useState("")
    const [loading,setloading] =useState(false)

    const register = async ()=>{
        setloading(true)
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

            if(res.message === 'User Registeration Sucessful'){ 
                setloading(false)
                alert("Registeration Sucessful")
                history.push("/login")
            }
            else{
                setloading(false)
                alert(res.message)
            }
        }
        catch(err){
            console.log(err);
            setloading(false)
            alert("Register Not Sucessful")
        }
    }


    return (
        <>
            {
                loading === true ?
                <>
                    <div className="d-flex justify-content-center m-5">
                        <h1 className="fw-bold fs-1">Loading...</h1>
                        <div className="spinner-border m-3" role="status">
                            <span className="sr-only "></span>
                        </div>
                    </div>
                </> :
                <>
                    <div className="">
                        <div className="row " style={{"marginTop":"5%","marginLeft":"9%","marginRight":"5%","height":"83vh"}}>
                        
                            <div className="col-sm-12 col-md-6 col-lg-6   d-flex justify-content-center align-items-start p-5 " >
                                <div className="" style={{"textAlign":"center"}}>
                                    <p className="" style={{"fontSize":"98px"}}><strong>Quiz</strong><span  style={{"fontSize":"68px"}}>App</span></p>
                                    <p>
                                        Now create and join quiz at a single platform.You can create trivia quizzes, personality test, polls and survays. Share out your quiz with your students with a unique code.
                                    </p>
                                </div>
                            </div>
                        
                            <div className="col-sm-12 col-md-6 col-lg-4  d-flex flex-column justify-content-around p-5   shadow text-white " style={{"backgroundColor":"#23395b","borderRadius":"29px","marginBottom":"2%"}}>
                            
                                <h3 style={{"textAlign":"center"}}>Create New Account</h3>
                                <label>Email:</label>
                                <input type="text" value={email} onChange={(e)=> setemail(e.target.value)}></input>
                                <label>Password:</label>
                                <input type="text" value={password} onChange={(e)=> setpassword(e.target.value)}></input>
                                <label>Verify Password:</label>
                                <input type="text" value={passwordVerify} onChange={(e)=> setpasswordVerify(e.target.value)}></input>
                                <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                                <Link to='/login'>Have an account?Log in</Link>
                            
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

export default Register

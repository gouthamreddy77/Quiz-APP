import React,{useState,useEffect,createContext} from 'react'
import Quizconatiner from "./Quizcontainer"
export const AuthContext = createContext();

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await fetch("/user/loggedIn",{
            method:"GET"
        })
        const res = await loggedInRes.json()
        setLoggedIn(res.loggedin);
    }

    useEffect(() => {
        getLoggedIn();
      }, []);

    const register  = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch("/user/register",{
                method:"POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify({
                        email,password,passwordVerify
                    })
            })
            const data = await res.json()
            alert(data.message)
            await getLoggedIn()
        }
        catch(err){
            alert("Not Sucessful")
            console.log(err);
        }
    }

    return (
        <>
        {
            loggedIn === false ?
            
            <div>
                    <h1>Register a new account</h1>
                    <form onSubmit={register}>
                        <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                        <input
                        type="password"
                        placeholder="Verify your password"
                        onChange={(e) => setPasswordVerify(e.target.value)}
                        value={passwordVerify}
                        />
                        <button type="submit" className="btn btn-primary" onClick={register}>Register</button>
                    </form>
            </div>
            :
            <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
                <Quizconatiner/>
            </AuthContext.Provider>
        }
        </>
    )
}

export default Register

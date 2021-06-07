import React,{useState,useEffect,createContext} from 'react'
import { Route ,Switch} from "react-router-dom";
import Login from "./User/Login"
import Register from './User/Register';
import Home2 from './Home2';
import Createquiz from './CREATE/Createquiz';
import Joinquiz from './JOIN/Joinquiz';
import Navbar from "./Navbar"
export const AuthContext = createContext();

const Home = () => {

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

    return (
        <>
            <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>   
                        <Switch>
                            <Route exact path="/">
                                <Register/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            {
                                loggedIn === true ?
                                <>
                                <Navbar/>
                                <Route path="/home">
                                    <Home2/>
                                </Route>
                                <Route path="/create">
                                    <Createquiz/>
                                </Route>
                                <Route path="/join">
                                    <Joinquiz/>
                                </Route>
                                </>
                            
                                :
                                    null
                            }
                           

                        </Switch>
            </AuthContext.Provider>
        </>
    )
}

export default Home


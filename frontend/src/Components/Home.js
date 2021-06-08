import React,{useState,useEffect,createContext} from 'react'
import { Route ,Switch} from "react-router-dom";
import Login from "./User/Login"
import Register from './User/Register';
import Home2 from './Home2';
import Createquiz from './CREATE/Createquiz';
import Joinquiz from './JOIN/Joinquiz';
import Dhome from './Dashboard/Dhome'
import Navbar from "./Navbar"
export const AuthContext = createContext();

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [_id,set_id] = useState()

    async function getLoggedIn() {
        const loggedInRes = await fetch("/user/loggedIn",{
            method:"GET"
        })
        const res = await loggedInRes.json()
        setLoggedIn(res.loggedin);
    }

    function setuserid( id ){
        set_id(id)
        
    }

    useEffect(() => {
         getLoggedIn();
         console.log("getloggedin called");
      }, []);
    
      useEffect(() => {
        const persistentdata = localStorage.getItem('user-id')
        console.log("persistent",persistentdata);
        if(loggedIn === true && persistentdata !== null)
           { console.log("2nd useeffect");
            set_id(JSON.parse(persistentdata)._id);}
     }, [loggedIn]);

    return (
        <>
            <AuthContext.Provider value={{ loggedIn, _id,getLoggedIn ,setuserid }}>   
                        <Switch>
                            <Route exact path="/">
                                <Register/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            {
                                loggedIn === true ?                           
                                    _id !==""?
                                    <>
                                    <Navbar/>
                                    <Route path="/home">
                                        <Home2/>
                                    </Route>
                                    <Route path="/dashboard">
                                        <Dhome/>
                                    </Route>
                                    <Route path="/create">
                                        <Createquiz/>
                                    </Route>
                                    <Route path="/join">
                                        <Joinquiz/>
                                    </Route>
                                    </>:<h1>loading....</h1>                            
                                :
                                    null
                            }
                           
                        </Switch>
            </AuthContext.Provider>
        </>
    )
}

export default Home


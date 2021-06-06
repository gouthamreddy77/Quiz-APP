import React from 'react'
import { Route ,Switch} from "react-router-dom";
import Createquiz from "./CREATE/Createquiz"
import Home2 from './Home2';
import Joinquiz from "./JOIN/Joinquiz"
import Navbar from './Navbar';

const Quizcontainer = () => {
    return (
        <>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Home2/>
                </Route>
                <Route path="/create">
                    <Createquiz/>
                </Route>
                <Route path="/join">
                    <Joinquiz/>
                </Route>
            </Switch>
            
        </>
    )
}

export default Quizcontainer

import React, { useContext } from 'react'
import { AuthContext } from './Home'
import {useHistory,Link} from "react-router-dom"
const Navbar = () => {
    const history = useHistory()
    const {getLoggedIn} = useContext(AuthContext)
    const logout = async () =>{
        try{
            await fetch("/user/logout",{
                method:"GET"
            })
            await getLoggedIn();
            history.push("/")
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light ">
                <div className="container-fluid">

                   <Link className="navbar-brand text-primary " to="#">Quizz App</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/join">Join</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-light m-1 btn-sm" onClick={logout}>Log out</button>
                        </li>
                    </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar

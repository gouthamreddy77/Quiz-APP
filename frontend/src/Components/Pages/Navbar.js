import React, { useContext } from 'react'
import { AuthContext } from './Home'
import {useHistory,Link} from "react-router-dom"
const Navbar = ({email}) => {


        const history = useHistory()
        const {getLoggedIn} = useContext(AuthContext)
        const logout = async () =>{
            try{
                await fetch("/user/logout",{
                    method:"GET"
                })
                await getLoggedIn();
                localStorage.removeItem("user-id"); 
                localStorage.removeItem("email-id"); 
                history.push("/")
            }
            catch(err){
                console.log(err);
            }
        }
        email = email.split("@")
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-sm "  style={{"boxShadow":"0 1px 9px #000"}}>
                <div className="container-fluid">

                   <Link className="navbar-brand text-white fs-4" to="/Home"><strong>Quiz</strong>App</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" >
                        <div className="menu"></div>
                        <div className="menu"></div>
                        <div className="menu"></div>
                    </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/create">Create</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/join">Join</Link>
                        </li>
                        <li className="nav-item dropdown ">
                            <a  className="nav-link  text-white" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-person-circle mb-1" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                <span className="ms-1">{email[0]}</span>
                            </a>
                            <ul className="dropdown-menu   dropdown-menu-end" >
                                <li>
                                    <button className="dropdown-item" onClick={logout}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar
